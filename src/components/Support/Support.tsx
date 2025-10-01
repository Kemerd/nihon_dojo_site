import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUpVariant, staggerContainer, bounceScale } from '../../animations/variants';
import useInView from '../../hooks/useInView';
import { useRhythmController, useRhythmAnimation } from '../../hooks/useRhythm';
import { useSectionTracking } from '../../hooks/useAnalyticsTracking';
import { trackFAQInteraction, trackDiscordClick } from '../../utils/analytics';

const SupportSection = styled(motion.section)`
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background.secondary};
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
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
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

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing['2xl']};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
`;

// New contact section styled components
const ContactSection = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.primary};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  min-height: 500px; /* Ensure consistent height */
`;

const ContactHeader = styled(motion.div)`
  text-align: center;
`;

const ContactTitle = styled(motion.h3)`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ContactSubtitle = styled(motion.p)`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: 1.6;
`;

const ContactOptions = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  flex: 1; /* Take remaining space */
`;

const ContactOption = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1; /* Equal height for both options */
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.accent}40;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const OptionHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const OptionIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.accent}20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 24px;
`;

const OptionTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const OptionDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: 1.5;
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  flex: 1; /* Take remaining space to push button to bottom */
`;

// Sexy glowing email text
const EmailText = styled(motion.a)`
  color: #60a5fa; /* Nice blue color */
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    color: #3b82f6;
    text-shadow: 0 0 20px rgba(96, 165, 250, 0.6);
  }
`;

// Discord button styled to match the header but bigger and centered
const DiscordButton = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #5865f2;
  width: 180px;
  height: 50px;
  border-radius: 18px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 2px 8px rgba(88, 101, 242, 0.3);
  overflow: hidden;
  cursor: pointer;
  margin: 0 auto; /* Center the button */
  
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='50'%3E%3Crect width='180' height='50' rx='18' ry='18'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='50'%3E%3Crect width='180' height='50' rx='18' ry='18'/%3E%3C/svg%3E");

  &:hover {
    background-color: #4752c4;
    transform: scale(1.03);
    box-shadow: 0 4px 12px rgba(88, 101, 242, 0.5);
  }
  
  svg {
    width: 100%;
    height: 24px;
    fill: white;
  }
`;

// Discord SVG component (copied from Header)
const DiscordSVG = () => (
  <svg height="24" viewBox="-2.69 .21 802.65 159.23867842" xmlns="http://www.w3.org/2000/svg">
    <path d="m799.96 37.4v80.85h-26.97v-14.71c-2.28 5.54-5.74 9.76-10.4 12.64-4.65 2.87-10.41 4.32-17.23 4.32-6.1 0-11.42-1.51-15.97-4.54-4.54-3.03-8.05-7.19-10.52-12.47-2.45-5.28-3.69-11.24-3.69-17.92-.08-6.88 1.23-13.06 3.91-18.53s6.47-9.73 11.34-12.8c4.88-3.06 10.45-4.6 16.69-4.6 12.85 0 21.47 5.69 25.87 17.07v-29.31zm-31 58.01c2.76-2.73 4.12-6.28 4.12-10.61 0-4.18-1.33-7.6-4.01-10.22-2.67-2.61-6.34-3.93-10.94-3.93-4.55 0-8.18 1.33-10.9 4-2.72 2.66-4.07 6.11-4.07 10.38s1.35 7.75 4.07 10.44c2.72 2.7 6.31 4.04 10.79 4.04 4.54-.01 8.19-1.38 10.94-4.1zm-58.61-41.62v24.26c-2.8-1.88-6.42-2.81-10.9-2.81-5.87 0-10.39 1.81-13.54 5.44-3.16 3.63-4.73 9.27-4.73 16.91v20.66h-26.97v-65.69h26.42v20.88c1.46-7.63 3.84-13.26 7.11-16.9 3.25-3.63 7.46-5.44 12.59-5.44 3.89 0 7.22.9 10.02 2.69zm-130.61 61.99c-6.35-3.14-11.19-7.44-14.53-12.91-3.33-5.47-5.01-11.57-5.01-18.31s1.66-12.75 5.01-18.03 8.16-9.42 14.49-12.42c6.3-3 13.83-4.49 22.56-4.49s16.26 1.49 22.57 4.49 11.12 7.11 14.42 12.36c3.31 5.24 4.96 11.26 4.96 18.08 0 6.73-1.65 12.83-4.96 18.3-3.3 5.47-8.13 9.77-14.48 12.92-6.36 3.14-13.86 4.71-22.52 4.71-8.67 0-16.17-1.55-22.51-4.7zm33.45-19.92c2.68-2.73 4.03-6.34 4.03-10.83s-1.34-8.07-4.03-10.72c-2.67-2.66-6.32-3.99-10.94-3.99-4.71 0-8.39 1.33-11.07 3.99s-4.01 6.23-4.01 10.72 1.33 8.1 4.01 10.83c2.67 2.72 6.36 4.1 11.07 4.1 4.62-.01 8.27-1.38 10.94-4.1zm-111.67 19.92c-6.31-3.14-11.07-7.41-14.25-12.8s-4.78-11.46-4.78-18.19c0-6.74 1.65-12.77 4.95-18.08 3.31-5.31 8.15-9.49 14.54-12.52 6.38-3.03 14.01-4.54 22.89-4.54 11.01 0 20.15 2.36 27.41 7.08v20.55c-2.56-1.8-5.55-3.26-8.96-4.38s-7.06-1.69-10.96-1.69c-6.83 0-12.16 1.27-16.01 3.82s-5.79 5.87-5.79 10c0 4.04 1.87 7.34 5.62 9.94 3.74 2.59 9.16 3.89 16.29 3.89 3.66 0 7.28-.55 10.85-1.62 3.55-1.1 6.62-2.43 9.18-4v19.88c-8.06 4.94-17.42 7.41-28.07 7.41-8.96-.03-16.6-1.6-22.91-4.75zm-77.94 2.36c-5.95-1.57-11.31-3.85-16.08-6.85v-18.64c3.61 2.84 8.43 5.18 14.49 7.02 6.05 1.83 11.9 2.75 17.56 2.75 2.65 0 4.64-.36 5.99-1.06 1.36-.71 2.04-1.56 2.04-2.54 0-1.12-.37-2.05-1.11-2.8-.74-.76-2.17-1.38-4.29-1.91l-13.21-3.03c-7.56-1.8-12.93-4.29-16.12-7.48-3.19-3.18-4.78-7.35-4.78-12.51 0-4.35 1.38-8.12 4.18-11.35 2.79-3.22 6.75-5.71 11.89-7.46 5.15-1.76 11.15-2.64 18.06-2.64 6.16 0 11.81.67 16.95 2.02s9.39 3.06 12.77 5.16v17.64c-3.46-2.11-7.43-3.76-11.95-5.01-4.52-1.24-9.15-1.84-13.94-1.84-6.9 0-10.34 1.2-10.34 3.59 0 1.12.53 1.96 1.6 2.52s3.03 1.14 5.88 1.75l11.01 2.02c7.19 1.26 12.55 3.49 16.07 6.67 3.53 3.18 5.29 7.88 5.29 14.1 0 6.82-2.91 12.23-8.75 16.24-5.83 4.01-14.11 6.01-24.83 6.01-6.31-.01-12.44-.8-18.38-2.37zm-55.01-50.1c8.24 3.62 18.46 3.78 26.89 0v50.56h-26.89zm13.46-8.49c7.42 0 13.44-5.52 13.44-12.32s-6.02-12.32-13.44-12.32c-7.43 0-13.45 5.52-13.45 12.32s6.02 12.32 13.45 12.32zm-113.34-19.91h42.93c10.35 0 19.09 1.65 26.26 4.94 7.16 3.29 12.52 7.88 16.08 13.75 3.55 5.87 5.34 12.6 5.34 20.17 0 7.41-1.86 14.13-5.57 20.15-3.71 6.03-9.35 10.79-16.95 14.31-7.59 3.51-17 5.28-28.24 5.28h-39.85zm39.41 58.62c6.96 0 12.33-1.78 16.07-5.32 3.74-3.57 5.61-8.41 5.61-14.55 0-5.7-1.67-10.24-5-13.64s-8.38-5.12-15.13-5.12h-13.43v38.63zm-109 30.62c-17.32 12.94-34.11 20.78-50.63 25.91-4.09-5.59-7.7-11.56-10.83-17.82a105.82 105.82 0 0 0 17.09-8.31c-1.41-1.06-2.81-2.17-4.18-3.3-32.51 15.36-68.25 15.36-101.15 0a96.475 96.475 0 0 1 -4.19 3.3c5.4 3.24 11.11 6.03 17.07 8.29-3.13 6.28-6.77 12.23-10.84 17.83-16.5-5.14-33.28-12.98-50.59-25.9-3.54-37.87 3.54-76.29 29.64-115.7 12.95-6.06 26.8-10.47 41.29-12.97 1.79 3.2 3.91 7.52 5.34 10.95 15.1-2.31 30.34-2.31 45.72 0 1.43-3.43 3.51-7.75 5.28-10.95 14.47 2.5 28.31 6.89 41.25 12.94 22.63 33.76 33.88 71.83 29.73 115.73zm-114.37-43.71c.18-11.23-7.92-20.44-17.97-20.44s-17.98 9.22-17.98 20.44c0 11.21 8.1 20.42 17.98 20.42 10.05 0 17.99-9.21 17.97-20.42zm66.43 0c.18-11.23-7.92-20.44-17.97-20.44s-17.98 9.22-17.98 20.44c0 11.21 8.1 20.42 17.98 20.42 10.05 0 17.97-9.21 17.97-20.42z" fill="currentColor"/>
  </svg>
);

const FAQSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  min-height: 500px; /* Match contact section height */
`;

const FAQItem = styled(motion.div)`
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
`;

const FAQQuestion = styled(motion.button)`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-align: left;
  cursor: pointer;
  border: none;
  outline: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: ${({ theme }) => `${theme.colors.background.primary}dd`};
    transform: translateX(4px);
  }
`;

const FAQAnswer = styled(motion.div)`
  color: ${({ theme }) => theme.colors.text.secondary};
  background: ${({ theme }) => theme.colors.background.primary}80;
  line-height: 1.6;
  overflow: hidden;
  padding-left: ${({ theme }) => theme.spacing.lg};
  padding-right: ${({ theme }) => theme.spacing.lg};
`;

const faqs = [
    {
        question: "How does Nihon Dojo actually work?",
        answer: "Nihon Dojo uses AI to generate example sentences using only words you've already learned. Combined with FSRS spaced repetition and formality switching, you learn Japanese the way humans actually acquire language - through context and repetition, not rote memorization.",
    },
    {
        question: "What is the two-year fluency guarantee?",
        answer: "Use Nihon Dojo every day for two years. Follow the system. Do the reviews. If you're not conversationally fluent in Japanese, we'll refund every penny. Most apps won't make this promise because they know their cute gamification doesn't work. We will, because we built tools that do.",
    },
    {
        question: "What's FSRS and why should I care?",
        answer: "FSRS is a spaced repetition algorithm that's scientifically proven to optimize memory retention. Unlike other apps that use generic review schedules, FSRS adapts to YOUR learning patterns. It will make you review words until you hate them, then review them more. No shortcuts, just results.",
    },
    {
        question: "What's formality switching?",
        answer: "Every Japanese sentence can be said in multiple ways depending on who you're talking to. Our formality switching teaches you casual (for friends), standard (neutral), and formal/keigo (for bosses and strangers). Other apps teach you one way and call it a day. We teach you how real Japanese people actually talk.",
    },
    {
        question: "Can I really become fluent in 2 years?",
        answer: "If you use the app every day and do the work, yes. Fluency isn't magic - it's consistent exposure and practice. We've built a system that makes that practice as efficient as possible. But if you're looking for effortless language learning, we're not your app.",
    },
    {
        question: "Does it work offline?",
        answer: "Yes. While you need internet to generate new AI sentences, the app works perfectly offline once content is cached. Study on planes, trains, or anywhere without WiFi.",
    },
    {
        question: "What if I cancel my subscription?",
        answer: "You keep access until the end of your billing period. After that, you can still use the free features. Your progress is saved if you want to come back later. We don't typically issue refunds (AI tokens are expensive), but the two-year guarantee still applies.",
    },
    {
        question: "Is this better than Anki?",
        answer: "Anki is great if you love tinkering and don't mind example sentences with kanji you've never seen. We built Nihon Dojo because we got tired of that. Our AI generates sentences using only words you know. If you want plug-and-play learning that actually works, that's us.",
    },
];

const Support: React.FC = () => {
    const { ref, controls } = useInView();
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);
    const [contentHeights, setContentHeights] = useState<{ [key: number]: number }>({});
    const contentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
    
    // Add section tracking for analytics
    const supportRef = useSectionTracking('support');
    
    // Measure content height when FAQ opens
    useEffect(() => {
        if (openFAQ !== null && contentRefs.current[openFAQ]) {
            const element = contentRefs.current[openFAQ];
            if (element) {
                // Temporarily set padding and height to measure full size
                element.style.height = 'auto';
                element.style.paddingTop = '24px';
                element.style.paddingBottom = '24px';
                const height = element.scrollHeight; // This now includes the padding
                // Reset to 0 for animation
                element.style.height = '0px';
                element.style.paddingTop = '0px';
                element.style.paddingBottom = '0px';
                
                setContentHeights(prev => ({
                    ...prev,
                    [openFAQ]: height
                }));
            }
        }
    }, [openFAQ]);
    
    // Handler for FAQ interactions
    const handleFAQClick = (index: number, question: string) => {
        const isCurrentlyOpen = openFAQ === index;
        setOpenFAQ(isCurrentlyOpen ? null : index);
        trackFAQInteraction(question, isCurrentlyOpen ? 'collapse' : 'expand');
    };
    
    // Handler for Discord button clicks
    const handleDiscordClick = () => {
        trackDiscordClick('support');
    };
    
    // Rhythm animations disabled for Nihon Dojo
    // Get rhythm controller for synced animations
    // const currentBeat = useRhythmController(120);

    // Create glowing animations for email and Discord
    // const emailGlowControls = useRhythmAnimation(
    //     {
    //         textShadow: "0 0 25px rgba(96, 165, 250, 0.8), 0 0 50px rgba(96, 165, 250, 0.4)",
    //         scale: 1.02,
    //     },
    //     {
    //         textShadow: "0 0 15px rgba(96, 165, 250, 0.4), 0 0 30px rgba(96, 165, 250, 0.2)",
    //         scale: 1,
    //     },
    //     [0, 1, 2, 3], // Glow on every beat
    //     120,
    //     currentBeat
    // );

    // const discordGlowControls = useRhythmAnimation(
    //     {
    //         boxShadow: "0 0 30px rgba(88, 101, 242, 0.8), 0 0 60px rgba(88, 101, 242, 0.4)",
    //         scale: 1.02,
    //     },
    //     {
    //         boxShadow: "0 2px 8px rgba(88, 101, 242, 0.3), 0 0 20px rgba(88, 101, 242, 0.2)",
    //         scale: 1,
    //     },
    //     [1, 3], // Glow on beats 1 and 3 (like snare)
    //     120,
    //     currentBeat
    // );

    return (
        <SupportSection id="support" ref={(el) => {
            // Assign to useInView ref
            if (typeof ref === 'function') {
                ref(el);
            } else if (ref) {
                (ref as any).current = el;
            }
            // Assign to analytics tracking ref  
            if (supportRef) {
                (supportRef as any).current = el;
            }
        }}>
            <Container
                variants={staggerContainer}
                initial="hidden"
                animate={controls}
            >
                <SectionTitle variants={fadeUpVariant}>
                    Need Help?
                </SectionTitle>

                <Grid>
                    <ContactSection variants={fadeUpVariant}>
                        <ContactHeader>
                            <ContactTitle>
                                Look, we get it.
                            </ContactTitle>
                            <ContactSubtitle>
                                Revolutionary AI language learning can be confusing. You're still struggling with particles despite our best efforts.
                                Or maybe you just want to tell us how amazing we are. Either way, we're here for you.
                            </ContactSubtitle>
                        </ContactHeader>

                        <ContactOptions>
                            <ContactOption>
                                <OptionHeader>
                                    <OptionIcon>📧</OptionIcon>
                                    <OptionTitle>Email Us</OptionTitle>
                                </OptionHeader>
                                <OptionDescription>
                                    Send us an email and we'll get back to you as soon as possible, typically within 24-48 hours.
                                </OptionDescription>
                                <EmailText
                                    href="mailto:support@novabox.digital"
                                >
                                    support@novabox.digital
                                </EmailText>
                            </ContactOption>

                            <ContactOption>
                                <OptionHeader>
                                    <OptionIcon>💬</OptionIcon>
                                    <OptionTitle>Join Discord</OptionTitle>
                                </OptionHeader>
                                <OptionDescription>
                                    Join our community of learners, get real-time help, and be the first to know about new features.
                                </OptionDescription>
                                <DiscordButton
                                    href="https://discord.gg/ZEJ97uwSSX"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variants={bounceScale}
                                    whileHover="hover"
                                    whileTap="tap"
                                    onClick={handleDiscordClick}
                                >
                                    <DiscordSVG />
                                </DiscordButton>
                            </ContactOption>
                        </ContactOptions>
                    </ContactSection>

                    <FAQSection variants={fadeUpVariant}>
                        {faqs.map((faq, index) => (
                            <FAQItem key={index}>
                                <FAQQuestion
                                    onClick={() => handleFAQClick(index, faq.question)}
                                >
                                    {faq.question}
                                    <motion.span
                                        animate={{ 
                                            rotate: openFAQ === index ? 180 : 0,
                                        }}
                                        transition={{ 
                                            type: 'spring', 
                                            stiffness: 300, 
                                            damping: 20,
                                            duration: 0.4,
                                        }}
                                        style={{
                                            transformOrigin: 'center',
                                            display: 'inline-block',
                                        }}
                                    >
                                        ↓
                                    </motion.span>
                                </FAQQuestion>
                                <AnimatePresence initial={false}>
                                    {openFAQ === index && (
                                        <FAQAnswer
                                            key="content"
                                            ref={(el) => {
                                                contentRefs.current[index] = el;
                                            }}
                                            initial={{ 
                                                height: 0,
                                                opacity: 0,
                                                paddingTop: 0,
                                                paddingBottom: 0,
                                            }}
                                            animate={{ 
                                                height: contentHeights[index] || 'auto',
                                                opacity: 1,
                                                paddingTop: 24,
                                                paddingBottom: 24,
                                            }}
                                            exit={{ 
                                                height: 0,
                                                opacity: 0,
                                                paddingTop: 0,
                                                paddingBottom: 0,
                                            }}
                                            transition={{
                                                height: {
                                                    type: 'spring',
                                                    stiffness: 400,
                                                    damping: 30,
                                                    mass: 0.8,
                                                },
                                                paddingTop: {
                                                    type: 'spring',
                                                    stiffness: 400,
                                                    damping: 30,
                                                    mass: 0.8,
                                                },
                                                paddingBottom: {
                                                    type: 'spring',
                                                    stiffness: 400,
                                                    damping: 30,
                                                    mass: 0.8,
                                                },
                                                opacity: { 
                                                    duration: 0.2, 
                                                    ease: 'easeOut' 
                                                },
                                            }}
                                        >
                                            {faq.answer}
                                        </FAQAnswer>
                                    )}
                                </AnimatePresence>
                            </FAQItem>
                        ))}
                    </FAQSection>
                </Grid>
            </Container>
        </SupportSection>
    );
};

export default Support; 