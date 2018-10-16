const fs = require('fs')
const test = require('tape')
const postcss = require('postcss')

const plugin = require('../index')

test('polyfill for background rgba', t => {
  compareFixtures(t, 'bgc', 'should be polyfilled with filter prop')
  t.end()
})

async function compareFixtures (t, name, msg, opts = {}, postcssOpts = {}) {
  postcssOpts.from = filename(`fixtures/${name}`)
  const actual = postcss()
    .use(plugin(opts))
    .process(read(postcssOpts.from), postcssOpts).css

  const expected = read(filename(`fixtures/${name}.expected`))
  const actualFilePath = filename(`fixtures/${name}.actual`)

  ensureExistsSync(actualFilePath)
  fs.writeFile(actualFilePath, actual)
  t.equal(actual, expected, msg)
}

function filename (name) {
  return `test/${name}.css`
}

function read (name) {
  return fs.readFileSync(name, 'utf8')
}

function ensureExistsSync (path) {
  try {
    fs.statSync(path)
  } catch (e) {
    fs.writeFileSync(path, '', 'utf-8')
  }
}
