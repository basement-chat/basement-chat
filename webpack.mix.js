import { js } from 'laravel-mix'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

js('resources/js/app.js', 'dist/js')
  .postCss('resources/css/app.css', 'dist/css', [
    tailwindcss,
    autoprefixer,
  ])
