import React, { forwardRef } from 'react'

const Slide = forwardRef(
  ({ data: { translateX, transition, slide }, style, ...restProps }, ref) => {
    return (
      <article
        ref={ref}
        {...restProps}
        className='slide'
        data-testid='slide'
        style={{
          transform: `translateX(${translateX}%)`,
          transition: transition,
          ...style
        }}
      >
        {slide}
      </article>
    )
  }
)

export default Slide

