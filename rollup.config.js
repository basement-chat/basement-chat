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

const plugins = {
  resolve: resolve({
    browser: true,
  }),
  commonjs: commonjs(),
  json: json(),
  nodePolyfills: nodePolyfills(),
  postcss: postcss({
    extract: true,
    minimize: true,
  }),
  terser: terser(),
  typescript: typescript(),
  babel: babel({
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
  filesize: filesize(),
}

export default defineConfig([
  {
    input: './resources/js/app.bundle.ts',
    output: {
      sourcemap: true,
      name: 'Basement Bundle',
      file: './dist/basement.bundle.min.js',
      format: 'umd',
    },
    plugins: Object.values(plugins),
  },
  {
    input: './resources/js/app.slim.ts',
    output: {
      sourcemap: true,
      name: 'Basement Slim',
      file: './dist/basement.slim.min.js',
      format: 'umd',
    },
    plugins: [
      plugins.resolve,
      plugins.commonjs,
      plugins.json,
      plugins.nodePolyfills,
      plugins.terser,
      plugins.typescript,
      plugins.babel,
      plugins.filesize,
    ],
  },
  {
    input: './resources/js/plugins/basement.ts',
    output: [
      { file: './dist/basement.plugin.esm.js', format: 'esm' },
      { file: './dist/basement.plugin.common.js', format: 'cjs', exports: 'default' },
    ],
    plugins: [
      resolve(),
      plugins.commonjs,
      typescript({
        exclude: [
          './resources/js/*.ts',
          './resources/js/@types/*.ts',
        ],
      }),
      plugins.babel,
      plugins.filesize,
    ],
  },
])
