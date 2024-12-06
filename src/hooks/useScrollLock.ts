import { useEffect } from 'react';

/**
 * A hook to lock/unlock scrolling on the body element
 * @param isLocked Whether scrolling should be locked
 */
const useScrollLock = (isLocked: boolean = true): void => {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    if (isLocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalStyle;
    }
    
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isLocked]);
};

export default useScrollLock; 