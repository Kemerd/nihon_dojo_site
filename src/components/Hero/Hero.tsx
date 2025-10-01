import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { fadeUpVariant, staggerContainer, bounceScale } from '../../animations/variants';
import { trackDownloadClick } from '../../utils/analytics';
import { useSectionTracking } from '../../hooks/useAnalyticsTracking';

// Move static data outside component to prevent recreation on every render
const IOS_APP_STORE_LOGO = `${process.env.PUBLIC_URL}/assets/images/brand-logos/ios_app_store.svg`;
const ANDROID_APP_STORE_LOGO = `${process.env.PUBLIC_URL}/assets/images/brand-logos/android_app_store.svg`;

// Generate array of app preview images (0.png through 9.png)
const APP_PREVIEW_IMAGES = Array.from({ length: 10 }, (_, i) =>
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
  margin: 0 auto ${({ theme }) => theme.spacing['2xl']};
  line-height: 1.5;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const CTAContainer = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

const DownloadButton = styled(motion.a).withConfig({
  shouldForwardProp: (prop) => !['whileHover', 'whileTap'].includes(prop),
})`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background: transparent;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-decoration: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease;
`;

const ButtonIcon = styled(motion.img)`
  height: 50px;
  width: auto;
  transition: opacity 0.2s ease-out;
`;

// New Styled Components for Carousel
const CarouselOuterContainer = styled(motion.div)`
  width: 100%;
  margin: 0 auto;
  position: relative;
  padding-top: 0;
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
  min-height: 800px;
  perspective: 1500px;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 0;
`;

const CardWrapper = styled(motion.div)`
  position: absolute;
  width: clamp(200px, 40%, 360px);
  aspect-ratio: 2619 / 5436; /* Portrait phone screenshot aspect ratio (roughly 0.482:1 or 1:2.08) */
  cursor: pointer;
  transform-style: preserve-3d;
  will-change: transform, opacity, filter, box-shadow, z-index;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  user-select: none;
  filter: drop-shadow(0 8px 15px rgba(0,0,0,0.15));
  will-change: filter;
`;

const Hero: React.FC = React.memo(() => {
  // Add section tracking for analytics
  const heroRef = useSectionTracking('hero');

  // Handler for iOS App Store button click
  const handleiOSClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    trackDownloadClick('ios');
    // TODO: Replace with actual App Store URL when available
    window.open('https://apps.apple.com/app/nihon-dojo', '_blank');
  }, []);

  // Handler for Android Play Store button click
  const handleAndroidClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    trackDownloadClick('android');
    // TODO: Replace with actual Play Store URL when available
    window.open('https://play.google.com/store/apps/details?id=com.nihondojo.app', '_blank');
  }, []);

  const appStoreButtonHover = useMemo(() => ({
    scale: 1.05,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  }), []);

  const appStoreButtonTap = useMemo(() => ({
    scale: 0.98,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  }), []);

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

  const buttonIconAnimation = useMemo(() => ({
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { type: "spring", stiffness: 300, delay: 0.1 }
  }), []);

  // State for the active card in the carousel - Start with card 0 in center
  const [activeIndex, setActiveIndex] = useState(0);
  // State to track if initial entrance animation has completed
  const [hasEnteredInitially, setHasEnteredInitially] = useState(false);

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

  // Animation for the entire carousel group
  const carouselGroupAnimation = useMemo(() => ({
    y: [5, -5, 5],
    transition: {
      duration: 8,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    }
  }), []);

  // Trigger completion of entrance animation
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setHasEnteredInitially(true);
    }, 2000); // After all cards have finished their entrance animation

    return () => clearTimeout(timer);
  }, []);

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

        <CTAContainer variants={fadeUpVariant}>
          <DownloadButton
            href="#"
            onClick={handleiOSClick}
            variants={bounceScale}
            whileHover={appStoreButtonHover}
            whileTap={appStoreButtonTap}
          >
            <ButtonIcon
              src={IOS_APP_STORE_LOGO}
              alt="Download on the App Store"
              {...buttonIconAnimation}
            />
          </DownloadButton>

          <DownloadButton
            href="#"
            onClick={handleAndroidClick}
            variants={bounceScale}
            whileHover={appStoreButtonHover}
            whileTap={appStoreButtonTap}
          >
            <ButtonIcon
              src={ANDROID_APP_STORE_LOGO}
              alt="Get it on Google Play"
              {...buttonIconAnimation}
            />
          </DownloadButton>
        </CTAContainer>

        {/* Carousel Implementation */}
        <CarouselOuterContainer
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            animate={carouselGroupAnimation}
          >
            <CarouselInnerContainer
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
              style={{ cursor: 'grab' }}
              whileDrag={{ cursor: 'grabbing' }}
            >
              <AnimatePresence initial={true}>
                {cardData.map((card, index) => {
                  const offset = index - activeIndex;
                  const isCenter = offset === 0;

                  let animateState = {};
                  let zIndex = 0;

                  if (isCenter) {
                    animateState = {
                      x: '0%',
                      scale: 1,
                      rotateY: 0,
                      opacity: 1,
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45)',
                      y: 0,
                      rotateX: 0,
                      filter: 'blur(0px)'
                    };
                    zIndex = 3;
                  } else if (offset === -1) {
                    animateState = {
                      x: '-65%',
                      scale: 0.72,
                      rotateY: 40,
                      opacity: 0.6,
                      boxShadow: '0 15px 30px -10px rgba(0, 0, 0, 0.35)',
                      y: 0,
                      rotateX: 0,
                      filter: 'blur(0px)'
                    };
                    zIndex = 2;
                  } else if (offset === 1) {
                    animateState = {
                      x: '65%',
                      scale: 0.72,
                      rotateY: -40,
                      opacity: 0.6,
                      boxShadow: '0 15px 30px -10px rgba(0, 0, 0, 0.35)',
                      y: 0,
                      rotateX: 0,
                      filter: 'blur(0px)'
                    };
                    zIndex = 2;
                  } else {
                    animateState = {
                      x: offset < 0 ? '-120%' : '120%',
                      scale: 0.5,
                      rotateY: offset < 0 ? 60 : -60,
                      opacity: 0,
                      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
                      y: 0,
                      rotateX: 0,
                      filter: 'blur(0px)'
                    };
                    zIndex = 1;
                  }

                  const cardHoverEffect = {
                    y: isCenter ? -8 : -12,
                    scale: isCenter ? 1.03 : 0.78,
                    boxShadow: isCenter
                      ? '0 30px 60px -15px rgba(0, 0, 0, 0.5)'
                      : '0 20px 40px -10px rgba(0, 0, 0, 0.4)',
                  };

                  // Sophisticated entrance animation with liquid-smooth spring physics
                  const getInitialState = () => {
                    // Always use entrance animation for initial mount
                    // Cards start below viewport with elegant positioning
                    return {
                      opacity: 0,
                      scale: 0.3,
                      x: index === 1 ? "0%" : (index < 1 ? "-45%" : "45%"),
                      y: 300, // Start from below
                      rotateY: index === 1 ? 0 : (index < 1 ? 25 : -25),
                      rotateX: -15, // Subtle 3D tilt
                      filter: 'blur(10px)', // Start blurred for premium effect
                    };
                  };

                  // Calculate staggered delay for liquid cascade effect
                  const entranceDelay = 0.5 + (Math.abs(index - 1) * 0.15);

                  return (
                    <CardWrapper
                      key={card.id}
                      initial={getInitialState()}
                      animate={{
                        ...animateState,
                        zIndex
                      }}
                      transition={
                        hasEnteredInitially
                          ? springTransition // Use fast spring for position changes after entrance
                          : {
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
                            }
                      }
                      exit={{ opacity: 0, scale: 0.3, transition: { duration: 0.2 } }}
                      onClick={() => setActiveIndex(index)}
                      whileHover={cardHoverEffect}
                    >
                      <CardImage
                        src={card.src}
                        alt={card.alt}
                      />
                    </CardWrapper>
                  );
                })}
              </AnimatePresence>
            </CarouselInnerContainer>
          </motion.div>
        </CarouselOuterContainer>
      </HeroContent>
    </HeroSection>
  );
});

// Add display name for debugging
Hero.displayName = 'Hero';

export default Hero;
