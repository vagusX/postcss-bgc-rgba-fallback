const rollup = require('rollup')
const buble = require('rollup-plugin-buble')

let cache

rollup.rollup({
  entry: 'lib/index.js',
  cache: cache,
  plugins: [
    buble()
  ]
}).then(bundle => {
  // cache bundle
  cache = bundle
  bundle.write({
    format: 'umd',
    moduleName: 'postcss-bgc-rgba-fallback',
    dest: 'dist/bundle.js'
  })
})
