const defaultTheme = require('tailwindcss/defaultTheme')
const tailwindCssForms = require('@tailwindcss/forms')

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
    tailwindCssForms({
      strategy: 'class',
    }),
  ],
}
