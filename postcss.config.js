module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
    'postcss-prefix-selector': {
      prefix: '.chat-box__container--wrapper',
      transform(prefix, selector, prefixedSelector) {
        if (selector === 'body' || selector === 'html') {
          return prefix
        }

        if (typeof (selector) === 'string' && selector.includes('tippy')) {
          return selector
        }

        return prefixedSelector
      },
    },
  },
}
