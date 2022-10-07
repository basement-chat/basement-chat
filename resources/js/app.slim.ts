import basement from './plugins/basement'

document.addEventListener('alpine:init', (): void => {
  window.Alpine.plugin(basement)
})
