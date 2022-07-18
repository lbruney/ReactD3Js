import React from 'react'

function Tooltip({ children }) {
  return (
    <div className='c-tooltip js-tooltip'>
      <span className='c-tooltip__close p6 js-btn--close'>x</span>
      {children}
    </div>
  )
}

export default Tooltip
