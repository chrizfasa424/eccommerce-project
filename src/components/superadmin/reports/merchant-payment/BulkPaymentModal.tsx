import React, { useState } from 'react';
import { FaMoneyBillWave, FaTimes, FaCheck } from 'react-icons/fa';

interface Merchant {
  id: string;
  merchantName: string;
  pendingAmount: number;
}

interface BulkPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedMerchants: string[]) => void;
  merchants: Merchant[];
  totalAmount: number;
  merchantCount: number;
}

const BulkPaymentModal: React.FC<BulkPaymentModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  merchants,
  totalAmount,
  merchantCount,
}) => {
  const [selectedMerchants, setSelectedMerchants] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  if (!isOpen) return null;

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedMerchants([]);
    } else {
      setSelectedMerchants(merchants.map(m => m.id));
    }
    setSelectAll(!selectAll);
  };

  const handleMerchantToggle = (merchantId: string) => {
    setSelectedMerchants(prev => {
      if (prev.includes(merchantId)) {
        setSelectAll(false);
        return prev.filter(id => id !== merchantId);
      } else {
        const newSelected = [...prev, merchantId];
        if (newSelected.length === merchants.length) {
          setSelectAll(true);
        }
        return newSelected;
      }
    });
  };

  const selectedAmount = merchants
    .filter(m => selectedMerchants.includes(m.id))
    .reduce((sum, m) => sum + m.pendingAmount, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl shadow-2xl border border-orange-100 transform transition-all duration-300 scale-95 hover:scale-100">
        <div className="p-4 sm:p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-orange-600">Confirm Bulk Payment</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2"
            >
              <FaTimes className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-center mb-6 text-orange-500">
              <FaMoneyBillWave className="text-4xl sm:text-5xl" />
            </div>
            
            <p className="text-gray-600 mb-6 text-center text-sm sm:text-base">
              Select the merchants you want to process payments for. Only orders delivered more than 7 days ago are eligible.
            </p>

            <div className="mb-6">
              <div className="flex items-center p-3 bg-orange-50 rounded-t-xl">
                <label className="flex items-center space-x-3 text-sm font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="form-checkbox h-5 w-5 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
                  />
                  <span>Select All Merchants</span>
                </label>
              </div>

              <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-b-xl">
                {merchants.map(merchant => (
                  <div key={merchant.id} className="flex items-center justify-between p-3 hover:bg-gray-50 border-b last:border-b-0">
                    <label className="flex items-center space-x-3 flex-1">
                      <input
                        type="checkbox"
                        checked={selectedMerchants.includes(merchant.id)}
                        onChange={() => handleMerchantToggle(merchant.id)}
                        className="form-checkbox h-5 w-5 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
                      />
                      <span className="text-sm font-medium text-gray-700">{merchant.merchantName}</span>
                    </label>
                    <span className="text-sm text-green-600 font-medium">₹{merchant.pendingAmount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-orange-50 p-4 sm:p-6 rounded-xl mb-6">
              <div className="flex justify-between mb-3">
                <span className="text-gray-600 font-medium text-sm sm:text-base">Selected Merchants:</span>
                <span className="font-bold text-orange-700 text-sm sm:text-base">{selectedMerchants.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium text-sm sm:text-base">Selected Amount:</span>
                <span className="font-bold text-green-600 text-sm sm:text-base">₹{selectedAmount.toLocaleString()}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 text-center">
              This action cannot be undone. Please confirm that you want to proceed with the payments.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={onClose}
              className="w-full px-4 sm:px-6 py-2 sm:py-3 border border-orange-200 rounded-xl text-orange-600 hover:bg-orange-50 transition-colors font-medium text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(selectedMerchants)}
              disabled={selectedMerchants.length === 0}
              className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-colors font-medium shadow-lg hover:shadow-xl text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkPaymentModal; 