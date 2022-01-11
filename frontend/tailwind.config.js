import colors from 'tailwindcss/colors'

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: colors.cyan
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
