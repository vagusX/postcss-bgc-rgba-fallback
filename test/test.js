const fs = require('fs')
const test = require('tape')
const postcss = require('postcss')

const plugin = require('../dist/postcss-bgc-rgba-fallback')

test('polyfill for background rgba', t => {
  compareFixtures(t, 'bgc-rgba', 'should be polyfilled with filter prop')
  t.end()
})

function compareFixtures (t, name, msg, opts = {}, postcssOpts = {}) {
  postcssOpts.from = filename(`fixtures/${name}`)
  const actual = postcss()
  .use(plugin(opts))
  .process(read(postcssOpts.from), postcssOpts).css
  const expected = read(filename(`fixtures/${name}.expected`))
  fs.writeFile(filename(`fixtures/${name}.actual`), actual)
  t.equal(actual, expected, msg)
}

function filename (name) {
  return `test/${name}.css`
}

function read (name) {
  return fs.readFileSync(name, 'utf8')
}
