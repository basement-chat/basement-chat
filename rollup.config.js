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

const babelPlugin = babel({
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
})

export default defineConfig([
  {
    input: './resources/js/app.ts',
    output: {
      sourcemap: true,
      name: 'Basement Bundle',
      file: './dist/basement.bundle.min.js',
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
      typescript(),
      babelPlugin,
      filesize(),
    ],
  },
  {
    input: './resources/js/plugins/basement.ts',
    output: [
      {
        sourcemap: true,
        file: './dist/basement.plugin.esm.js',
        format: 'esm',
      },
      {
        sourcemap: true,
        file: './dist/basement.plugin.common.js',
        format: 'cjs',
        exports: 'default',
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        exclude: [
          './resources/js/*.ts',
          './resources/js/@types/*.ts',
        ],
      }),
      babelPlugin,
      filesize(),
    ],
  },
  {
    input: './resources/js/plugins/echo-options.ts',
    output: [
      {
        sourcemap: true,
        file: './dist/basement.echo-options.esm.js',
        format: 'esm',
      },
      {
        sourcemap: true,
        file: './dist/basement.echo-options.common.js',
        format: 'cjs',
        exports: 'default',
      },
    ],
    plugins: [
      typescript(),
      babelPlugin,
      filesize(),
    ],
  },
])
