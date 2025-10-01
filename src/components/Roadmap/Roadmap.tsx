import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUpVariant, staggerContainer } from '../../animations/variants';
import useInView from '../../hooks/useInView';
import { useSectionTracking } from '../../hooks/useAnalyticsTracking';
import { trackExpandContent } from '../../utils/analytics';

const RoadmapSection = styled(motion.section)`
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
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
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

const Subtitle = styled(motion.p)`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const ExpandButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: 0 auto ${({ theme }) => theme.spacing['2xl']};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.accent}20 0%,
    ${({ theme }) => theme.colors.background.secondary} 100%
  );
  border: 2px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.accent};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.background.primary};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(156, 255, 0, 0.3);
  }
`;

const ExpandIcon = styled(motion.span)`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const CollapsibleContent = styled(motion.div)`
  overflow: hidden;
`;

const ContentSection = styled(motion.div)`
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const SectionSubtitle = styled(motion.h3)`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const ContentText = styled(motion.p)`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.7;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  max-width: 800px;
`;

const FeatureList = styled(motion.ul)`
  list-style: none;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const FeatureItem = styled(motion.li)`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;

  &::before {
    content: '✓';
    color: ${({ theme }) => theme.colors.accent};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    flex-shrink: 0;
    margin-top: 2px;
  }

  strong {
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const ComingSoonList = styled(motion.ul)`
  list-style: none;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ComingSoonItem = styled(motion.li)`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;

  &::before {
    content: '⏳';
    flex-shrink: 0;
    margin-top: 2px;
  }

  strong {
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const MoonshotBox = styled(motion.div)`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.accent}10 0%,
    ${({ theme }) => theme.colors.background.secondary} 100%
  );
  border: 1px solid ${({ theme }) => theme.colors.accent}40;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  margin: ${({ theme }) => theme.spacing.xl} 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.accent}08 0%,
      transparent 50%,
      ${({ theme }) => theme.colors.accent}05 100%
    );
    pointer-events: none;
  }
`;

const Roadmap: React.FC = React.memo(() => {
  const { ref, controls: inViewControls } = useInView();
  const [isExpanded, setIsExpanded] = useState(false);

  // Add section tracking for analytics
  const roadmapRef = useSectionTracking('roadmap');

  const handleToggleExpand = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    trackExpandContent('roadmap_details', newExpandedState ? 'expand' : 'collapse');
  };

  return (
    <RoadmapSection id="roadmap" ref={(el) => {
      // Combine both refs
      if (typeof ref === 'function') {
        ref(el);
      } else if (ref) {
        (ref as any).current = el;
      }
      if (roadmapRef) {
        (roadmapRef as any).current = el;
      }
    }}>
      <Container
        variants={staggerContainer}
        initial="hidden"
        animate={inViewControls}
      >
        <SectionTitle
          variants={fadeUpVariant}
        >
          The Roadmap (When We've Had Some Sleep)
        </SectionTitle>

        <Subtitle variants={fadeUpVariant}>
          We've been building this thing fueled by matcha and the dream of never forgetting
          another kanji again. Here's what we've got and what's coming down the pipeline.
        </Subtitle>

        <ExpandButton
          onClick={handleToggleExpand}
          variants={fadeUpVariant}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isExpanded ? 'Hide Roadmap Details' : 'Show Roadmap Details'}
          <ExpandIcon
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            ▼
          </ExpandIcon>
        </ExpandButton>

        <AnimatePresence>
          {isExpanded && (
            <CollapsibleContent
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: 'auto', 
                opacity: 1,
                transition: {
                  height: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
                  opacity: { duration: 0.3, delay: 0.2 }
                }
              }}
              exit={{ 
                height: 0, 
                opacity: 0,
                transition: {
                  height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                  opacity: { duration: 0.2 }
                }
              }}
            >
              <ContentSection>
                <SectionSubtitle>Available Now:</SectionSubtitle>

                <FeatureList>
                  <FeatureItem>
                    <div>
                      <strong>Complete Core 6000 vocabulary with AI sentence generation:</strong> Every essential word
                      you need, with contextually relevant example sentences created on the fly
                    </div>
                  </FeatureItem>
                  <FeatureItem>
                    <div>
                      <strong>Real-time formality switching (casual/standard/formal):</strong> Learn how to adjust your
                      speech for any social situation—from chatting with friends to formal business settings
                    </div>
                  </FeatureItem>
                  <FeatureItem>
                    <div>
                      <strong>Comprehensive grammar lessons:</strong> From particles to verb conjugations, with clear
                      explanations that actually make sense
                    </div>
                  </FeatureItem>
                  <FeatureItem>
                    <div>
                      <strong>Cultural immersion content:</strong> Understand the context behind the language with
                      insights into Japanese customs, etiquette, and daily life
                    </div>
                  </FeatureItem>
                  <FeatureItem>
                    <div>
                      <strong>Kana mastery system with native audio:</strong> Perfect your hiragana and katakana with
                      audio from actual native speakers, not robots
                    </div>
                  </FeatureItem>
                  <FeatureItem>
                    <div>
                      <strong>FSRS spaced repetition:</strong> The scientifically-proven algorithm that actually works,
                      optimizing your review schedule based on how your brain learns
                    </div>
                  </FeatureItem>
                  <FeatureItem>
                    <div>
                      <strong>Offline-first functionality:</strong> Study on the train, in a coffee shop, or anywhere
                      else without worrying about connectivity. Everything works offline.
                    </div>
                  </FeatureItem>
                </FeatureList>
              </ContentSection>

              <ContentSection>
                <SectionSubtitle>Coming Soon:</SectionSubtitle>

                <ComingSoonList>
                  <ComingSoonItem>
                    <div>
                      <strong>Handwriting recognition for kanji practice:</strong> Draw those complex characters
                      and get instant feedback on your stroke order and form
                    </div>
                  </ComingSoonItem>
                  <ComingSoonItem>
                    <div>
                      <strong>Speech recognition for pronunciation practice:</strong> Speak Japanese and get
                      real-time feedback on your pitch accent and pronunciation
                    </div>
                  </ComingSoonItem>
                  <ComingSoonItem>
                    <div>
                      <strong>Custom deck creation:</strong> Build your own study sets tailored to your specific
                      needs—textbook vocab, anime phrases, business terms, whatever you want
                    </div>
                  </ComingSoonItem>
                  <ComingSoonItem>
                    <div>
                      <strong>Anki import functionality:</strong> Already have decks in Anki? Bring them over
                      seamlessly without losing your progress
                    </div>
                  </ComingSoonItem>
                  <ComingSoonItem>
                    <div>
                      <strong>Community features and shared content:</strong> Share your custom decks, discover
                      content from other learners, and learn together
                    </div>
                  </ComingSoonItem>
                  <ComingSoonItem>
                    <div>
                      <strong>Advanced analytics dashboard:</strong> Deep dive into your learning patterns with
                      detailed stats on retention, weak points, and progress over time
                    </div>
                  </ComingSoonItem>
                  <ComingSoonItem>
                    <div>
                      <strong>Conversation practice mode:</strong> Interactive AI conversations to practice
                      real-world dialogue in various scenarios and formality levels
                    </div>
                  </ComingSoonItem>
                </ComingSoonList>
              </ContentSection>

              <ContentSection>
                <SectionSubtitle>Community-Driven Content Sharing:</SectionSubtitle>

                <MoonshotBox>
                  <ContentText>
                    <strong>The Big Vision:</strong> Imagine a platform where learners contribute and share their
                    own study materials—from vocab lists pulled from their favorite manga to grammar points that
                    finally clicked after hours of confusion. We're building a community-powered learning ecosystem
                    where everyone can both learn and teach.
                  </ContentText>
                  <ContentText style={{ marginBottom: 0 }}>
                    Users will be able to create, share, and discover custom content packs—whether that's JLPT prep
                    materials, dialect-specific vocabulary, or niche topics like cooking terms or tech jargon. The best
                    content rises to the top through community ratings and reviews. We're talking about turning individual
                    study sessions into collective knowledge that benefits everyone on their Japanese learning journey.
                  </ContentText>
                </MoonshotBox>
              </ContentSection>
            </CollapsibleContent>
          )}
        </AnimatePresence>
      </Container>
    </RoadmapSection>
  );
});

Roadmap.displayName = 'Roadmap';

export default Roadmap; 