import React, { useMemo, useState } from 'react';
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

// Billing toggle switch (Monthly/Yearly)
const BillingToggleContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.xl} auto;
`;

const BillingToggle = styled(motion.button).withConfig({
  shouldForwardProp: (prop) => !['isActive'].includes(prop),
})<{ isActive: boolean }>`
  background: ${({ theme }) => theme.colors.background.secondary};
  border: 2px solid ${({ theme, isActive }) =>
    isActive ? theme.colors.accent : 'rgba(255, 255, 255, 0.1)'};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.accent : theme.colors.text.secondary};
  font-weight: ${({ theme, isActive }) =>
    isActive ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.normal};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const SavingsBadge = styled.span`
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.background.primary};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-left: ${({ theme }) => theme.spacing.xs};
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
    grid-template-columns: repeat(3, 1fr);
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

  /* Flexbox layout to push button to bottom */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

  .trial-info {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.accent};
    margin-top: ${({ theme }) => theme.spacing.xs};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .savings {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.accent};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const CardContent = styled.div`
  /* Top content that can grow */
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const FeatureList = styled(motion.ul)`
  list-style: none;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  flex: 1;
`;

const FreeJoke = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-style: italic;
  margin-top: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.5;
  opacity: 0.8;
`;

const ButtonContainer = styled.div`
  /* Button container stays at bottom */
  margin-top: auto;
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

// Nihon Dojo pricing structure - Free, Pro, Expert tiers
const FREE_FEATURES = [
  'Review up to 10 cards per day',
  'Basic core flashcard system',
  'Kana game access',
  'Grammar lessons',
  'Cultural lessons',
  'Basically a glorified demo',
];

const PRO_FEATURES = [
  'Up to 20 words per day',
  'AI-generated sentences for vocabulary',
  'AI-powered learning acceleration',
  'Customer support (for paying customers)',
  'My undying love',
  'All Free tier features',
];

const EXPERT_FEATURES = [
  'Up to 40 words per day',
  'Priority sentence generation',
  'AI narration for all vocabulary',
  'Cloud backups & sync (coming soon)',
  'Early access to new features',
  'My undying love',
  'All Pro tier features',
];

// Memoized PricingCard component to prevent unnecessary re-renders
const MemoizedPricingCard = React.memo<{
    plan: {
        emoji: string;
        name: string;
        monthlyPrice: string;
        yearlyPrice: string;
        features: string[];
        isPopular?: boolean;
        ctaText: string;
        trialDaysMonthly?: number;
        trialDaysYearly?: number;
    };
    index: number;
    isYearly: boolean;
}>(({ plan, index, isYearly }) => {
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

    // Calculate the current price based on billing cycle
    const displayPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
    const trialDays = isYearly ? plan.trialDaysYearly : plan.trialDaysMonthly;

    // Check if this is the Free tier
    const isFree = plan.monthlyPrice === '$0';

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
                    MOST POPULAR
                </PopularBadge>
            )}

            <CardContent>
                <PlanName>{plan.emoji} {plan.name}</PlanName>
                <PlanPrice>
                    <div className="price-line">
                        <span className="amount">{displayPrice}</span>
                        <span className="period">/month</span>
                    </div>
                    {isYearly && plan.monthlyPrice !== plan.yearlyPrice && (
                        <span className="savings">Save 17%</span>
                    )}
                    {trialDays && (
                        <span className="trial-info">{trialDays}-day free trial</span>
                    )}
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

                {isFree && (
                    <FreeJoke>
                        I spent hundreds of hours building this. You get kana games, grammar, culture, and flashcards. For free. Forever. What do you want from me, my kidney? If you complain, I WILL add ads.
                    </FreeJoke>
                )}
            </CardContent>

            <ButtonContainer>
                <CTAButton
                    isPopular={plan.isPopular}
                    variants={bounceScale}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => trackPricingInteraction('cta_click', plan.name)}
                >
                    {plan.ctaText}
                </CTAButton>
            </ButtonContainer>
        </PricingCard>
    );
});

MemoizedPricingCard.displayName = 'MemoizedPricingCard';

const Pricing: React.FC = React.memo(() => {
    const { ref, controls: inViewControls } = useInView();

    // State for billing toggle (defaults to yearly as per strategy)
    const [isYearly, setIsYearly] = useState(true);

    // Add section tracking for analytics
    const pricingRef = useSectionTracking('pricing');

    // Define Nihon Dojo pricing plans with actual structure
    const pricingPlans = useMemo(() => [
        {
            emoji: '🆓',
            name: 'Free',
            monthlyPrice: '$0',
            yearlyPrice: '$0',
            features: FREE_FEATURES,
            ctaText: 'Start Free',
        },
        {
            emoji: '🚀',
            name: 'Pro',
            monthlyPrice: '$6.49',
            yearlyPrice: '$5.42',
            features: PRO_FEATURES,
            isPopular: true,
            ctaText: 'Try Pro Free',
            trialDaysMonthly: 3,
            trialDaysYearly: 7,
        },
        {
            emoji: '⭐',
            name: 'Expert',
            monthlyPrice: '$12.95',
            yearlyPrice: '$10.83',
            features: EXPERT_FEATURES,
            ctaText: 'Try Expert Free',
            trialDaysMonthly: 7,
            trialDaysYearly: 14,
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
                    Choose Your Plan
                </SectionTitle>

                <SectionSubtitle variants={fadeUpVariant}>
                    Free forever or upgrade for AI power. No fluff, no filler—just direct pricing.
                </SectionSubtitle>

                {/* Billing toggle - defaults to yearly per monetization strategy */}
                <BillingToggleContainer
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <BillingToggle
                        isActive={!isYearly}
                        onClick={() => {
                            setIsYearly(false);
                            trackPricingInteraction('toggle_billing', 'monthly');
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Monthly
                    </BillingToggle>
                    <BillingToggle
                        isActive={isYearly}
                        onClick={() => {
                            setIsYearly(true);
                            trackPricingInteraction('toggle_billing', 'yearly');
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Yearly
                        <SavingsBadge>Save 17%</SavingsBadge>
                    </BillingToggle>
                </BillingToggleContainer>

                <PricingGrid>
                    {pricingPlans.map((plan, index) => (
                        <MemoizedPricingCard
                            key={`${plan.name}-${index}`}
                            plan={plan}
                            index={index}
                            isYearly={isYearly}
                        />
                    ))}
                </PricingGrid>

                <GuaranteeNote
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <p>
                        <strong>No hidden fees.</strong> Cancel anytime. Restore purchases on any device. We're learners too—we know what it's like to have big dreams and a small budget.
                    </p>
                </GuaranteeNote>
            </Container>
        </PricingSection>
    );
});

// Add display name for debugging
Pricing.displayName = 'Pricing';

export default Pricing; 