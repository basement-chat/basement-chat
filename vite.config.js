/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'

export default defineConfig({
  plugins: [
    laravel({
      input: [
        'resources/js/app.ts',
      ],
      refresh: true,
    }),
  ],
})
