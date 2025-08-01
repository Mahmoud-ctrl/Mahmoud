import React, { ReactNode, useLayoutEffect, useRef, useCallback } from "react";

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
}) => (
  <div
    className={`scroll-stack-card relative w-full h-80 my-8 p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: "hidden",
      transformStyle: "preserve-3d",
    }}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const stackCompletedRef = useRef(false);
  const lastTransformsRef = useRef(new Map<number, any>());
  const isUpdatingRef = useRef(false);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value as string);
  }, []);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const updateCardTransforms = useCallback(() => {
    const container = containerRef.current;
    if (!container || !cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const scrollTop = window.scrollY;
    const viewportHeight = window.innerHeight;
    const containerRect = container.getBoundingClientRect();
    const containerTop = containerRect.top + scrollTop;
    
    // Define a sticky area within the container where cards will stack
    const stickyAreaTop = containerTop + (containerRect.height * 0.3); // Start stacking 30% into container
    const stickyAreaHeight = viewportHeight * 0.6; // Sticky area height
    
    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardRect = card.getBoundingClientRect();
      const cardTop = cardRect.top + scrollTop;
      
      // Calculate when card should start moving toward stack
      const triggerStart = cardTop - viewportHeight + 200;
      const stackStart = stickyAreaTop;
      
      // How far into the stacking process are we?
      const stackProgress = calculateProgress(scrollTop, triggerStart, stackStart);
      
      // Calculate the target position within the sticky area
      const stackOffset = i * itemStackDistance;
      const targetY = stickyAreaTop - cardTop + stackOffset;
      
      // Only apply stacking transform if we're in the stacking zone
      let translateY = 0;
      if (scrollTop >= triggerStart && scrollTop <= stackStart + stickyAreaHeight) {
        if (scrollTop < stackStart) {
          // Moving toward stack
          translateY = stackProgress * targetY;
        } else {
          // In sticky zone - maintain stack position
          translateY = targetY;
        }
      }
      
      // Scale effect
      const scaleProgress = Math.min(1, stackProgress * 1.5);
      const targetScale = baseScale + (i * itemScale);
      const scale = 1 - scaleProgress * (1 - targetScale);
      
      // Rotation
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      // Blur for depth
      let blur = 0;
      if (blurAmount && scaleProgress > 0.3) {
        let topCardIndex = cardsRef.current.length - 1;
        for (let j = cardsRef.current.length - 1; j >= 0; j--) {
          const jCardTop = cardsRef.current[j].getBoundingClientRect().top + scrollTop;
          const jTriggerStart = jCardTop - viewportHeight + 200;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
            break;
          }
        }
        
        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.min(depthInStack * blurAmount, blurAmount * 3);
        }
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged = !lastTransform || 
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.5 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        // Clamp translateY to prevent cards from going too far up
        const clampedTranslateY = Math.max(newTransform.translateY, -cardRect.height);
        
        const transform = `translate3d(0, ${clampedTranslateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;
        card.style.filter = filter;
        card.style.zIndex = (1000 + cardsRef.current.length - i).toString();
        
        lastTransformsRef.current.set(i, { ...newTransform, translateY: clampedTranslateY });
      }

      // Stack completion check
      if (i === cardsRef.current.length - 1) {
        const isInStackZone = scrollTop >= stackStart && scrollTop <= stackStart + stickyAreaHeight;
        if (isInStackZone && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInStackZone && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage,
  ]);
  
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    cardsRef.current = Array.from(container.querySelectorAll(".scroll-stack-card")) as HTMLElement[];

    cardsRef.current.forEach((card, i) => {
      if (i < cardsRef.current.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.position = 'relative'; // Ensure all cards stay relative
    });

    const onScroll = () => {
        if(animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = requestAnimationFrame(updateCardTransforms);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateCardTransforms(); // Initial call

    return () => {
      window.removeEventListener('scroll', onScroll);
      if(animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      
      // Clean reset
      cardsRef.current.forEach(card => {
        if (card) {
          card.style.transform = '';
          card.style.filter = '';
          card.style.zIndex = '';
        }
      });
      
      stackCompletedRef.current = false;
      cardsRef.current = [];
      lastTransformsRef.current.clear();
      isUpdatingRef.current = false;
    };
  }, [itemDistance, updateCardTransforms]);

  return (
    <div
      className={`relative w-full ${className}`.trim()}
      ref={containerRef}
    >
      <div className="scroll-stack-inner pt-[10vh] px-4 sm:px-8 md:px-20 pb-[100vh] min-h-screen">
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;