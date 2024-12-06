import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// FAQ Item component with accordion behavior
const FAQItem: React.FC<{
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="flex justify-between items-center w-full text-left py-6"
        onClick={onToggle}
      >
        <span className="text-gray-900 font-medium text-lg">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-[#FF4D00]" />
        ) : (
          <ChevronDown className="h-5 w-5 text-[#FF4D00]" />
        )}
      </button>
      {isOpen && (
        <div className="pb-6">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number>(0); // First item open by default

  const faqItems = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept a wide range of payment methods including credit/debit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All transactions are secure and encrypted to ensure your payment information is protected."
    },
    {
      question: "How long does shipping take?",
      answer: "Shipping times vary depending on your location and the shipping method chosen. Domestic orders typically arrive within 3-5 business days, while international orders may take 7-14 business days. Express shipping options are available at checkout for faster delivery."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Products must be unused and in their original packaging. To initiate a return, please contact our customer service team through your account dashboard. Once your return is approved, we'll provide a prepaid shipping label and process your refund within 5-7 business days of receiving the returned item."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. You can see the exact shipping costs and estimated delivery time by entering your address at checkout. Please note that additional customs fees or import duties may apply depending on your country."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a confirmation email with a tracking number. You can use this number to track your package on our website or through the carrier's tracking system. You can also view your order status and tracking information in your account dashboard."
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16">
        <div className="max-w-3xl mx-auto">
          {/* FAQ Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-medium text-[#FF4D00] mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-600">Find answers to common questions about our services, shipping, returns, and more.</p>
          </div>

          {/* FAQ Items */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            {faqItems.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={index === openIndex}
                onToggle={() => setOpenIndex(index === openIndex ? -1 : index)}
              />
            ))}
          </div>

          {/* Contact Info */}
          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Still have questions? Contact us at{' '}
              <a href="mailto:support@example.com" className="text-[#FF4D00] hover:text-[#FF4D00]/90">
                support@example.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 