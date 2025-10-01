import React from 'react';
import styled from 'styled-components';
import MarkdownRenderer from './MarkdownRenderer';

const Content = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: 1.6;

  h3 {
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    margin: ${({ theme }) => theme.spacing.xl} 0 ${({ theme }) => theme.spacing.md};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  ul {
    margin: ${({ theme }) => theme.spacing.md} 0;
    padding-left: ${({ theme }) => theme.spacing.xl};
  }

  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

export const PrivacyPolicyContent: React.FC = () => (
    <MarkdownRenderer filePath="/assets/docs/privacy_policy.md" />
);

export const TermsOfServiceContent: React.FC = () => (
    <MarkdownRenderer filePath="/assets/docs/terms_of_service.md" />
);

export const AboutUsContent: React.FC = () => (
    <Content>
        <h3>About Nihon Dojo</h3>
        <p>
            Nihon Dojo is a no-nonsense Japanese learning app built by learners who got tired of apps that don't work.
        </p>

        <p>
            Most Japanese learning apps are designed to keep you subscribed, not to make you fluent. They feed you
            bite-sized "lessons" that feel productive but teach you nothing useful. They celebrate your "progress"
            when you've learned to say "I like apples" for the 47th time.
        </p>

        <p>
            We're different. We use proven FSRS spaced repetition, AI-powered sentence generation that only uses
            words you already know, and real cultural context. No cartoon mascots. No meaningless streaks.
            Just the tools you need to actually learn Japanese.
        </p>

        <h3>Our Mission</h3>
        <p>
            We believe learning Japanese shouldn't be gamified into meaninglessness. Our goal is to build tools
            that get you fluent in one of the hardest languages imaginable—without wasting your time pretending
            you're making progress when you're not.
        </p>

        <p>
            Nihon Dojo is designed to challenge you, not coddle you. We'll make you review words until you hate
            them, then review them more. We'll teach you how Japanese people actually talk, including all the
            social rules other apps pretend don't exist.
        </p>

        <h3>The Two-Year Fluency Guarantee</h3>
        <p>
            Use this app every day for two years. Follow the system. Do the reviews. If you're not conversationally
            fluent, we'll refund every penny. Most apps won't make this promise because they know their cute
            gamification doesn't work. We will, because we built tools that do.
        </p>

        <h3>Our Story</h3>
        <p>
            Nihon Dojo was built out of pure frustration with existing Japanese learning tools. The founder loved
            Anki but hated how example sentences in popular decks like Core 6000 used dozens of words you've never
            seen before—even with optimized learning orders.
        </p>

        <p>
            When you're still at N3 level vocabulary and the example sentence throws random N1 kanji at you, you
            can't use context clues. You're learning in a contextless vacuum. That's when the idea hit: what if
            sentences only used words you've already studied?
        </p>

        <p>
            That core insight—combined with formality switching (casual, normal, and polite examples), FSRS spaced
            repetition, and real cultural context—became Nihon Dojo. An app that actually respects how humans
            learn languages.
        </p>

        <h3>Contact Us</h3>
        <p>
            We're always looking to improve Nihon Dojo. If you have questions, feedback, or ideas for new features,
            reach out:
        </p>
        <p>
            Email: support@novabox.digital
        </p>
    </Content>
); 