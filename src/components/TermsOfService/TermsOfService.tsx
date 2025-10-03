import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { fadeUpVariant, staggerContainer } from '../../animations/variants';
import { TERMS_OF_SERVICE, TermsOfServiceSection } from '../../content/termsOfServiceContent';

// Main terms of service section container
const TermsSection = styled(motion.section)`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background.primary};
  position: relative;
  overflow: hidden;
`;

// Container for content with max width
const Container = styled(motion.div)`
  max-width: 900px;
  margin: 0 auto;
  padding-top: 100px; /* Account for fixed header */
  padding-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

// Title styling matching your existing sections
const Title = styled(motion.h1)`
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

// Subtitle for company name
const Subtitle = styled(motion.h2)`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

// Last updated text
const LastUpdated = styled(motion.p)`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

// Introduction paragraph
const Introduction = styled(motion.p)`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.8;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  text-align: center;
  padding: 0 ${({ theme }) => theme.spacing.xl};
`;

// Content container
const Content = styled(motion.div)`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.8;
  font-size: ${({ theme }) => theme.typography.fontSize.base};

  h2 {
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    margin-top: ${({ theme }) => theme.spacing['2xl']};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }

  h3 {
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    margin-top: ${({ theme }) => theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    margin-left: ${({ theme }) => theme.spacing.lg};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    white-space: pre-line; /* Preserve line breaks in content */
  }

  ul, ol {
    margin-left: ${({ theme }) => theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.text.primary};
    }
  }

  strong {
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

/**
 * Recursively renders terms of service sections and subsections with numbering
 */
const renderSection = (section: TermsOfServiceSection, index: number, isSubsection = false) => {
  const HeadingTag = isSubsection ? 'h3' : 'h2';

  // Create the heading text with number
  const headingText = section.number ? `${section.number} ${section.title}` : section.title;

  return (
    <div key={index}>
      <HeadingTag>{headingText}</HeadingTag>

      {/* Render main content */}
      {section.content && <p>{section.content}</p>}

      {/* Render list if present */}
      {section.list && (
        <ul>
          {section.list.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      )}

      {/* Render subsections recursively */}
      {section.subsections && section.subsections.map((subsection, i) =>
        renderSection(subsection, i, true)
      )}

      {/* Render additional content if present */}
      {section.additionalContent && <p>{section.additionalContent}</p>}
    </div>
  );
};

const TermsOfService: React.FC = () => {
  return (
    <TermsSection>
      <Container
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <Title variants={fadeUpVariant}>
          {TERMS_OF_SERVICE.serviceName} Terms of Service
        </Title>

        <Subtitle variants={fadeUpVariant}>
          Nihon Dojo Terms of Service
        </Subtitle>

        <LastUpdated variants={fadeUpVariant}>
          Effective Date: {TERMS_OF_SERVICE.effectiveDate}
        </LastUpdated>

        <Introduction variants={fadeUpVariant}>
          {TERMS_OF_SERVICE.introduction}
        </Introduction>

        <Content variants={fadeUpVariant}>
          {/* Render all numbered sections from centralized content */}
          {TERMS_OF_SERVICE.sections.map((section, index) =>
            renderSection(section, index)
          )}
        </Content>
      </Container>
    </TermsSection>
  );
};

export default TermsOfService;
