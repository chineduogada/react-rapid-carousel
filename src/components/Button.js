import React from 'react'
import styled from '@emotion/styled'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

function Button({ isPrev, onClick, ...restProps }) {
  return (
    <Styled>
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
    border: 2px solid #333;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    transition: 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &:focus {
      outline: none;
    }

    &:hover {
      cursor: pointer;
    }

    &--prev {
      &:focus,
      &:hover {
        transform: translateX(2.5%);
        box-shadow: 0.5px 0.25px 2px #222;
      }
    }

    &--next {
      &:focus,
      &:hover {
        transform: translateX(-2.5%);
        box-shadow: -0.5px 0.25px 2px #222;
      }
    }
  }
`

export default Button

