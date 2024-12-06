import React, { createContext, useContext, useState, useCallback } from 'react';
import ToastComponent, { Toast } from '../components/ui/Toast';

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      
      {/* Toast Container with improved positioning and styling */}
      <div className="fixed top-4 right-4 z-[9999] space-y-3 pointer-events-none">
        <div className="flex flex-col-reverse space-y-reverse space-y-3">
          {toasts.map(toast => (
            <div key={toast.id} className="pointer-events-auto">
              <ToastComponent
                toast={toast}
                onRemove={removeToast}
              />
            </div>
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
};

// Convenience hook functions
export const useToastHelpers = () => {
  const { showToast } = useToast();

  return {
    showSuccess: (title: string, message?: string) => 
      showToast({ type: 'success', title, message }),
    
    showError: (title: string, message?: string) => 
      showToast({ type: 'error', title, message }),
    
    showWarning: (title: string, message?: string) => 
      showToast({ type: 'warning', title, message }),
    
    showInfo: (title: string, message?: string) => 
      showToast({ type: 'info', title, message }),
  };
};
