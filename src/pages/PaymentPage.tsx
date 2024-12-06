import React, { useState, useEffect } from "react";

import OrderSummary from "../components/OrderSummary";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import {
  MapPin,
  Edit2,
  Trash2,
  ChevronDown,
  CreditCard,
  Plus,
  Star,
  X,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import { CartItem, DirectPurchaseItem } from "../types";
import ConfirmationModal from "../components/common/ConfirmationModal";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Country phone codes
const COUNTRY_CODES = [
  { code: "US", name: "United States", phoneCode: "+1" },
  { code: "GB", name: "United Kingdom", phoneCode: "+44" },
  { code: "CA", name: "Canada", phoneCode: "+1" },
  { code: "AU", name: "Australia", phoneCode: "+61" },
  { code: "DE", name: "Germany", phoneCode: "+49" },
  { code: "FR", name: "France", phoneCode: "+33" },
  { code: "IT", name: "Italy", phoneCode: "+39" },
  { code: "ES", name: "Spain", phoneCode: "+34" },
  { code: "JP", name: "Japan", phoneCode: "+81" },
  { code: "CN", name: "China", phoneCode: "+86" },
  { code: "RU", name: "Russia", phoneCode: "+7" },
  { code: "BR", name: "Brazil", phoneCode: "+55" },
  { code: "ZA", name: "South Africa", phoneCode: "+27" },
  { code: "MX", name: "Mexico", phoneCode: "+52" },
  { code: "SG", name: "Singapore", phoneCode: "+65" },
  { code: "AE", name: "UAE", phoneCode: "+971" },
  { code: "SA", name: "Saudi Arabia", phoneCode: "+966" },
  { code: "NZ", name: "New Zealand", phoneCode: "+64" },
  { code: "SE", name: "Sweden", phoneCode: "+46" },
  { code: "IN", name: "India", phoneCode: "+91" },
];

interface Address {
  address_id: number;
  contact_name: string;
  contact_phone: string;
  address_line1: string;
  address_line2?: string;
  landmark?: string;
  city: string;
  state_province: string;
  postal_code: string;
  country_code: string;
  address_type: "shipping" | "billing";
  is_default_shipping: boolean;
  is_default_billing: boolean;
}

// Add new interface for payment card
interface PaymentCard {
  card_id: number;
  user_id: number;
  card_type: "credit" | "debit";
  last_four_digits: string;
  card_holder_name: string;
  card_brand: string;
  status: "active" | "expired" | "suspended" | "deleted";
  is_default: boolean;
  billing_address: Address | null;
  last_used_at: string | null;
  created_at: string;
  updated_at: string;
}

// Add PaymentMethodEnum mapping
const PAYMENT_METHOD_MAP = {
  credit_card: "credit_card",
  debit_card: "debit_card",
  cash_on_delivery: "cash_on_delivery",
} as const;

const PaymentPage: React.FC = () => {
  const { user, accessToken } = useAuth();
  const { cart, totalPrice, totalItems, clearCart } = useCart();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [deliveryToAnother, setDeliveryToAnother] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const [showCountryCodes, setShowCountryCodes] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES.find(c => c.code === "IN") || COUNTRY_CODES[0]);
  const [postalCodeError, setPostalCodeError] = useState<string>("");
  const [formData, setFormData] = useState({
    contact_name: "",
    contact_phone: "",
    address_line1: "",
    address_line2: "",
    landmark: "",
    city: "",
    state_province: "",
    postal_code: "",
    country_code: "IN",
    address_type: "shipping" as "shipping" | "billing",
    is_default_shipping: true,
    is_default_billing: false,
  });
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
  });
  const [processingPayment, setProcessingPayment] = useState(false);
  const [savedCards, setSavedCards] = useState<PaymentCard[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [showCardForm, setShowCardForm] = useState(false);
  const [savingCard, setSavingCard] = useState(false);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [shippingLoading, setShippingLoading] = useState(false);
  const [availableCouriers, setAvailableCouriers] = useState<any[]>([]);
  const [selectedCourier, setSelectedCourier] = useState<any>(null);
  const [shippingRequestId, setShippingRequestId] = useState<string>(""); // To prevent duplicate requests
  const [cardFormData, setCardFormData] = useState({
    card_number: "",
    cvv: "",
    expiry_month: "",
    expiry_year: "",
    card_holder_name: "",
    card_type: "credit" as "credit" | "debit",
    billing_address_id: null as number | null,
    is_default: false,
  });
  // Add state for delete confirmation modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<Address | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [noCourierService, setNoCourierService] = useState(false);

  // --- Read state passed from Cart.tsx or direct purchase ---
  const stateData = location.state || {};
  const [discount, setDiscount] = useState(stateData.discount || 0);
  const [appliedPromo, setAppliedPromo] = useState(
    stateData.appliedPromo || null
  );
  const [itemDiscounts, setItemDiscounts] = useState(
    stateData.itemDiscounts || {}
  );
  const directPurchase = stateData.directPurchase || null;

  // Determine if this is a direct purchase or cart checkout
  const isDirectPurchase = directPurchase !== null;
  const directPurchaseItem = directPurchase as DirectPurchaseItem | null;

  // Promo code state for direct purchases
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [promoLoading, setPromoLoading] = useState(false);

  const validatePostalCode = (
    postalCode: string,
    countryCode: string
  ): boolean => {
    // Basic validation patterns for common countries
    const patterns: { [key: string]: RegExp } = {
      IN: /^\d{6}$/, // India: 6 digits
      US: /^\d{5}(-\d{4})?$/, // US: 5 digits or 5+4 digits
      GB: /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/, // UK: Various formats
      CA: /^[A-Z]\d[A-Z] \d[A-Z]\d$/, // Canada: A1A 1A1
      AU: /^\d{4}$/, // Australia: 4 digits
    };

    const pattern = patterns[countryCode];
    if (!pattern) return true; // If no pattern exists for country, accept any format

    return pattern.test(postalCode);
  };

  const handleCountrySelect = (country: (typeof COUNTRY_CODES)[0]) => {
    setSelectedCountry(country);
    setShowCountryCodes(false);
    setFormData((prev) => ({
      ...prev,
      country_code: country.code,
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear postal code error when user starts typing again
    if (name === "postal_code") {
      setPostalCodeError("");
    }
  };

  const handlePostalCodeBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value && !validatePostalCode(value, formData.country_code)) {
      setPostalCodeError(
        `Invalid postal code format for ${selectedCountry.name}`
      );
    } else {
      setPostalCodeError("");
    }
  };

  const handleCardInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCardFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const processCardPayment = async (
    orderId: string,
    cardId: number
  ): Promise<boolean> => {
    try {
      setProcessingPayment(true);
      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("Please login to continue");
        return false;
      }

      // Here you would integrate with your payment gateway
      // For now, we'll simulate a successful payment
      const paymentSuccess = true;

      if (paymentSuccess) {
        // Update payment status
        const response = await fetch(
          `${API_BASE_URL}/api/orders/${orderId}/payment`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              payment_status: "successful",
              transaction_id: `TXN-${Date.now()}`,
              gateway_name: "Test Gateway",
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `Payment failed: ${response.status} ${JSON.stringify(errorData)}`
          );
        }

        const data = await response.json();
        if (data.status === "success") {
          toast.success("Payment processed successfully");
          return true;
        } else {
          throw new Error(data.message || "Payment failed");
        }
      }
      return false;
    } catch (error) {
      console.error("Error processing payment:", error);
      // Debug: Log the full error object
      console.error("Full error details:", {
        name: error instanceof Error ? error.name : "Unknown",
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
      toast.error(error instanceof Error ? error.message : "Payment failed");
      return false;
    } finally {
      setProcessingPayment(false);
    }
  };

  // Add function to create merchant transactions
  const createMerchantTransactions = async (
    orderId: string
  ): Promise<boolean> => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error(
          "No access token found for merchant transaction creation"
        );
        return false;
      }

      // console.log("Creating merchant transactions for order:", orderId);

      const response = await fetch(
        `${API_BASE_URL}/api/merchant-transactions/from-order`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            order_id: orderId,
          }),
        }
      );

      // console.log("Merchant transaction API response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to create merchant transactions:", {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
        });
        // Don't throw error here as order is already created successfully
        return false;
      }

      const data = await response.json();
      // console.log("Merchant transaction API response data:", data);

      if (data.status === "success") {
        // console.log("Merchant transactions created successfully:", {
        //   orderId,
        //   transactionCount: data.transactions?.length || 0,
        //   transactions: data.transactions,
        // });
        return true;
      } else {
        console.error("Failed to create merchant transactions:", {
          orderId,
          message: data.message,
          data,
        });
        return false;
      }
    } catch (error) {
      console.error("Error creating merchant transactions:", {
        orderId,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
      // Don't throw error here as order is already created successfully
      return false;
    }
  };

  // Add function to calculate shipping costs
  const calculateShippingCost = async () => {
    if (!selectedAddressId || !user?.id) {
      return;
    }

    // Get items for calculation
    const itemsForShipping =
      isDirectPurchase && directPurchaseItem
        ? [
          {
            product_id: directPurchaseItem.product.id,
            quantity: directPurchaseItem.quantity,
          },
        ]
        : cart.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
        }));

    // Generate a unique request ID to prevent duplicate requests
    const currentRequestId = `${selectedAddressId}-${paymentMethod}-${JSON.stringify(
      itemsForShipping
    )}`;

    // If this is the same request as the last one, don't make another API call
    if (shippingRequestId === currentRequestId && !shippingLoading) {
      return;
    }

    try {
      setShippingLoading(true);
      setShippingRequestId(currentRequestId);

      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("No access token found for shipping calculation");
        return;
      }

      // Get the selected address
      const selectedAddress = addresses.find(
        (addr) => addr.address_id === selectedAddressId
      );
      if (!selectedAddress) {
        console.error("Selected address not found");
        return;
      }

      // Calculate total weight (assuming 0.5kg per item as default)
      const totalWeight = itemsForShipping.reduce(
        (weight, item) => weight + item.quantity * 0.5,
        0
      );

      // Determine if this is COD or prepaid
      const isCOD = paymentMethod === "cash_on_delivery";

      // Calculate total price for COD amount
      const currentTotal =
        isDirectPurchase && directPurchaseItem
          ? directPurchaseItem.product.price * directPurchaseItem.quantity
          : totalPrice;
      const codAmount = isCOD ? currentTotal - discount : 0;

      const requestBody: any = {
        pickup_pincode: "474005", // This should come from merchant's address
        delivery_pincode: selectedAddress.postal_code,
        weight: totalWeight,
        cod: isCOD, // Boolean: true for COD, false for prepaid
      };

      // Add cod_amount only if it's a COD order
      if (isCOD && codAmount > 0) {
        requestBody.cod_amount = codAmount;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/shiprocket/serviceability`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      // Check if this request is still current (not cancelled by a newer request)
      if (shippingRequestId !== currentRequestId) {
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to calculate shipping:", {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
        });

        // Handle different error types
        if (response.status === 403) {
          console.warn(
            "Access denied to shipping calculation, using default cost"
          );
          setShippingCost(150); // Default shipping cost for access denied
        } else if (response.status === 422) {
          console.warn("Invalid shipping parameters, using default cost");
          setShippingCost(120); // Default shipping cost for invalid params
        } else {
          // Set default shipping cost for other errors
          setShippingCost(100);
        }
        return; // Exit early, loading state will be reset in finally block
      }

      const data = await response.json();

      // Debug: Log the actual response structure
      console.log("ShipRocket shipping calculation response:", {
        status: response.status,
        message: data.message,
        hasData: !!data.data,
        hasCouriers: !!data.data?.data?.available_courier_companies,
        couriersCount: data.data?.data?.available_courier_companies?.length || 0,
        fullResponse: data
      });

      // Check if response has the expected structure
      // Backend returns: { message: "Serviceability check successful", data: { available_courier_companies: [...] } }
      console.log("Checking response structure:", {
        hasMessage: !!data.message,
        hasData: !!data.data,
        hasCouriers: !!data.data?.data?.available_courier_companies,
        couriersLength: data.data?.data?.available_courier_companies?.length || 0,
        conditionResult: !!(data.message && data.data?.data?.available_courier_companies)
      });
      
      // Check for couriers in the response - the actual structure is data.data.data.available_courier_companies
      const couriers = data.data?.data?.available_courier_companies || [];
      const hasCouriers = Array.isArray(couriers) && couriers.length > 0;
      
      if (data.message && hasCouriers) {
        console.log("Found couriers:", couriers.length, couriers);
        setAvailableCouriers(couriers);
        setNoCourierService(false); // Explicitly set to false when we have couriers

        // Select the best courier (lowest price or highest rating)
        if (couriers.length > 0) {
          const bestCourier = couriers.reduce((best: any, current: any) => {
            const bestRating = parseFloat(best.rating || "0");
            const currentRating = parseFloat(current.rating || "0");
            const bestPrice = parseFloat(best.rate || "999999");
            const currentPrice = parseFloat(current.rate || "999999");

            // Prefer higher rating, then lower price
            if (currentRating > bestRating) return current;
            if (currentRating === bestRating && currentPrice < bestPrice)
              return current;
            return best;
          });

          console.log("Selected best courier:", bestCourier);
          setSelectedCourier(bestCourier);
          setShippingCost(parseFloat(bestCourier.rate || "0"));
        } else {
          setShippingCost(100); // Default shipping cost if no couriers available
        }
      } else {
        // Debug: Log the actual response structure
        console.log("ShipRocket response structure:", {
          message: data.message,
          hasData: !!data.data,
          hasCouriers: !!data.data?.data?.available_courier_companies,
          couriersCount: data.data?.data?.available_courier_companies?.length || 0,
          fullResponse: data
        });
        
        console.log("Setting noCourierService to true because condition failed");
        setNoCourierService(true); // No couriers found
        setShippingCost(100); // Default shipping cost
      }
    } catch (error) {
      console.error("Error calculating shipping cost:", error);
      setShippingCost(100); // Default shipping cost on error
    } finally {
      // Only update loading state if this is still the current request
      if (shippingRequestId === currentRequestId) {
        setShippingLoading(false);
      }
    }
  };

  // Add manual refresh function for shipping calculation
  const refreshShippingCost = () => {
    // Clear the current request ID to force a new calculation
    setShippingRequestId("");
    calculateShippingCost();
  };

  // Promo code application for direct purchases
  const handleApplyPromo = async (promoCode: string) => {
    if (!promoCode.trim()) {
      toast.error("Please enter a promotion code.");
      return;
    }

    if (!isDirectPurchase || !directPurchaseItem) {
      toast.error("Promo codes can only be applied to purchases");
      return;
    }

    setPromoLoading(true);
    setDiscount(0);
    setAppliedPromo(null);

    try {
      const cartItemsPayload = [
        {
          product_id: directPurchaseItem.product.id,
          quantity: directPurchaseItem.quantity,
          price: directPurchaseItem.product.price,
        },
      ];

      const response = await fetch(`${API_BASE_URL}/api/promo-code/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          promo_code: promoCode,
          cart_items: cartItemsPayload,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to apply promo code.");
      }

      toast.success(result.message);
      setDiscount(result.discount_amount);
      setAppliedPromo({
        id: result.promotion_id,
        code: promoCodeInput.toUpperCase(),
      });
      setItemDiscounts(result.item_discounts || {});
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
    } finally {
      setPromoLoading(false);
    }
  };

  const removePromo = () => {
    setDiscount(0);
    setPromoCodeInput("");
    setAppliedPromo(null);
    setItemDiscounts({});
    toast.success("Promotion removed.");
  };

  useEffect(() => {
    fetchAddresses();
    fetchSavedCards();
  }, []);

  // Calculate shipping when address or payment method changes
  useEffect(() => {
    const hasItems = isDirectPurchase
      ? directPurchaseItem !== null
      : cart.length > 0;
    if (selectedAddressId && hasItems) {
      // Add a small delay to prevent rapid successive calls
      const timeoutId = setTimeout(() => {
        calculateShippingCost();
      }, 300); // 300ms debounce

      // Cleanup function to cancel the timeout if the effect runs again
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [
    selectedAddressId,
    paymentMethod,
    cart,
    isDirectPurchase,
    directPurchaseItem,
  ]);

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        // console.log("No token found, skipping address fetch");
        return;
      }

      const baseUrl = API_BASE_URL.replace(/\/+$/, "");
      const url = `${baseUrl}/api/user-address?user_id=${user?.id}`;
      // console.log("Fetching addresses from:", url);

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(
          `Failed to fetch addresses: ${response.status} ${errorText}`
        );
      }

      const data = await response.json();
      // console.log("Addresses data:", data);
      setAddresses(data.addresses);

      // If there are addresses, select the default shipping address
      const defaultAddress = data.addresses.find(
        (addr: Address) => addr.is_default_shipping
      );
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress.address_id);
        setFormData({
          contact_name: defaultAddress.contact_name,
          contact_phone: defaultAddress.contact_phone,
          address_line1: defaultAddress.address_line1,
          address_line2: defaultAddress.address_line2 || "",
          landmark: defaultAddress.landmark || "",
          city: defaultAddress.city,
          state_province: defaultAddress.state_province,
          postal_code: defaultAddress.postal_code,
          country_code: defaultAddress.country_code,
          address_type: defaultAddress.address_type,
          is_default_shipping: defaultAddress.is_default_shipping,
          is_default_billing: defaultAddress.is_default_billing,
        });
      }
    } catch (error) {
      console.error("Error in fetchAddresses:", error);
      toast.error("Failed to fetch addresses");
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSelect = (address: Address) => {
    setSelectedAddressId(address.address_id);
    setFormData({
      contact_name: address.contact_name,
      contact_phone: address.contact_phone,
      address_line1: address.address_line1,
      address_line2: address.address_line2 || "",
      landmark: address.landmark || "",
      city: address.city,
      state_province: address.state_province,
      postal_code: address.postal_code,
      country_code: address.country_code,
      address_type: address.address_type,
      is_default_shipping: address.is_default_shipping,
      is_default_billing: address.is_default_billing,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        // console.log("No token found, cannot save address");
        toast.error("Please login to continue");
        return;
      }

      const baseUrl = API_BASE_URL.replace(/\/+$/, "");
      const requestBody = {
        ...formData,
        user_id: user?.id,
      };

      let url: string;
      let method: string;

      if (selectedAddressId) {
        // Update existing address
        url = `${baseUrl}/api/user-address/${selectedAddressId}`;
        method = "PUT";
      } else {
        // Create new address
        url = `${baseUrl}/api/user-address`;
        method = "POST";
      }

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(
          `Failed to ${selectedAddressId ? "update" : "save"} address: ${response.status
          } ${errorText}`
        );
      }

      const data = await response.json();
      // console.log("Save address response:", data);
      toast.success(
        `Address ${selectedAddressId ? "updated" : "saved"} successfully`
      );

      // Update addresses list with the new/updated address
      setAddresses((prev) => {
        const existingIndex = prev.findIndex(
          (addr) => addr.address_id === data.address.address_id
        );
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = data.address;
          return updated;
        }
        return [...prev, data.address];
      });

      // Set the newly saved/updated address as selected
      setSelectedAddressId(data.address.address_id);

      // Only clear form if it's a new address
      if (!selectedAddressId) {
        setFormData({
          contact_name: "",
          contact_phone: "",
          address_line1: "",
          address_line2: "",
          landmark: "",
          city: "",
          state_province: "",
          postal_code: "",
          country_code: "IN",
          address_type: "shipping",
          is_default_shipping: true,
          is_default_billing: false,
        });
        setSelectedCountry(COUNTRY_CODES.find(c => c.code === "IN") || COUNTRY_CODES[0]);
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast.error(`Failed to ${selectedAddressId ? "update" : "save"} address`);
    }
  };

  const handleOrder = async () => {
    if (!accessToken) {
      toast.error("Please login to continue");
      return;
    }
    if (!selectedAddressId) {
      toast.error("Please select a shipping address");
      return;
    }
    if (
      (paymentMethod === "credit_card" || paymentMethod === "debit_card") &&
      !selectedCardId
    ) {
      toast.error("Please select a payment card.");
      return;
    }

    setProcessingPayment(true);

    // Determine items source: cart or direct purchase
    const itemsSource =
      isDirectPurchase && directPurchaseItem
        ? [
          {
            product_id: directPurchaseItem.product.id,
            merchant_id: 1, // Default merchant ID for direct purchase
            quantity: directPurchaseItem.quantity,
            selected_attributes: directPurchaseItem.selected_attributes,
            product: directPurchaseItem.product,
          },
        ]
        : cart;

    // Calculate subtotal using original prices
    const subtotal = itemsSource.reduce((total, item) => {
      const price = item.product.original_price || item.product.price;
      return total + price * item.quantity;
    }, 0);
    const finalTotal = subtotal - discount + shippingCost;

    // Calculate distributed discount per item if there's a total discount but no itemDiscounts
    const totalItemDiscounts = Object.values(itemDiscounts || {}).reduce(
      (sum: number, discount: any) =>
        sum + (typeof discount === "number" ? discount : 0),
      0
    );
    const remainingDiscount = discount - totalItemDiscounts;

    const orderData = {
      items: itemsSource.map((item) => {
        // Use original_price as the base price for calculations
        const basePrice = item.product.original_price || item.product.price;
        const itemTotal = basePrice * item.quantity;
        let itemDiscountAmount =
          itemDiscounts && itemDiscounts[item.product.id || item.product_id]
            ? Number(itemDiscounts[item.product.id || item.product_id])
            : 0;

        // If there's remaining discount to distribute (sitewide discount not in itemDiscounts)
        if (remainingDiscount > 0 && subtotal > 0) {
          const itemProportion = itemTotal / subtotal;
          const distributedDiscount = remainingDiscount * itemProportion;
          itemDiscountAmount += distributedDiscount;
        }

        // Ensure discount doesn't exceed item total
        itemDiscountAmount = Math.min(itemDiscountAmount, itemTotal);

        // Round to 2 decimal places
        itemDiscountAmount = Math.round(itemDiscountAmount * 100) / 100;

        // Calculate per-unit discount for this item
        const perUnitDiscount = itemDiscountAmount / item.quantity;
        const roundedPerUnitDiscount = Math.round(perUnitDiscount * 100) / 100;

        // Calculate final unit price after discount
        const finalUnitPrice = basePrice - roundedPerUnitDiscount;

        return {
          product_id: item.product.id || item.product_id,
          merchant_id: item.merchant_id || 1,
          product_name_at_purchase: item.product.name,
          sku_at_purchase: item.product.sku || "",
          quantity: item.quantity,
          unit_price_inclusive_gst: finalUnitPrice.toString(),
          line_item_total_inclusive_gst: (
            finalUnitPrice * item.quantity
          ).toString(),
          final_price_for_item: (finalUnitPrice * item.quantity).toString(),
          item_discount_inclusive: roundedPerUnitDiscount.toString(),
          selected_attributes: item.selected_attributes || {},
        };
      }),
      subtotal_amount: subtotal.toString(),
      discount_amount: "0.00", // Set to 0 since discounts are now item-specific
      tax_amount: "0.00",
      shipping_amount: shippingCost.toString(),
      total_amount: finalTotal.toString(),
      currency: "INR",
      payment_method: paymentMethod,
      shipping_address_id: selectedAddressId,
      billing_address_id: selectedAddressId,
      shipping_method_name: "Standard Shipping",
      customer_notes: "",
      internal_notes:
        appliedPromo && appliedPromo.code
          ? `Promo code used: ${appliedPromo.code}`
          : "",
      payment_card_id:
        paymentMethod === "credit_card" || paymentMethod === "debit_card"
          ? selectedCardId
          : undefined,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "Failed to create order.");
      }

      if (responseData.status === "success") {
        const orderId = responseData.data.order_id;

        // Process payment if credit/debit card is selected
        if (paymentMethod === "credit_card" || paymentMethod === "debit_card") {
          const paymentSuccess = await processCardPayment(
            orderId,
            selectedCardId || 0
          );
          if (!paymentSuccess) {
            return;
          }
        }

        // Create merchant transactions for all merchants involved in the order
        const merchantTransactionsSuccess = await createMerchantTransactions(
          orderId
        );
        if (!merchantTransactionsSuccess) {
          console.warn(
            "Failed to create merchant transactions, but order was successful"
          );
        }

        // ------------- ShipRocket shipment creation -------------
        try {
          const shiprocketResp = await fetch(
            `${API_BASE_URL}/api/shiprocket/create-orders-for-all-merchants`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                order_id: orderId,
                delivery_address_id: selectedAddressId,
                courier_id: selectedCourier?.courier_company_id, // Include selected courier
              }),
            }
          );

          const srData = await shiprocketResp.json();

          // Only show error if ShipRocket API truly failed (no successful merchants)
          if (
            shiprocketResp.ok &&
            srData.status === "success" &&
            srData.data &&
            Array.isArray(srData.data.successful_merchants) &&
            srData.data.successful_merchants.length > 0
          ) {
            const response = srData.data;

            // Show success message to user
            if (response.successful_merchants.length > 0) {
              const successCount = response.successful_merchants.length;
              const totalCount = response.total_merchants;

              if (successCount === totalCount) {
                toast.success(
                  `Shipments created successfully for all ${totalCount} merchant(s)`
                );
              } else {
                toast.success(
                  `Shipments created for ${successCount}/${totalCount} merchants. Some failed.`
                );
              }
            }

            // Log failed merchants for debugging
            if (response.failed_merchants.length > 0) {
              console.warn(
                "Failed to create shipments for merchants:",
                response.failed_merchants
              );
              response.failed_merchants.forEach((merchantId: number) => {
                const error = response.merchant_responses[merchantId]?.error;
                console.error(
                  `Merchant ${merchantId} shipment creation failed:`,
                  error
                );
              });
            }
          } else {
            // Only show error if there are no successful merchants
            // toast.error(
            //   "Order placed successfully, but shipment creation failed for all merchants. Please contact support."
            // );
          }
        } catch (srErr) {
          console.error("ShipRocket call error:", {
            error: srErr instanceof Error ? srErr.message : String(srErr),
            stack: srErr instanceof Error ? srErr.stack : undefined,
          });

          // Don't fail the order if ShipRocket fails, but log the issue
          toast.error(
            "Order placed successfully, but shipment creation failed. Please contact support."
          );
        }

        // Clear the cart after successful order (only for cart checkout, not direct purchase)
        if (!isDirectPurchase) {
          await clearCart();
        }
        toast.success("Order placed successfully");
        // Redirect to order confirmation page
        navigate("/order-confirmation", { state: { orderId }, replace: true });
      } else {
        throw new Error(responseData.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Error in handleOrder:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to place order"
      );
    } finally {
      setProcessingPayment(false);
    }
  };

  const handleDeleteAddress = async (addressId: number) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("Please login to continue");
        return;
      }

      const baseUrl = API_BASE_URL.replace(/\/+$/, "");
      const url = `${baseUrl}/api/user-address/${addressId}?user_id=${user?.id}`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to delete address: ${response.status} ${errorText}`
        );
      }

      // Remove the deleted address from the list
      setAddresses((prev) =>
        prev.filter((addr) => addr.address_id !== addressId)
      );
      toast.success("Address deleted successfully");

      // If the deleted address was selected, clear the form
      if (selectedAddressId === addressId) {
        setSelectedAddressId(null);
        setFormData({
          contact_name: "",
          contact_phone: "",
          address_line1: "",
          address_line2: "",
          landmark: "",
          city: "",
          state_province: "",
          postal_code: "",
          country_code: "IN",
          address_type: "shipping",
          is_default_shipping: true,
          is_default_billing: false,
        });
      }
    } catch (error) {
      console.error("Error in handleDeleteAddress:", error);
      toast.error("Failed to delete address");
    }
  };

  const handleEditAddress = async (addressId: number) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("Please login to continue");
        return;
      }

      const baseUrl = API_BASE_URL.replace(/\/+$/, "");
      const url = `${baseUrl}/api/user-address/${addressId}?user_id=${user?.id}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch address: ${response.status} ${errorText}`
        );
      }

      const data = await response.json();
      const address = data.address;

      // Update form with address data
      setFormData({
        contact_name: address.contact_name,
        contact_phone: address.contact_phone,
        address_line1: address.address_line1,
        address_line2: address.address_line2 || "",
        landmark: address.landmark || "",
        city: address.city,
        state_province: address.state_province,
        postal_code: address.postal_code,
        country_code: address.country_code,
        address_type: address.address_type,
        is_default_shipping: address.is_default_shipping,
        is_default_billing: address.is_default_billing,
      });

      // Set the country code
      const country = COUNTRY_CODES.find(
        (c) => c.code === address.country_code
      );
      if (country) {
        setSelectedCountry(country);
      }

      setSelectedAddressId(addressId);
      toast.success("Address loaded for editing");
    } catch (error) {
      console.error("Error in handleEditAddress:", error);
      toast.error("Failed to load address for editing");
    }
  };

  // Add function to fetch saved cards
  const fetchSavedCards = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      const baseUrl = API_BASE_URL.replace(/\/+$/, "");
      const response = await fetch(`${baseUrl}/api/payment-cards`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch saved cards");
      }

      const data = await response.json();
      setSavedCards(data.data);
    } catch (error) {
      console.error("Error fetching saved cards:", error);
      toast.error("Failed to load saved cards");
    }
  };

  // Add function to save new card
  const handleSaveCard = async () => {
    try {
      setSavingCard(true);
      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("Please login to continue");
        return;
      }

      if (!selectedAddressId) {
        toast.error("Please select a billing address");
        return;
      }

      // Format the expiry year to be a full 4-digit year
      const currentYear = new Date().getFullYear();
      const shortYear = parseInt(cardFormData.expiry_year);
      const fullYear = shortYear < 100 ? 2000 + shortYear : shortYear;

      // Format the card data according to the API requirements
      const cardData = {
        card_type: cardFormData.card_type,
        card_holder_name: cardFormData.card_holder_name,
        billing_address_id: selectedAddressId,
        is_default: cardFormData.is_default,
        card_number: cardFormData.card_number.replace(/\s/g, ""), // Remove spaces and ensure we're sending the actual number
        cvv: cardFormData.cvv,
        expiry_month: cardFormData.expiry_month.padStart(2, "0"), // Ensure 2 digits
        expiry_year: fullYear.toString(), // Use full 4-digit year
      };

      // Debug: Log the request data (masked for security)
      // console.log("Sending card data:", {
      //   ...cardData,
      //   card_number: "****" + cardData.card_number.slice(-4), // Only log last 4 digits for security
      //   cvv: "***", // Mask CVV
      // });

      const baseUrl = API_BASE_URL.replace(/\/+$/, "");
      const response = await fetch(`${baseUrl}/api/payment-cards`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(cardData),
      });

      // Debug: Log the response status and headers
      // console.log("Response status:", response.status);
      // console.log(
      //   "Response headers:",
      //   Object.fromEntries(response.headers.entries())
      // );

      const responseData = await response.json();
      // Debug: Log the full response data
      // console.log("Response data:", responseData);

      if (!response.ok) {
        throw new Error(
          `Failed to save card: ${response.status} ${JSON.stringify(
            responseData
          )}`
        );
      }

      if (responseData.status === "success") {
        setSavedCards((prev) => [...prev, responseData.data]);
        setShowCardForm(false);
        setCardFormData({
          card_number: "",
          cvv: "",
          expiry_month: "",
          expiry_year: "",
          card_holder_name: "",
          card_type: "credit",
          billing_address_id: null,
          is_default: false,
        });
        toast.success("Card saved successfully");
      } else {
        throw new Error(responseData.message || "Failed to save card");
      }
    } catch (error) {
      console.error("Error saving card:", error);
      // Debug: Log the full error object
      console.error("Full error details:", {
        name: error instanceof Error ? error.name : "Unknown",
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
      toast.error(
        error instanceof Error ? error.message : "Failed to save card"
      );
    } finally {
      setSavingCard(false);
    }
  };

  // Add function to delete card
  const handleDeleteCard = async (cardId: number) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("Please login to continue");
        return;
      }

      const baseUrl = API_BASE_URL.replace(/\/+$/, "");
      const response = await fetch(`${baseUrl}/api/payment-cards/${cardId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete card");
      }

      setSavedCards((prev) => prev.filter((card) => card.card_id !== cardId));
      if (selectedCardId === cardId) {
        setSelectedCardId(null);
      }
      toast.success("Card deleted successfully");
    } catch (error) {
      console.error("Error deleting card:", error);
      toast.error("Failed to delete card");
    }
  };

  // Add function to set default card
  const handleSetDefaultCard = async (cardId: number) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("Please login to continue");
        return;
      }

      const baseUrl = API_BASE_URL.replace(/\/+$/, "");
      const response = await fetch(
        `${baseUrl}/api/payment-cards/${cardId}/default`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to set default card");
      }

      const data = await response.json();
      setSavedCards((prev) =>
        prev.map((card) => ({
          ...card,
          is_default: card.card_id === cardId,
        }))
      );
      toast.success("Default card updated successfully");
    } catch (error) {
      console.error("Error setting default card:", error);
      toast.error("Failed to set default card");
    }
  };

  // Add renderSavedCards function
  const renderSavedCards = () => {
    if (savedCards.length === 0) {
      return (
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">Saved Cards</h3>
          <div className="text-sm text-gray-500">No saved cards found</div>
          <button
            onClick={() => setShowCardForm(true)}
            className="mt-2 flex items-center gap-2 text-orange-500 hover:text-orange-600"
          >
            <Plus className="w-4 h-4" />
            Add New Card
          </button>
        </div>
      );
    }

    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium">Saved Cards</h3>
          <button
            onClick={() => setShowCardForm(true)}
            className="flex items-center gap-2 text-orange-500 hover:text-orange-600"
          >
            <Plus className="w-4 h-4" />
            Add New Card
          </button>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {savedCards.map((card) => (
            <div
              key={card.card_id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedCardId === card.card_id
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 hover:border-orange-300"
                }`}
              onClick={() => setSelectedCardId(card.card_id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div>
                    <p className="font-medium">{card.card_holder_name}</p>
                    <p className="text-sm text-gray-600">
                      {card.card_brand} •••• {card.last_four_digits}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        {card.card_type}
                      </span>
                      {card.is_default && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!card.is_default && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSetDefaultCard(card.card_id);
                      }}
                      className="p-1 text-gray-500 hover:text-orange-500"
                      title="Set as default"
                    >
                      <Star className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (
                        window.confirm(
                          "Are you sure you want to delete this card?"
                        )
                      ) {
                        handleDeleteCard(card.card_id);
                      }
                    }}
                    className="p-1 text-gray-500 hover:text-red-500"
                    title="Delete card"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Add renderCardForm function
  const renderCardForm = () => {
    return (
      <div className="mb-6 p-4 border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium">Add New Card</h3>
          <button
            onClick={() => setShowCardForm(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Card Number
            </label>
            <input
              type="text"
              name="card_number"
              value={cardFormData.card_number}
              onChange={handleCardInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Expiry Date
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  name="expiry_month"
                  value={cardFormData.expiry_month}
                  onChange={handleCardInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="MM"
                  maxLength={2}
                  required
                />
                <input
                  type="text"
                  name="expiry_year"
                  value={cardFormData.expiry_year}
                  onChange={handleCardInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="YY"
                  maxLength={2}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CVV</label>
              <input
                type="text"
                name="cvv"
                value={cardFormData.cvv}
                onChange={handleCardInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                placeholder="123"
                maxLength={4}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Card Holder Name
            </label>
            <input
              type="text"
              name="card_holder_name"
              value={cardFormData.card_holder_name}
              onChange={handleCardInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Card Type</label>
            <select
              name="card_type"
              value={cardFormData.card_type}
              onChange={handleCardInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              required
            >
              <option value="credit">Credit Card</option>
              <option value="debit">Debit Card</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="is_default"
              checked={cardFormData.is_default}
              onChange={(e) =>
                setCardFormData((prev) => ({
                  ...prev,
                  is_default: e.target.checked,
                }))
              }
              className="mr-2 accent-orange-500"
            />
            <label className="text-sm font-medium">
              Set as default payment method
            </label>
          </div>
          <button
            onClick={handleSaveCard}
            disabled={savingCard}
            className={`w-full py-2 rounded font-medium transition-colors ${savingCard
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
          >
            {savingCard ? "Saving..." : "Save Card"}
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="font-worksans max-w-7xl  mx-auto  px-4 py-8 flex flex-col lg:flex-row gap-6">
      {/* Payment Information */}
      <div className="flex-1 bg-white rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Payment Information</h2>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-orange-500 hover:text-orange-600 font-medium"
          >
            &larr; Continue Shopping
          </button>
        </div>

        {/* Saved Addresses */}
        {addresses.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Saved Addresses</h3>
            <div className="grid grid-cols-1 gap-3">
              {addresses.map((address) => (
                <div
                  key={address.address_id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedAddressId === address.address_id
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-orange-300"
                    }`}
                  onClick={() => handleAddressSelect(address)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-orange-500 mt-0.5" />
                      <div>
                        <p className="font-medium">{address.contact_name}</p>
                        <p className="text-sm text-gray-600">
                          {address.contact_phone}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {address.address_line1}
                          {address.address_line2 &&
                            `, ${address.address_line2}`}
                          {address.landmark && `, ${address.landmark}`}
                        </p>
                        <p className="text-sm text-gray-600">
                          {address.city}, {address.state_province}{" "}
                          {address.postal_code}
                        </p>
                        <div className="flex gap-2 mt-2">
                          {address.is_default_shipping && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              Default Shipping
                            </span>
                          )}
                          {address.is_default_billing && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              Default Billing
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditAddress(address.address_id);
                        }}
                        className="p-1 text-gray-500 hover:text-orange-500"
                        title="Edit address"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setAddressToDelete(address);
                          setDeleteModalOpen(true);
                        }}
                        className="p-1 text-gray-500 hover:text-red-500"
                        title="Delete address"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Saved Cards */}
        {(paymentMethod === "credit_card" ||
          paymentMethod === "debit_card") && (
            <>
              {renderSavedCards()}
              {showCardForm && renderCardForm()}
            </>
          )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="contact_name"
                value={formData.contact_name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Type full name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <div className="flex gap-2">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCountryCodes(!showCountryCodes)}
                    className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  >
                    {selectedCountry.phoneCode}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {showCountryCodes && (
                    <div className="absolute z-10 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                      {COUNTRY_CODES.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => handleCountrySelect(country)}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100"
                        >
                          {country.name} ({country.phoneCode})
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <input
                  type="tel"
                  name="contact_phone"
                  value={formData.contact_phone}
                  onChange={handleInputChange}
                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Phone number"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                State/Province
              </label>
              <input
                type="text"
                name="state_province"
                value={formData.state_province}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Postal Code
              </label>
              <input
                type="text"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleInputChange}
                onBlur={handlePostalCodeBlur}
                className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 ${postalCodeError
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                  }`}
                placeholder={`Enter postal code for ${selectedCountry.name}`}
                required
              />
              {postalCodeError && (
                <p className="mt-1 text-sm text-red-500">{postalCodeError}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <select
                name="country_code"
                value={formData.country_code}
                onChange={(e) => {
                  const country = COUNTRY_CODES.find(
                    (c) => c.code === e.target.value
                  );
                  if (country) {
                    setSelectedCountry(country);
                    setFormData((prev) => ({
                      ...prev,
                      country_code: country.code,
                    }));
                  }
                }}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                required
              >
                {COUNTRY_CODES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                name="address_line1"
                value={formData.address_line1}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Ex: ABC Building, 1890 NY"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Landmark (Optional)
              </label>
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Ex: Near City Park"
              />
            </div>
          </div>

          <div className="flex items-center mt-2">
            <input
              id="deliveryToAnother"
              type="checkbox"
              checked={deliveryToAnother}
              onChange={() => setDeliveryToAnother(!deliveryToAnother)}
              className="mr-2 accent-orange-500"
            />
            <label htmlFor="deliveryToAnother" className="text-sm font-medium">
              Delivery to another address?
            </label>
          </div>

          {deliveryToAnother && (
            <div className="mt-4 p-4 border border-gray-200 rounded-lg">
              <h3 className="text-sm font-medium mb-4">
                Alternative Delivery Address
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Repeat the same address fields for alternative address */}
                {/* You can create a separate form state for this */}
              </div>
            </div>
          )}

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Note</label>
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Note about your orders"
              rows={3}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded font-medium hover:bg-orange-600 transition-colors"
          >
            Save Address
          </button>
        </form>
      </div>

      {/* Order Summary */}
      <div className="w-full lg:w-[400px] bg-white rounded-lg p-1 h-fit">
        <h2 className="text-lg font-semibold mb-6">Your Order</h2>
        {/* Show warning if no courier service is available */}
        {noCourierService && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            Sorry, no courier service is available for the selected address. Please check your postal code or try a different address.
          </div>
        )}
        <OrderSummary
          className="sticky top-8 mr-20"
          selectedCountry={selectedCountry}
          discount={discount}
          promoCode={appliedPromo?.code}
          itemDiscounts={itemDiscounts}
          shippingCost={0}
          shippingLoading={false}
          availableCouriers={availableCouriers}
          selectedCourier={selectedCourier}
          onRefreshShipping={refreshShippingCost}
          directPurchaseItem={directPurchaseItem}
          onApplyPromo={handleApplyPromo}
          onRemovePromo={removePromo}
          promoLoading={promoLoading}
        />
        <div className="mb-6 ">
          <div className="font-medium mb-3">Payment Method</div>
          <div className="flex flex-col gap-2">
            <label className="flex items-center  gap-2 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="credit_card"
                checked={paymentMethod === "credit_card"}
                onChange={() => setPaymentMethod("credit_card")}
                className="accent-orange-500 bg-transparent shadow-none align-middle"
              />
              <span className="text-black font-worksans ml-1  font-normal text-[14px]">Credit Card</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="debit_card"
                checked={paymentMethod === "debit_card"}
                onChange={() => setPaymentMethod("debit_card")}
                className="accent-orange-500 bg-transparent shadow-none align-middle"
              />
              <span className="text-black font-worksans ml-1 font-normal text-[14px]">Debit Card</span>
            </label>
            <label className="flex items-center  cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="cash_on_delivery"
                checked={paymentMethod === "cash_on_delivery"}
                onChange={() => setPaymentMethod("cash_on_delivery")}
                className="accent-orange-500 bg-transparent shadow-none align-middle"
              />
              <span className="text-black font-worksans ml-1 font-normal text-[14px]">Cash on Delivery</span>
            </label>
          </div>
        </div>
        <button
          onClick={handleOrder}
          disabled={!selectedAddressId || processingPayment}
          className={`w-full py-3 rounded font-medium transition-colors ${selectedAddressId && !processingPayment
              ? "bg-orange-500 text-white hover:bg-orange-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          {processingPayment
            ? "Processing Payment..."
            : "Place Order"}
        </button>
      </div>

      {/* Confirmation Modal for address deletion */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        title="Delete Address"
        message={`Are you sure you want to delete the address for '${addressToDelete?.contact_name || "this address"}'? This action cannot be undone.`}
        onConfirm={async () => {
          if (addressToDelete) {
            await handleDeleteAddress(addressToDelete.address_id);
          }
          setDeleteModalOpen(false);
          setAddressToDelete(null);
        }}
        onCancel={() => {
          setDeleteModalOpen(false);
          setAddressToDelete(null);
        }}
        confirmText="Delete"
        cancelText="Cancel"
        // isDestructive
      />
    </div>
  );
};

export default PaymentPage;
