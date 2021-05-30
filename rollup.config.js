import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import vue from 'rollup-plugin-vue'
import buble from '@rollup/plugin-buble'
import { terser } from 'rollup-plugin-terser'

const options = [
  {
    input: 'src/index.js',
    plugins: [
      resolve(),
      commonjs(),
      vue({ css: false }),
      postcss({
        plugins: [autoprefixer(), cssnano()],
        extract: path.resolve('lib/style.css'),
      }),
      buble(),
    ],
    external: ['vue', 'echarts/core'],
    output: [
      {
        file: 'lib/index.esm.js',
        format: 'es',
        sourcemap: true,
      },
      {
        file: 'lib/index.esm.min.js',
        format: 'es',
        sourcemap: true,
        plugins: [
          terser({
            format: {
              comments: false,
            },
          }),
        ],
      },
      {
        file: 'lib/index.cjs.js',
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
      },
      {
        file: 'lib/index.cjs.min.js',
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
        plugins: [
          terser({
            format: {
              comments: false,
            },
          }),
        ],
      },
    ],
  },
]

export default options
