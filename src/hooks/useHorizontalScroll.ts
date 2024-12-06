import { useRef, useState, useEffect } from 'react';

interface UseHorizontalScrollProps {
  scrollAmount?: number;
  snapToItems?: boolean;
  itemWidth?: number;
  gap?: number;
}

export const useHorizontalScroll = ({ 
  scrollAmount = 300, 
  snapToItems = true,
  itemWidth = 0,
  gap = 12
}: UseHorizontalScrollProps = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartScrollLeft, setTouchStartScrollLeft] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate the snap position for a given scroll position
  const getSnapPosition = (scrollPosition: number, containerWidth: number, itemWidth: number, gap: number) => {
    if (!snapToItems || itemWidth === 0) return scrollPosition;
    
    const itemWidthWithGap = itemWidth + gap;
    const snapIndex = Math.round(scrollPosition / itemWidthWithGap);
    return snapIndex * itemWidthWithGap;
  };

  // Snap to the nearest item
  const snapToNearestItem = () => {
    if (!containerRef.current || !snapToItems || itemWidth === 0) return;
    
    const container = containerRef.current;
    const { scrollLeft, clientWidth } = container;
    const snapPosition = getSnapPosition(scrollLeft, clientWidth, itemWidth, gap);
    
    container.scrollTo({
      left: snapPosition,
      behavior: 'smooth'
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      if (snapToItems && isMobile) {
        // Small delay to ensure scroll position is updated
        setTimeout(snapToNearestItem, 50);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    setIsTouching(true);
    setTouchStartX(e.touches[0].pageX);
    setTouchStartScrollLeft(containerRef.current.scrollLeft);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current || !isTouching) return;
    e.preventDefault();
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isTouching) return;
    setIsTouching(false);
    
    if (!containerRef.current) return;
    
    const touchEndX = e.changedTouches[0].pageX;
    const touchDistance = touchStartX - touchEndX;
    const minSwipeDistance = 50; // Minimum distance for a swipe
    
    if (Math.abs(touchDistance) > minSwipeDistance) {
      // User made a swipe gesture
      if (snapToItems && itemWidth > 0) {
        const container = containerRef.current;
        const { scrollLeft, clientWidth } = container;
        const itemWidthWithGap = itemWidth + gap;
        
        // Determine swipe direction and snap accordingly
        if (touchDistance > 0) {
          // Swipe left - go to next item
          const currentIndex = Math.round(scrollLeft / itemWidthWithGap);
          const nextIndex = Math.min(currentIndex + 1, Math.floor((container.scrollWidth - clientWidth) / itemWidthWithGap));
          const snapPosition = nextIndex * itemWidthWithGap;
          
          container.scrollTo({
            left: snapPosition,
            behavior: 'smooth'
          });
        } else {
          // Swipe right - go to previous item
          const currentIndex = Math.round(scrollLeft / itemWidthWithGap);
          const prevIndex = Math.max(currentIndex - 1, 0);
          const snapPosition = prevIndex * itemWidthWithGap;
          
          container.scrollTo({
            left: snapPosition,
            behavior: 'smooth'
          });
        }
      }
    } else {
      // Small touch - snap to nearest item
      if (snapToItems) {
        setTimeout(snapToNearestItem, 50);
      }
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!containerRef.current) return;

    // Get the container's current scroll position and dimensions
    const container = containerRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;

    // Calculate the maximum scroll position
    const maxScroll = scrollWidth - clientWidth;

    // Only handle horizontal scrolling if there's content to scroll horizontally
    // and the wheel movement is primarily horizontal or shift+wheel
    const hasHorizontalContent = maxScroll > 0;
    const isHorizontalScroll = e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY);
    
    // Only prevent default and handle horizontally if we should
    if (hasHorizontalContent && isHorizontalScroll) {
      e.preventDefault();
      
      // Determine if we're using a touchpad (deltaMode === 0) or mouse wheel (deltaMode === 1)
      const isTouchpad = e.deltaMode === 0;
      
      // Use deltaX for horizontal scrolling, or deltaY when shift is pressed
      const scrollDelta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
      
      // Apply different scrolling behavior based on input device
      if (isTouchpad) {
        // For touchpad, use a smoother scrolling with momentum
        const scrollAmount = scrollDelta * 0.5; // Reduce the scroll amount for smoother movement
        const newScrollLeft = scrollLeft + scrollAmount;
        
        // Apply smooth scrolling with bounds checking
        container.scrollTo({
          left: Math.max(0, Math.min(newScrollLeft, maxScroll)),
          behavior: 'smooth'
        });
      } else {
        // For mouse wheel, use a more traditional scrolling
        const scrollAmount = scrollDelta * 2; // Increase scroll amount for mouse wheel
        container.scrollBy({
          left: scrollAmount,
          behavior: 'smooth'
        });
      }
    }
    // If not horizontal scrolling, let the default vertical scroll behavior happen
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    
    if (snapToItems && itemWidth > 0) {
      const container = containerRef.current;
      const { scrollLeft, clientWidth } = container;
      const itemWidthWithGap = itemWidth + gap;
      const currentIndex = Math.round(scrollLeft / itemWidthWithGap);
      
      let targetIndex: number;
      if (direction === 'left') {
        targetIndex = Math.max(currentIndex - 1, 0);
      } else {
        targetIndex = Math.min(currentIndex + 1, Math.floor((container.scrollWidth - clientWidth) / itemWidthWithGap));
      }
      
      const snapPosition = targetIndex * itemWidthWithGap;
      container.scrollTo({
        left: snapPosition,
        behavior: 'smooth'
      });
    } else {
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return {
    containerRef,
    isDragging,
    isMobile,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleWheel,
    scroll
  };
}; 