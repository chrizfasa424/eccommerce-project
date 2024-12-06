import React, { ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"; 
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    // Extended size options
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl", 
    "3xl": "sm:max-w-3xl",
  };

  return (
    
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out overflow-y-auto">
      {/* Added sm:my-8 for vertical margin on small screens and up */}
      {/* w-full ensures it takes available width on small screens before max-w kicks in */}
      <div
        className={`bg-white rounded-lg shadow-xl transform transition-all sm:my-8 w-full ${sizeClasses[size]} flex flex-col`}
        // Removed explicit p-6, form content will have its own padding
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {" "}
          {/* Reduced padding */}
          <h3 className="text-base sm:text-lg font-medium leading-6 text-gray-900">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-full hover:bg-gray-100" // Made button slightly larger touch target
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        {/* This children div will now contain the scrolling form */}
        <div className="flex-grow overflow-hidden">
          {" "}
          {/* This div allows the form inside to scroll independently */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
