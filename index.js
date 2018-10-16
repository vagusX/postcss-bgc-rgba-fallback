
/**
 * Dependencies
 */
const postcss = require('postcss')
const colorString = require('color-string')

/**
 * Constants
 */

const pluginName = 'postcss-bgc-rgba-fallback'

const rbgIE9 = postcss.decl({
  prop: 'background-color', value: 'transparent\\9'
})

const zoom = postcss.decl({
  prop: 'zoom', value: '1'
})

const filterReset = postcss.decl({
  prop: 'filter', value: 'none'
})

/**
 * PostCSS plugin to polyfill bgc rgba
 */
module.exports = postcss.plugin(pluginName, (options = {}) => root => {
  root.walkRules(rule => {
    rule.walkDecls(decl => {
      if (decl.prop === 'background-color') {
        const color = colorString.get(decl.value)
        const alpha = color.value[3]
        const rgb = color.value.slice(0, 3)
        if (alpha < 1) {
          const bgcRgb = postcss.decl({
            prop: 'background-color', value: `rgb(${rgb})`
          })

          const filterProps = postcss.decl({
            prop: 'filter', value: getFilterValue(rgb, alpha)
          })

          decl.parent.insertBefore(decl, [bgcRgb, rbgIE9])
          decl.parent.insertAfter(decl, [filterProps, zoom])

          const newRule = postcss.rule({
            selector: `${rule.selector}:nth-child(n)`
          })

          newRule.append(filterReset)

          root.insertAfter(decl.parent, newRule)
        }
      }
    })
  })
})

function getFilterValue (rgb, alpha) {
  const hash = Math.floor(alpha * 255).toString(16)
  const hex = colorString.to.hex(rgb).slice(1)
  const gradientColor = `#${hash}${hex}`
  return `progid:DXImageTransform.Microsoft.gradient(startColorstr=${gradientColor}, endColorstr=${gradientColor})`
}
