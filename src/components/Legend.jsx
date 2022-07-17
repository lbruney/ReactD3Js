import React from 'react'
import BaseUtil from '../handlers/BaseUtil'
import { useEffect } from 'react'

function Legend({ colorScale, labels = {} }) {
  let util

  useEffect(() => {
    util = new BaseUtil()
  }, [])

  if (!colorScale) {
    return <div>Loading ... </div>
  }

  const sqSize = 14
  const yPos = (i) => {
    return i * 20
  }

  const handleFilter = (e, domain, isRemove = false) => {
    util = new BaseUtil()
    const $list = document.querySelectorAll('.js-legendGroup')
    if (isRemove) {
      util.removeAllClass($list, util.css.inactive)
      util.removeAllClass($list, util.css.active)
    } else {
      util.addAllClass($list, util.css.inactive)
      const $el = document.querySelector(`.js-legendGroup--${domain}`)
      util.removeClass($el, util.css.inactive)
      util.addClass($el, util.css.active)
    }
  }

  return colorScale.domain().map((domain, index) => {
    return (
      <g key={`legend--${index}`}>
        <rect
          onMouseOver={(e) => handleFilter(e, domain)}
          onMouseOut={(e) => handleFilter(e, domain, true)}
          x='0'
          y={yPos(index)}
          width={sqSize}
          height={sqSize}
          fill={colorScale(domain)}
        />
        <text x='20' y={yPos(index) + 12}>
          {labels[domain]}
        </text>
      </g>
    )
  })
}

export default Legend
