const colors = require('tailwindcss/colors');

module.exports = {
  purge: {
    mode: 'all',
    content: ['./src/**/*.svelte', './src/**/*.html'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      red: colors.red,
      yellow: colors.amber,
      green: colors.emerald,
      blue: colors.blue,
      pink: colors.pink,
      indigo: colors.indigo,
      purple: colors.violet,
      pink: colors.pink
    }
  },
  variants: {
    extend: {
      borderWidth: ['focus'],
      borderColor: ['active'],
      borderOpacity: ['active'],
      translate: ['motion-reduce'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}