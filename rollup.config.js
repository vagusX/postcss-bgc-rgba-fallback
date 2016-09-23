const rollup = require('rollup')
const buble = require('rollup-plugin-buble')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const eslint = require('rollup-plugin-eslint')
const globals = require('rollup-plugin-node-globals')

const pkg = require('./package.json')
const external = Object.keys(pkg.dependencies)

let cache

rollup.rollup({
  entry: 'lib/index.js',
  cache: cache,
  external: external,
  plugins: [
    eslint(),
    buble(),
    commonjs({
      include: 'node_modules/**'
    }),
    globals(),
    resolve({
      jsnext: true,
      main: true
    })
  ]
}).then(bundle => {
  // cache bundle
  cache = bundle
  bundle.write({
    format: 'cjs',
    moduleName: 'postcss-bgc-rgba-fallback',
    dest: 'dist/bundle.js'
  })
})
