import { defineConfig } from 'rollup'
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import { dts } from 'rollup-plugin-dts'

export default defineConfig([
  {
    input: {
      utils: 'src/utils.ts',
      index: 'src/index.ts',
    },
    output: {
      dir: 'dist',
      format: 'cjs',
      entryFileNames: '[name].cjs',
    },
    plugins: [json(), commonjs(), resolve(), typescript(), terser()],
  },
  {
    input: 'src/utils.ts',
    output: {
      dir: 'dist',
      format: 'es',
      entryFileNames: '[name].mjs',
    },
    plugins: [json(), commonjs(), resolve(), typescript(), terser()],
  },
  {
    input: 'src/utils.ts',
    output: {
      format: 'es',
      file: 'dist/utils.d.ts',
    },
    plugins: [dts()],
  },
])
