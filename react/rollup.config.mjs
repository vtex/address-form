import path from 'node:path'
import { fileURLToPath } from 'node:url'
import glob from 'glob'
import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import jsx from 'acorn-jsx'
import externals from 'rollup-plugin-node-externals'

const EXTENSIONS = ['.js', '.jsx', '.mjs', '.json', '.ts', '.tsx']

export default {
  input: Object.fromEntries(
    glob
      .sync('./**/*.{js,ts,jsx,tsx}', {
        ignore: [
          './**/node_modules/**/*',
          './**/lib/**/*',
          './**/__mocks__/**/*',
          './**/test-modules/**/*',
          './**/*.test.*',
          './setupTests.js',
          './jest.transform.js',
        ],
      })
      .map((file) => [
        // This the file extension from each file, so e.g. nested/foo.js becomes nested/foo
        path.relative(
          '.',
          file.slice(0, file.length - path.extname(file).length)
        ),
        // This expands the relative paths to absolute paths, so e.g.
        // src/nested/foo becomes /project/src/nested/foo.js
        fileURLToPath(new URL(file, import.meta.url)),
      ])
  ),
  output: {
    format: 'cjs',
    dir: 'lib',
    preserveModules: true,
    exports: 'named',
  },
  acornInjectPlugins: [jsx()],
  plugins: [
    nodeResolve({
      extensions: EXTENSIONS,
    }),
    commonjs(),
    externals({
      include: [/@babel\/runtime/],
    }),
    json(),
    babel({
      babelrc: false,
      babelHelpers: 'inline',
      presets: [
        '@babel/preset-react',
        '@babel/preset-env',
        '@babel/preset-typescript',
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        ['@babel/plugin-transform-runtime', { helpers: false }],
      ],
      extensions: EXTENSIONS,
    }),
  ],
}
