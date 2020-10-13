import React from 'react'
// import './styles/Button.css'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

function Button({ isPrev, onClick, ...restProps }) {
  return (
    <button
      {...restProps}
      className={`btn ${isPrev ? 'btn--prev' : 'btn--next'}`}
      role='caret-button'
      aria-label={isPrev ? 'prev button' : 'next button'}
      onClick={onClick}
    >
      {isPrev ? (
        <FaAngleLeft className='btn-icon' />
      ) : (
        <FaAngleRight className='btn-icon' />
      )}
    </button>
  )
}

export default Button

