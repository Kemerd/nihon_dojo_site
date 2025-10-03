import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import SEO from './components/SEO/SEO';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import Pricing from './components/Pricing/Pricing';
import Roadmap from './components/Roadmap/Roadmap';
import Support from './components/Support/Support';
import Footer from './components/Footer/Footer';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import TermsOfService from './components/TermsOfService/TermsOfService';
import { initGA, trackPageView } from './utils/analytics';

const App: React.FC = () => {
  // State to track current route based on hash
  const [currentRoute, setCurrentRoute] = React.useState(window.location.hash);

  // Initialize Google Analytics and track page view
  React.useEffect(() => {
    // Initialize GA
    initGA();

    // Track initial page view
    trackPageView(window.location.pathname + window.location.search + window.location.hash);

    // Ensure page always starts at top on mount/refresh
    // Disable browser's automatic scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Force scroll to top immediately
    window.scrollTo(0, 0);

    // Also ensure it happens after any potential layout shifts
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  // Listen for hash changes to handle routing
  React.useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash);
      // Track page view on hash change
      trackPageView(window.location.pathname + window.location.search + window.location.hash);
      // Scroll to top when route changes
      window.scrollTo(0, 0);
    };

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Check if we're on the privacy policy or terms of service routes
  const isPrivacyRoute = currentRoute === '#privacy-policy';
  const isTermsRoute = currentRoute === '#terms-of-service';

  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <SEO />
        <GlobalStyles />
        <Header />
        {isPrivacyRoute ? (
          // Privacy Policy page (hidden route for Apple)
          <main>
            <PrivacyPolicy />
          </main>
        ) : isTermsRoute ? (
          // Terms of Service page (hidden route for Apple)
          <main>
            <TermsOfService />
          </main>
        ) : (
          // Normal homepage
          <main>
            <Hero />
            <Features />
            <Pricing />
            <Roadmap />
            <Support />
          </main>
        )}
        <Footer />
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
