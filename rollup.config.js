import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import { defineConfig } from 'rollup'
import filesize from 'rollup-plugin-filesize'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'

export default defineConfig({
  input: './resources/js/app.ts',
  output: {
    sourcemap: true,
    name: 'Basement Bundle',
    file: './resources/dist/basement.bundle.min.js',
    format: 'umd',
  },
  plugins: [
    resolve({
      browser: true,
    }),
    commonjs(),
    json(),
    nodePolyfills(),
    postcss({
      extract: true,
      minimize: true,
    }),
    terser(),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          declaration: false,
        },
      },
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions: ['.ts'],
      include: ['./resources/js/**/*.ts'],
      presets: [
        [
          '@babel/preset-env',
          {
            useBuiltIns: 'usage',
            corejs: '3.25',
          },
        ],
      ],
    }),
    filesize(),
  ],
})
