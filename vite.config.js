/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'

export default defineConfig({
  server: {
    watch: {
      ignored: [
        '**/vendor/**',
      ],
    },
  },
  plugins: [
    laravel({
      input: [
        'resources/js/app.ts',
      ],
      refresh: true,
    }),
  ],
})
