(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.postcss-bgc-rgba-fallback = factory());
}(this, (function () { 'use strict';

var index = {
  a: 1,
  b: 2,
  C: 3
}

return index;

})));
