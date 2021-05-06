import React from 'react'
import styled from 'styled-components'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

function Button({ isPrev, onClick, ...restProps }) {
  return (
    <Styled isPrev={isPrev}>
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
    </Styled>
  )
}

const Styled = styled.div`
  .btn {
    width: 30px;
    height: 30px;
    border: 2px solid;
    border-radius: 50%;
    font-size: 1.5rem;
    transition: 0.15s;
    opacity: 0.65;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover,
    &:focus {
      opacity: 1;
      cursor: pointer;
    }

    &-icon {
      /* position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%); */
    }
  }
`

export default Button
