# PostCSS Bgb Rgba Fallback 

![NPM](https://img.shields.io/npm/v/postcss-bgc-rgba-fallback.svg)
[![Traivs CI](https://travis-ci.org/vagusX/postcss-bgc-rgba-fallback.svg)](https://travis-ci.org/vagusX/postcss-bgc-rgba-fallback)
[![Coverage](https://img.shields.io/codecov/c/github/vagusX/postcss-bgc-rgba-fallback.svg)](https://codecov.io/gh/vagusX/postcss-bgc-rgba-fallback)
[![NPM Downloads](https://img.shields.io/npm/dm/postcss-bgc-rgba-fallback.svg)](https://www.npmjs.com/package/postcss-bgc-rgba-fallback)
[![Greenkeeper badge](https://badges.greenkeeper.io/vagusX/postcss-bgc-rgba-fallback.svg)](https://greenkeeper.io/)

> [PostCSS](https://github.com/postcss/postcss) plugin to polyfill background rgba for IE8

## Detail about polyfill for background rgba in IE8

The origin artile [Cross browser alpha transparent background CSS (rgba)](http://rland.me.uk/cross-browser-alpha-transparent-background-10-2011) is removed now. You can see [this anwser](https://stackoverflow.com/questions/36007521/filter-in-ie8-doesnt-work-fix-rgba-in-ie8) from stackoverflow.

## Installation

```bash
$ npm install postcss-bgc-rgba-fallback
```

## Usage

```js
// dependencies
var fs = require('fs')
var postcss = require('postcss')
var bgcRgbaFallback = require('postcss-bgc-rgba-fallback')

// css to be processed
var css = fs.readFileSync('input.css', 'utf8')

// process css
var output = postcss()
  .use(bgcRgbaFallback())
  .process(css)
  .css
```

```css
.foo {
  background-color: rgba(255,102,0,0.3);
}
```

```css
.foo {
  background-color: rgb(255,102,0);
  background-color: transparent\9;
  background-color: rgba(255,102,0,0.3);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#4cFF6600, endColorstr=#4cFF6600);
  zoom: 1;
}
.foo:nth-child(n) {
  filter: none;
}
```

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
