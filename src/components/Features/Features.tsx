import React, { useMemo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { fadeUpVariant, staggerContainer } from '../../animations/variants';
import useInView from '../../hooks/useInView';
import { useSectionTracking } from '../../hooks/useAnalyticsTracking';

// Styled components for the features section
const FeaturesSection = styled(motion.section)`
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background.secondary};
  position: relative;
  overflow: hidden;
`;

const Container = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
`;

const LogoContainer = styled(motion.div)`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  max-width: 300px;
  width: 100%;
  margin: 0 auto ${({ theme }) => theme.spacing.md};
  position: relative;
  z-index: 2;
`;

const Logo = styled(motion.img)`
  width: 100%;
  height: auto;
  /* Enhanced performance optimizations */
  will-change: transform, filter;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  /* Base position for chromatic aberration layering */
  position: relative;
  
  /* Create pseudo-elements for RGB splitting */
  &::before, &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: inherit;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.1s ease;
    mix-blend-mode: screen;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
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
  position: relative;
  z-index: 2;
`;

const FeaturesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing['2xl']};
  position: relative;
  z-index: 2;
`;

const FeatureCard = styled(motion.div)`
  background: ${({ theme }) => `linear-gradient(
    135deg,
    ${theme.colors.background.primary} 0%,
    ${theme.colors.background.secondary} 100%
  )`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${({ theme }) => theme.colors.accent}50 50%,
      transparent 100%
    );
  }
`;

const FeatureIcon = styled(motion.div)`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.accent}15;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
`;

const FeatureTitle = styled(motion.h3)`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FeatureDescription = styled(motion.p)`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ComingSoonPill = styled(motion.div)`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => `linear-gradient(
    135deg,
    ${theme.colors.accent}80 0%,
    ${theme.colors.accent} 100%
  )`};
  padding: 4px 12px;
  border-radius: 20px;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.background.primary};
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  letter-spacing: 0.5px;
`;

const GeneralSubtleTextContainer = styled(motion.div)`
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 2;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.lg};
`;

const TopSpecificSubtleTextContainer = styled(GeneralSubtleTextContainer)`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SubtleText = styled(motion.p)`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  opacity: 0.9;
  letter-spacing: 0.2px;
  text-align: center;
  margin-bottom: 0;
`;

// Move static data outside component to prevent recreation on every render

const FEATURES_DATA = [
  {
      icon: '📘',
      title: 'Core 6000 Vocabulary',
      description: 'Master 6000 essential Japanese words with AI-generated sentences using only vocabulary you\'ve already learned. No more example sentences filled with unknown kanji. Context clues that actually help.',
      comingSoon: false
  },
  {
      icon: '🎌',
      title: 'Real Formality Switching',
      description: 'Instantly switch between casual (tameguchi), standard (futsū), and formal (keigo) speech. Learn how Japanese people actually talk to friends, colleagues, and bosses. Not just textbook Japanese.',
      comingSoon: false
  },
  {
      icon: '📙',
      title: 'Comprehensive Grammar',
      description: 'Structured grammar lessons that build on each other. Optional but recommended. Explains why Japanese works the way it does, because context helps the drilling stick better.',
      comingSoon: false
  },
  {
      icon: '🎎',
      title: 'Cultural Immersion',
      description: 'Learn the social rules other apps pretend don\'t exist. Politeness levels, etiquette nuances, gendered speech. You can\'t learn the language without learning the culture.',
      comingSoon: false
  },
  {
      icon: '🈵',
      title: 'Kana Mastery System',
      description: 'Hiragana and katakana practice with native pronunciation audio. Gamified but not childish. There\'s no shortcut to learning these, but we make it less painful.',
      comingSoon: false
  },
  {
      icon: '🧠',
      title: 'Actual Spaced Repetition',
      description: 'FSRS algorithm, not some watered-down knockoff. Reviews words until you hate them, then reviews them more. No participation trophies. Just results.',
      comingSoon: false
  },
  {
      icon: '✍️',
      title: 'Kanji Writing Practice',
      description: 'Animated stroke order for every kanji. Pressure-sensitive drawing with instant feedback. Swipe right in your study session to practice writing any character. Because muscle memory beats rote memorization.',
      comingSoon: false
  },
  {
      icon: '🔊',
      title: 'Neural Text-to-Speech',
      description: 'GPU-accelerated voice synthesis that\'s 15x faster than competitors. Multiple natural voices. IPA phonemes for perfect pronunciation. Audio that renders in the background so you never wait.',
      comingSoon: false
  },
  {
      icon: '🖼️',
      title: 'Visual Learning System',
      description: 'Integrated images on flashcards that reinforce meaning. Configurable blur for Japanese side to prevent cheating. Background images for kanji practice. Because a picture is worth 一千 words.',
      comingSoon: false
  },
];


const LOGO_PATH = `${process.env.PUBLIC_URL}/assets/logo/logo_plain.png`;

// Memoized FeatureCard component to prevent unnecessary re-renders
const MemoizedFeatureCard = React.memo<{
    feature: typeof FEATURES_DATA[0];
    index: number;
}>(({ feature, index }) => {
    // Simple hover animation - no rhythm controller needed
    const hoverAnimation = useMemo(() => ({
        y: -8,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
        },
    }), []);

    // Memoize icon animation
    const iconAnimation = useMemo(() => ({
        initial: { scale: 0 },
        animate: { scale: 1 },
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
            delay: index * 0.1,
        }
    }), [index]);

    return (
        <FeatureCard
            variants={fadeUpVariant}
            whileHover={hoverAnimation}
        >
            <FeatureIcon
                {...iconAnimation}
            >
                {feature.icon}
            </FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
            {feature.comingSoon && (
                <ComingSoonPill
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                        delay: 0.5,
                    }}
                >
                    Coming Soon
                </ComingSoonPill>
            )}
        </FeatureCard>
    );
});

MemoizedFeatureCard.displayName = 'MemoizedFeatureCard';

const Features: React.FC = React.memo(() => {
    const { ref, controls: inViewControls } = useInView();

    // Add section tracking for analytics
    const featuresRef = useSectionTracking('features');

    // Memoize logo hover animation - simple scale up
    const logoHoverAnimation = useMemo(() => ({
        scale: 1.05,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 20
        }
    }), []);

    // Memoize subtitle animation
    const subtitleAnimation = useMemo(() => ({
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 0.9, y: 0 },
        transition: { type: 'spring', stiffness: 100, damping: 20, delay: 0.3 }
    }), []);

    return (
        <FeaturesSection id="features" ref={(el) => {
            // Combine both refs
            if (typeof ref === 'function') {
                ref(el);
            } else if (ref) {
                (ref as any).current = el;
            }
            if (featuresRef) {
                (featuresRef as any).current = el;
            }
        }}>
            <Container
                variants={staggerContainer}
                initial="hidden"
                animate={inViewControls}
                style={{ position: 'relative' }}
            >
                <LogoContainer variants={fadeUpVariant}>
                  <Logo
                    src={LOGO_PATH}
                    alt="Nihon Dojo Logo"
                    whileHover={logoHoverAnimation}
                  />
                </LogoContainer>

                <SectionTitle variants={fadeUpVariant}>
                    Why Nihon Dojo Works
                </SectionTitle>

                <TopSpecificSubtleTextContainer
                    variants={fadeUpVariant}
                >
                    <SubtleText
                        {...subtitleAnimation}
                    >
                        While other apps focus on making you feel productive, we focus on making you fluent. The features that actually matter.
                    </SubtleText>
                </TopSpecificSubtleTextContainer>

                <FeaturesGrid>
                    {FEATURES_DATA.map((feature, index) => (
                        <MemoizedFeatureCard
                            key={`${feature.title}-${index}`}
                            feature={feature}
                            index={index}
                        />
                    ))}
                </FeaturesGrid>
            </Container>
        </FeaturesSection>
    );
});

// Add display name for debugging
Features.displayName = 'Features';

export default Features; 