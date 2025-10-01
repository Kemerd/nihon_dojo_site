import React, { useMemo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { fadeUpVariant, staggerContainer, bounceScale } from '../../animations/variants';
import useInView from '../../hooks/useInView';
import { useSectionTracking } from '../../hooks/useAnalyticsTracking';
import { trackPricingInteraction } from '../../utils/analytics';

const PricingSection = styled(motion.section)`
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background.primary};
  position: relative;
  overflow: hidden;
`;

const Container = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
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
`;

const SectionSubtitle = styled(motion.p)`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 800px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
  line-height: 1.6;
`;

const GuaranteeNote = styled(motion.div)`
  max-width: 800px;
  margin: ${({ theme }) => theme.spacing['2xl']} auto 0;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background.secondary}80;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.accent}40;
  text-align: center;

  p {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    color: ${({ theme }) => theme.colors.text.secondary};
    line-height: 1.6;
    margin: 0;

    strong {
      color: ${({ theme }) => theme.colors.accent};
      font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    }
  }
`;

const PricingGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing['2xl']};
  padding: 0 ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const PricingCard = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['isPopular', 'whileHover'].includes(prop),
})<{ isPopular?: boolean }>`
  background: ${({ theme, isPopular }) =>
        isPopular
            ? `linear-gradient(135deg, 
          ${theme.colors.accent}15 0%,
          ${theme.colors.background.secondary} 100%)`
            : theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  position: relative;
  overflow: hidden;
  border: 1px solid ${({ theme, isPopular }) =>
        isPopular ? theme.colors.accent : 'rgba(255, 255, 255, 0.1)'};
  backdrop-filter: blur(10px);
`;

const PopularBadge = styled(motion.span)`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.background.primary};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const PlanName = styled(motion.h3)`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const PlanPrice = styled(motion.div)`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .price-line {
    display: flex;
    align-items: baseline;
    gap: ${({ theme }) => theme.spacing.xs};
  }

  .amount {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  .period {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const FeatureList = styled(motion.ul)`
  list-style: none;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Feature = styled(motion.li)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  position: relative;

  &::before {
    content: '✓';
    color: ${({ theme }) => theme.colors.accent};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const CTAButton = styled(motion.button).withConfig({
  shouldForwardProp: (prop) => !['isPopular', 'whileHover', 'whileTap'].includes(prop),
})<{ isPopular?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  background: ${({ theme, isPopular }) =>
        isPopular ? theme.colors.accent : 'transparent'};
  border: 2px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme, isPopular }) =>
        isPopular ? theme.colors.background.primary : theme.colors.accent};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.background.primary};
  }
`;

// Nihon Dojo pricing plans
const FREE_FEATURES = [
  'Core 6000 vocabulary access',
  'Basic FSRS spaced repetition',
  'Kana practice minigame',
  'Limited AI sentence generation (50/month)',
  'Grammar lessons access',
  'Cultural content (limited)',
  'Offline mode',
];

const PREMIUM_FEATURES = [
  'Everything in Free, plus:',
  'Unlimited AI sentence generation',
  'Full formality switching (tameguchi/futsū/keigo)',
  'Complete cultural immersion content',
  'Native audio for all vocabulary',
  'Priority support',
  'Two-year fluency guarantee',
];

// Memoized PricingCard component to prevent unnecessary re-renders
const MemoizedPricingCard = React.memo<{
    plan: {
        name: string;
        price: string;
        features: string[];
        isPopular?: boolean;
        ctaText: string;
    };
    index: number;
}>(({ plan, index }) => {
    // Memoize hover animation
    const hoverAnimation = useMemo(() => ({
        y: -10,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
        },
    }), []);

    // Memoize badge animation
    const badgeAnimation = useMemo(() => ({
        initial: { scale: 0 },
        animate: { scale: 1 },
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
        }
    }), []);

    return (
        <PricingCard
            variants={fadeUpVariant}
            isPopular={plan.isPopular}
            whileHover={hoverAnimation}
        >
            {plan.isPopular && (
                <PopularBadge
                    {...badgeAnimation}
                >
                    Recommended
                </PopularBadge>
            )}

            <PlanName>{plan.name}</PlanName>
            <PlanPrice>
                <div className="price-line">
                    <span className="amount">{plan.price}</span>
                    <span className="period">/month</span>
                </div>
            </PlanPrice>

            <FeatureList>
                {plan.features.map((feature, featureIndex) => (
                    <Feature
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            delay: 0.3 + featureIndex * 0.1,
                        }}
                    >
                        {feature}
                    </Feature>
                ))}
            </FeatureList>

            <CTAButton
                isPopular={plan.isPopular}
                variants={bounceScale}
                whileHover="hover"
                whileTap="tap"
                onClick={() => trackPricingInteraction('cta_click', plan.name)}
            >
                {plan.ctaText}
            </CTAButton>
        </PricingCard>
    );
});

MemoizedPricingCard.displayName = 'MemoizedPricingCard';

const Pricing: React.FC = React.memo(() => {
    const { ref, controls: inViewControls } = useInView();

    // Add section tracking for analytics
    const pricingRef = useSectionTracking('pricing');

    // Define Nihon Dojo pricing plans
    const pricingPlans = useMemo(() => [
        {
            name: 'Free Forever',
            price: '$0',
            features: FREE_FEATURES,
            ctaText: 'Start Free',
        },
        {
            name: 'Premium',
            price: '$9.99',
            features: PREMIUM_FEATURES,
            isPopular: true,
            ctaText: 'Get Premium',
        },
    ], []);

    return (
        <PricingSection id="pricing" ref={(el) => {
            // Combine both refs
            if (typeof ref === 'function') {
                ref(el);
            } else if (ref) {
                (ref as any).current = el;
            }
            if (pricingRef) {
                (pricingRef as any).current = el;
            }
        }}>
            <Container
                variants={staggerContainer}
                initial="hidden"
                animate={inViewControls}
            >
                <SectionTitle variants={fadeUpVariant}>
                    Pricing That Makes Sense
                </SectionTitle>

                <SectionSubtitle variants={fadeUpVariant}>
                    We could charge hundreds. Our investors are furious. But we're learners too, and we know what it's like to have big dreams and a small budget.
                </SectionSubtitle>

                <PricingGrid>
                    {pricingPlans.map((plan, index) => (
                        <MemoizedPricingCard
                            key={`${plan.name}-${index}`}
                            plan={plan}
                            index={index}
                        />
                    ))}
                </PricingGrid>

                <GuaranteeNote
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <p>
                        <strong>Two-year fluency guarantee:</strong> Use every day for two years. Not fluent? Full refund. We can make this promise because our system actually works.
                    </p>
                </GuaranteeNote>
            </Container>
        </PricingSection>
    );
});

// Add display name for debugging
Pricing.displayName = 'Pricing';

export default Pricing; 