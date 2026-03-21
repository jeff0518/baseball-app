import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FCCF00',
          light: '#FFF9E0',
        },
        secondary: {
          DEFAULT: '#0B1B3D',
          light: '#0B1B3D33',
        },
        background: '#F8F9FA',
        text: {
          primary: '#0B1B3D',
          secondary: '#666666',
          light: '#999999',
        },
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
        },
        // 投手/打者主题色
        pitcher: {
          main: '#004A9C',
          light: '#004A9C33',
        },
        batter: {
          main: '#FCCF00',
          light: '#FCCF0033',
        },
        border: '#E5E7EB',
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
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
      },
      fontWeight: {
        light: '300',
        normal: '400',
        bold: '700',
        black: '900',
      },
      borderRadius: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'base': '0.75rem',
        'md': '1rem',
        'lg': '1.25rem',
        'xl': '1.5rem',
        '2xl': '1.75rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'sm': '0 2px 4px rgba(0,0,0,0.02)',
        'md': '0 4px 12px rgba(0,0,0,0.08)',
        'lg': '0 10px 40px rgba(0,0,0,0.06)',
        'xl': '0 15px 50px rgba(11,27,61,0.25)',
        'focus': '0 0 0 3px rgba(252,207,0,0.5)',
      },
      animation: {
        'pulse': 'pulse 2s infinite ease-in-out',
        'ping': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { transform: 'scale(1)', filter: 'drop-shadow(0 0 0px rgba(252, 207, 0, 0))' },
          '50%': { transform: 'scale(1.08)', filter: 'drop-shadow(0 0 15px rgba(252, 207, 0, 0.4))' },
        },
        ping: {
          '75%, 100%': { transform: 'scale(1.5)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
