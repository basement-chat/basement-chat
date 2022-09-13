/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const tailwindcssForms = require('@tailwindcss/forms')

/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'bm-',
  content: [
    './resources/views/**/*.blade.php',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
      },
    },
  },

  plugins: [
    tailwindcssForms,
  ],
}
