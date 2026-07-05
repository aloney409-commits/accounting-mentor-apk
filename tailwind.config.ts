import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cairo: ['var(--font-cairo)', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#6750A4',
          light: '#D0BCFF',
          dark: '#381E72',
          container: '#EADDFF',
          onPrimary: '#FFFFFF',
          onContainer: '#21005D',
        },
        secondary: {
          DEFAULT: '#625B71',
          light: '#CCC2DC',
          dark: '#332D41',
          container: '#E8DEF8',
        },
        tertiary: {
          DEFAULT: '#7D5260',
          container: '#FFD8E4',
        },
        success: {
          DEFAULT: '#2E7D32',
          light: '#A5D6A7',
          container: '#C8E6C9',
        },
        warning: {
          DEFAULT: '#F57C00',
          light: '#FFB74D',
          container: '#FFE0B2',
        },
        error: {
          DEFAULT: '#B3261E',
          light: '#F2B8B5',
          container: '#F9DEDC',
        },
        info: {
          DEFAULT: '#0288D1',
          light: '#4FC3F7',
          container: '#B3E5FC',
        },
        surface: {
          DEFAULT: '#FFFBFE',
          dim: '#DED8E1',
          bright: '#FFFBFE',
          container: '#F3EDF7',
          'container-high': '#ECE6F0',
          'container-highest': '#E6E0E9',
        },
        outline: {
          DEFAULT: '#79747E',
          variant: '#CAC4D0',
        },
        'on-surface': {
          DEFAULT: '#1D1B20',
          variant: '#49454F',
        },
      },
      borderRadius: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '28px',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
        'elev-1': '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
        'elev-2': '0 4px 8px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.04)',
        'elev-3': '0 8px 16px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.04)',
        'elev-4': '0 12px 24px rgba(0,0,0,0.10), 0 6px 12px rgba(0,0,0,0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-in': 'bounceIn 0.5s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
