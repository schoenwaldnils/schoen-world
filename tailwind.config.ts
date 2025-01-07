import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/components/**/*.{ts,tsx,mdx}',
    './src/app/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    colors: {
      accentColor: '#ba3e48',
      white: '#fafafa',
      black: '#0c0c0c',
    },
    fontFamily: {
      sans: ['Inter', 'Arial', 'Helvetica', 'sans-serif'],
    },
    extend: {
      colors: {
        brand: '#ba3e48',
        charcoal: '#272727',
      },
    },
  },
  // corePlugins: {
  //   float: false,
  //   textOpacity: false,
  //   backgroundOpacity: false,
  // },
  plugins: [],
} satisfies Config
