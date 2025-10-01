import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { fadeUpVariant, staggerContainer } from '../../animations/variants';
import { useSectionTracking } from '../../hooks/useAnalyticsTracking';

// Generate array of app preview images (0.png through 10.png)
const APP_PREVIEW_IMAGES = Array.from({ length: 11 }, (_, i) =>
  `${process.env.PUBLIC_URL}/assets/images/app_previews/${i}.png`
);

// Styled components for our hero section
const HeroSection = styled(motion.section)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.xl};
  padding-top: calc(${({ theme }) => theme.spacing['3xl']} * 2);
  position: relative;
  overflow: hidden;
`;

const GradientBackground = styled(motion.div)`
  position: absolute;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  background: radial-gradient(
    circle at center,
    ${({ theme }) => `${theme.colors.accent}15`} 0%,
    transparent 70%
  );
  z-index: -1;
  transform-origin: center;
`;

const HeroContent = styled(motion.div)`
  max-width: 1200px;
  width: 100%;
  text-align: center;
  z-index: 1;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 8vw, ${({ theme }) => theme.typography.fontSize['6xl']});
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.text.primary} 0%,
    ${({ theme }) => theme.colors.accent} 50%,
    ${({ theme }) => theme.colors.text.primary} 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-size: 200% auto;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.2;
`;

const Subtitle = styled(motion.p)`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  line-height: 1.5;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

// Carousel Styled Components
const CarouselOuterContainer = styled(motion.div)`
  width: 100%;
  margin: 0;
  position: relative;
  padding: 0;
  padding-bottom: ${({ theme }) => theme.spacing['3xl']};
  &::after {
    content: '';
    position: absolute;
    bottom: -5%;
    left: 0;
    right: 0;
    height: 60%;
    background: radial-gradient(
      ellipse at center,
      ${({ theme }) => `${theme.colors.accent}1A`} 0%,
      transparent 70%
    );
    z-index: 0;
    filter: blur(30px);
    pointer-events: none;
  }
`;

const CarouselInnerContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 600px;
  perspective: 2000px;
  max-width: 1400px;
  width: 100%; /* Explicitly set width to prevent expansion/contraction */
  margin: 0 auto;
  padding-top: ${({ theme }) => theme.spacing.md};
  overflow: visible;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 500px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: 400px;
  }
`;

const CardWrapper = styled(motion.div)`
  position: absolute;
  width: clamp(280px, 25%, 420px);
  aspect-ratio: 2619 / 5436; /* Portrait phone screenshot aspect ratio (roughly 0.482:1 or 1:2.08) */
  cursor: pointer;
  transform-style: preserve-3d;
  will-change: transform, opacity, filter, box-shadow, z-index;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: clamp(200px, 35%, 320px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: clamp(160px, 50%, 280px);
  }
`;

const CardImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  user-select: none;
  /* Use drop-shadow which naturally respects alpha channel/transparency of PNG */
  filter: drop-shadow(0 8px 15px rgba(0,0,0,0.15));
  will-change: filter;

  /* Ensure image rendering preserves transparency for proper drop-shadow masking */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  image-rendering: auto;
`;

// Modal overlay styled components
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const ModalBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(25px);
`;

const ModalCardContainer = styled(motion.div)`
  position: relative;
  width: min(90vw, 500px);
  max-height: 90vh;
  aspect-ratio: 2619 / 5436;
  z-index: 1001;
`;

const Hero: React.FC = React.memo(() => {
  // Add section tracking for analytics
  const heroRef = useSectionTracking('hero');

  const gradientBackgroundAnimation = useMemo(() => ({
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 180, 360],
    },
    transition: {
      duration: 20,
      repeat: Infinity,
      repeatType: "reverse" as const,
    }
  }), []);

  // State for the active card in the carousel - Start with card 0 in center
  const [activeIndex, setActiveIndex] = useState(0);
  // State to track if a card is expanded in modal view
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  // Ref to track carousel container for debugging
  const carouselRef = React.useRef<HTMLDivElement>(null);
  // Ref to track if initial entrance animation has completed - using ref to avoid re-render
  const hasEnteredInitiallyRef = React.useRef(false);

  // Data for the carousel cards - All 10 app preview images
  const cardData = useMemo(() =>
    APP_PREVIEW_IMAGES.map((src, index) => ({
      id: index,
      src,
      alt: `Nihon Dojo App Interface - Screenshot ${index + 1}`
    }))
  , []);

  // Helper function to convert card index to position offset from center
  // 0 → 0 (center), 1 → -1 (left), 2 → 1 (right), 3 → -2 (left), 4 → 2 (right), etc.
  const getPositionOffset = useCallback((index: number) => {
    if (index === 0) return 0;
    if (index % 2 === 1) return -Math.ceil(index / 2); // Odd indices go left
    return Math.ceil(index / 2); // Even indices go right
  }, []);

  // Touch/swipe handling for mobile
  const handleDragEnd = useCallback((event: any, info: any) => {
    const threshold = 50; // Minimum distance for a swipe
    const { offset } = info;

    if (Math.abs(offset.x) > threshold) {
      if (offset.x > 0) {
        // Swiped right - cycle to next card in sequence
        setActiveIndex(prev => (prev + 1) % cardData.length);
      } else {
        // Swiped left - cycle to previous card in sequence
        setActiveIndex(prev => (prev - 1 + cardData.length) % cardData.length);
      }
    }
  }, [cardData.length]);

  // Handle card click - if clicking center card, expand it in modal
  const handleCardClick = useCallback((index: number) => {
    if (index === activeIndex) {
      // Center card clicked - expand to modal
      setExpandedCard(index);
    } else {
      // Non-center card clicked - bring it to center
      setActiveIndex(index);
    }
  }, [activeIndex]);

  // Handle closing the expanded modal
  const handleCloseModal = useCallback(() => {
    setExpandedCard(null);
  }, []);

  // Spring transition configuration for smooth card animations
  const springTransition = useMemo(() => ({
    type: "spring",
    stiffness: 220,
    damping: 28,
    mass: 0.7
  }), []);

  // Premium entrance spring animation - buttery smooth with sophisticated physics
  const entranceSpringTransition = useMemo(() => ({
    type: "spring",
    stiffness: 60,
    damping: 14,
    mass: 1.2,
    restDelta: 0.001,
    restSpeed: 0.001
  }), []);

  // Animation for individual cards with staggered breathing effect
  const getCardBreathingAnimation = useCallback((index: number, activeIndex: number) => {
    const cardPositionOffset = getPositionOffset(index);
    const activePositionOffset = getPositionOffset(activeIndex);
    const offset = cardPositionOffset - activePositionOffset;

    // Calculate delay based on distance from center - center cards breathe first
    const distanceFromCenter = Math.abs(offset);
    const delay = distanceFromCenter * 0.3; // 0.3s delay per position away from center

    return {
      y: [0, -8, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut",
        delay: delay,
      }
    };
  }, [getPositionOffset]);

  // Trigger completion of entrance animation - using ref to avoid re-render
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (carouselRef.current) {
        const rect = carouselRef.current.getBoundingClientRect();
        console.log(`🎬 ENTRANCE COMPLETE: Container width: ${rect.width}px | Setting ref (no re-render)`);
      }
      hasEnteredInitiallyRef.current = true;
      console.log(`✅ hasEnteredInitiallyRef.current = true (ref change, no state update)`);
    }, 2000); // After all cards have finished their entrance animation

    return () => clearTimeout(timer);
  }, []);

  // Log activeIndex changes to track navigation
  React.useEffect(() => {
    console.log(`🎯 ACTIVE INDEX CHANGED: ${activeIndex} | hasEnteredInitiallyRef.current: ${hasEnteredInitiallyRef.current}`);

    // Log container width on each navigation to detect expansion/contraction
    if (carouselRef.current) {
      const rect = carouselRef.current.getBoundingClientRect();
      console.log(`   📏 Container width: ${rect.width}px`);
    }
  }, [activeIndex]);

  return (
    <HeroSection
      ref={heroRef}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <GradientBackground
        {...gradientBackgroundAnimation}
      />

      <HeroContent>
        <Title
          variants={fadeUpVariant}
        >
          Master Japanese.
          <br />
          Two Years. Guaranteed.
        </Title>

        <Subtitle variants={fadeUpVariant}>
        No cartoon mascots. No meaningless streaks. Just AI-powered sentence generation, real formality switching, and a two-year fluency guarantee. Use it every day, do the work, or get your money back. Simple as that.
        </Subtitle>

        {/* Carousel Implementation */}
        <CarouselOuterContainer
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
        >
          <CarouselInnerContainer
            ref={carouselRef}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            style={{ cursor: 'grab' }}
            whileDrag={{ cursor: 'grabbing' }}
          >
            <AnimatePresence initial={true}>
                {cardData.map((card, index) => {
                  // Calculate position offset based on card index and which card is active/centered
                  const cardPositionOffset = getPositionOffset(index);
                  const activePositionOffset = getPositionOffset(activeIndex);
                  const offset = cardPositionOffset - activePositionOffset;
                  const isCenter = index === activeIndex;

                  let animateState = {};
                  let zIndex = 0;

                  // Log calculations for center card and immediate neighbors
                  if (Math.abs(offset) <= 2) {
                    const timestamp = Date.now() % 100000;
                    console.log(`📊 [${timestamp}] Card ${index} | offset: ${offset} | isCenter: ${isCenter} | cardPos: ${cardPositionOffset} | activePos: ${activePositionOffset}`)
                  }

                  // Base card width in pixels for calculations (300px as reference)
                  const baseCardWidth = 300;

                  // Center card (currently selected)
                  if (isCenter) {
                    animateState = {
                      x: 0,
                      scale: 1,
                      rotateY: 0,
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.5))' // Shadow respects PNG transparency
                    };
                    zIndex = 10;
                  }
                  // Immediate left neighbor - fully opaque with rotation towards viewer
                  else if (offset === -1) {
                    animateState = {
                      x: -baseCardWidth * 0.85,
                      scale: 0.85,
                      rotateY: -25, // Flipped: negative rotation for left side to angle inward
                      opacity: 1,
                      y: 10,
                      rotateX: 0,
                      filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.4))' // Shadow respects PNG transparency
                    };
                    zIndex = 9;
                  }
                  // Immediate right neighbor - fully opaque with rotation towards viewer
                  else if (offset === 1) {
                    animateState = {
                      x: baseCardWidth * 0.85,
                      scale: 0.85,
                      rotateY: 25, // Flipped: positive rotation for right side to angle inward
                      opacity: 1,
                      y: 10,
                      rotateX: 0,
                      filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.4))' // Shadow respects PNG transparency
                    };
                    zIndex = 9;
                  }
                  // Second-tier left neighbor
                  else if (offset === -2) {
                    animateState = {
                      x: -baseCardWidth * 1.3,
                      scale: 0.75,
                      rotateY: -35, // Flipped
                      opacity: 0.7,
                      y: 20,
                      rotateX: 0,
                      filter: 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.35)) blur(0.5px)' // Combined filters, shadow respects transparency
                    };
                    zIndex = 8;
                  }
                  // Second-tier right neighbor
                  else if (offset === 2) {
                    animateState = {
                      x: baseCardWidth * 1.3,
                      scale: 0.75,
                      rotateY: 35, // Flipped
                      opacity: 0.7,
                      y: 20,
                      rotateX: 0,
                      filter: 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.35)) blur(0.5px)' // Combined filters, shadow respects transparency
                    };
                    zIndex = 8;
                  }
                  // Further cards - rotated inward to face viewer
                  else {
                    const absOffset = Math.abs(offset);
                    const direction = offset < 0 ? -1 : 1;

                    animateState = {
                      x: direction * baseCardWidth * (1.3 + (absOffset - 2) * 0.3),
                      scale: Math.max(0.65, 0.75 - (absOffset - 2) * 0.06),
                      rotateY: -direction * Math.min(40, 35 + (absOffset - 2) * 2), // Flipped: negative direction for inward rotation
                      opacity: Math.max(0.3, 0.7 - (absOffset - 2) * 0.12),
                      y: 20 + (absOffset - 2) * 5,
                      rotateX: 0,
                      filter: `drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3)) blur(${Math.min(3, 0.5 + (absOffset - 2) * 0.8)}px)` // Combined filters, shadow respects transparency
                    };
                    zIndex = Math.max(1, 8 - (absOffset - 2));
                  }

                  // Log the calculated animateState x value for debugging x-axis issues
                  if (Math.abs(offset) <= 2) {
                    console.log(`   ↳ x: ${(animateState as any).x} | scale: ${(animateState as any).scale} | rotateY: ${(animateState as any).rotateY}`);
                  }

                  const cardHoverEffect = {
                    y: isCenter ? -8 : -12,
                    scale: isCenter ? 1.03 : 0.78,
                    filter: isCenter
                      ? 'drop-shadow(0 35px 70px rgba(0, 0, 0, 0.6))' // Enhanced shadow on hover, respects transparency
                      : 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))', // Enhanced shadow on hover, respects transparency
                  };

                  // Sophisticated entrance animation with liquid-smooth spring physics
                  const getInitialState = () => {
                    const cardOffset = getPositionOffset(index);
                    // Cards start below viewport with elegant positioning based on their final position
                    return {
                      opacity: 0,
                      scale: 0.3,
                      x: cardOffset === 0 ? "0%" : (cardOffset < 0 ? "-45%" : "45%"),
                      y: 300, // Start from below
                      rotateY: cardOffset === 0 ? 0 : (cardOffset < 0 ? 25 : -25),
                      rotateX: -15, // Subtle 3D tilt
                      filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3)) blur(10px)', // Start with both drop-shadow and blur for smooth transition
                    };
                  };

                  // Calculate staggered delay for liquid cascade effect
                  const entranceDelay = 0.5 + (Math.abs(getPositionOffset(index)) * 0.15);

                  // Build the transition based on ref (not state) to avoid re-renders
                  // Key insight: Using ref instead of state prevents re-animation when flag changes
                  const shouldUseEntranceTransition = !hasEnteredInitiallyRef.current;

                  const transitionToUse = shouldUseEntranceTransition ? {
                    // Use premium entrance spring for initial animation
                    ...entranceSpringTransition,
                    delay: entranceDelay,
                    // Custom easing for different properties
                    opacity: {
                      duration: 1.2,
                      delay: entranceDelay,
                      ease: [0.19, 1, 0.22, 1] // Expo.easeOut for opacity
                    },
                    filter: {
                      duration: 1,
                      delay: entranceDelay + 0.2,
                      ease: "easeOut"
                    }
                  } : springTransition;

                  // Log transition type for debugging
                  if (Math.abs(offset) <= 1 && index === activeIndex) {
                    console.log(`🔄 Card ${index} (CENTER) using transition: ${hasEnteredInitiallyRef.current ? 'springTransition' : 'entranceSpringTransition'}`);
                  }

                  return (
                    <CardWrapper
                      key={card.id}
                      ref={(el) => {
                        // Log card width on render to detect expansion/contraction
                        if (el && Math.abs(offset) <= 1) {
                          const rect = el.getBoundingClientRect();
                          const timestamp = Date.now() % 100000;
                          console.log(`   📐 [${timestamp}] Card ${index} DOM width: ${rect.width.toFixed(1)}px`);
                        }
                      }}
                      initial={!hasEnteredInitiallyRef.current ? getInitialState() : false} // Only apply initial state during entrance
                      animate={{
                        ...animateState,
                        zIndex
                      }}
                      transition={transitionToUse}
                      exit={{ opacity: 0, scale: 0.3, transition: { duration: 0.2 } }}
                      onClick={() => handleCardClick(index)}
                      whileHover={cardHoverEffect}
                    >
                      <motion.div
                        animate={getCardBreathingAnimation(index, activeIndex)}
                        style={{ width: '100%', height: '100%' }}
                      >
                        <CardImage
                          layoutId={`card-image-${card.id}`}
                          src={card.src}
                          alt={card.alt}
                          onLoad={() => {
                            // Log when images load to see if they cause reflows
                            if (Math.abs(offset) <= 1) {
                              console.log(`🖼️ Card ${index} image loaded | offset: ${offset}`);
                            }
                          }}
                        />
                      </motion.div>
                    </CardWrapper>
                  );
                })}
              </AnimatePresence>
            </CarouselInnerContainer>
        </CarouselOuterContainer>
      </HeroContent>

      {/* Modal for expanded card view with seamless layout animation */}
      <AnimatePresence>
        {expandedCard !== null && (
          <ModalOverlay onClick={handleCloseModal}>
            <ModalBackground
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <ModalCardContainer onClick={(e: React.MouseEvent) => e.stopPropagation()}>
              <CardImage
                layoutId={`card-image-${expandedCard}`}
                src={cardData[expandedCard].src}
                alt={cardData[expandedCard].alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 30px 80px rgba(0,0,0,0.5))'
                }}
              />
            </ModalCardContainer>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </HeroSection>
  );
});

// Add display name for debugging
Hero.displayName = 'Hero';

export default Hero;
