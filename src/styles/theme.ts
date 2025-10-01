import { DefaultTheme } from 'styled-components';

// Define our theme with colors from the Flutter app theme.dart file
// We're using a sleek, modern, Apple-inspired design language with
// glassmorphic elements throughout the UI for depth and visual hierarchy.
// Our color scheme features dark backgrounds with brand crimson accents
// for an elegant, focused Japanese language learning experience.
const theme: DefaultTheme = {
    colors: {
        primary: '#8F1D21', // primaryColor - Brand crimson
        secondary: '#1F1F21', // secondaryColor - Very dark gray
        accent: '#C91F37', // accentColor - Brand light crimson
        text: {
            primary: '#F5F5F7', // textPrimary - Platinum text for readability
            secondary: '#8E8E93', // textSecondary - Graphite for subdued text
            accent: '#C91F37', // textAccent - Brand light crimson for emphasis
        },
        background: {
            primary: '#121212', // background - Luxury charcoal
            secondary: '#1E1E1E', // surface - Obsidian surface
            gradient: 'linear-gradient(135deg, #0A0A0A 0%, #121212 50%, #1A1A1A 100%)', // backgroundGradient
        },
    },
    typography: {
        fontFamily: {
            primary: 'sfpro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            monospace: 'SF Mono, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        },
        fontSize: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
            '5xl': '3rem',
            '6xl': '4rem',
        },
        fontWeight: {
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
        },
    },
    spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '2.5rem',
        '3xl': '3rem',
    },
    breakpoints: {
        xs: '320px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
    },
    animation: {
        spring: {
            default: {
                type: 'spring',
                stiffness: 300,
                damping: 30,
            },
            soft: {
                type: 'spring',
                stiffness: 200,
                damping: 25,
            },
            bouncy: {
                type: 'spring',
                stiffness: 400,
                damping: 15,
            },
        },
        duration: {
            fast: 0.2,
            normal: 0.3,
            slow: 0.5,
        },
    },
    borderRadius: {
        sm: '0.25rem',
        md: '0.5rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px',
    },
};

export default theme; 