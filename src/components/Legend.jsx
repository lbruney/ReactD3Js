import React from 'react'

function Legend({ colorScale, labels = {} }) {
  if (!colorScale) {
    return <div>Loading ... </div>
  }

  const sqSize = 16
  const yPos = (i) => {
    return i * 24
  }

  return colorScale.domain().map((domain, index) => {
    return (
      <g key={`legend--${index}`}>
        <rect
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
