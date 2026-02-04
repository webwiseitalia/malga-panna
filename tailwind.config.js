/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette Malga Panna
        cream: {
          50: '#FFFDF8',
          100: '#FFF9ED',
          200: '#FFF3DB',
          300: '#FFECC4',
          400: '#FFE4AA',
          500: '#F5E6D3', // Bianco panna principale
        },
        forest: {
          600: '#2D4A3E',
          700: '#1F3529',
          800: '#162419',
          900: '#0D1610',
        },
        wood: {
          300: '#C4A77D',
          400: '#A68B5B',
          500: '#8B7355',
          600: '#6B5B47',
          700: '#4A3F31',
        },
        gold: {
          400: '#D4AF37',
          500: '#C5A028',
          600: '#A6871F',
        },
        stone: {
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Lato', 'Montserrat', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-elegant': 'linear-gradient(135deg, #1F3529 0%, #2D4A3E 50%, #1F3529 100%)',
      }
    },
  },
  plugins: [],
}
