import React from 'react'

function Button({ children, ...restProps }) {
  return (
    <button
      style={{
        padding: 10,
        margin: 5,
        fontSize: 18,
        border: '2px solid',
        background: 'none',
        cursor: 'pointer'
      }}
      {...restProps}
    >
      {children}
    </button>
  )
}

export default Button

