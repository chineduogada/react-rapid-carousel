import React from 'react'
import styled from 'styled-components'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import Tooltip from 'react-tooltip'

function Button({ isPrev, onClick, ...restProps }) {
  const content = isPrev ? 'slide backwards' : 'slide forward'

  return (
    <Styled isPrev={isPrev}>
      <button
        {...restProps}
        className={`btn ${isPrev ? 'btn--prev' : 'btn--next'}`}
        role='caret-button'
        aria-label={isPrev ? 'prev button' : 'next button'}
        onClick={onClick}
        data-tip={content}
        data-for='btn'
      >
        {isPrev ? (
          <FaAngleLeft className='btn-icon' />
        ) : (
          <FaAngleRight className='btn-icon' />
        )}
      </button>
      <Tooltip id='btn' />
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
    opacity: 0.7;
    position: relative;

    &:hover,
    &:focus {
      opacity: 1;
      transform: translate(${({ isPrev }) => isPrev && '-'}5px, -50%) scale(1.1);
      cursor: pointer;
    }

    &-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`

export default Button

