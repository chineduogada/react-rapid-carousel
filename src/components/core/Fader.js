import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import createRange from '../../utils/createRange'
import Button from '../Button'
import Dots from '../Dots'
import Slide from '../Slide'
import Styled from '../Styled'

function Fader({ children: slides, autoSlide, dots, buttons, transition }) {
  slides = slides && !slides.length ? [slides] : slides

  if (!slides) {
    return null
  }

  // // States
  const [currentSlideData, setCurrentSlideData] = useState({
    slide: slides[0],
    index: 0
  })
  const [startAutoSlide, setStartAutoSlide] = useState(true)
  const slideRef = useRef()
  // // end of States

  // // VARIABLES
  const { length: slidesLength } = slides

  const dotsList = createRange(slidesLength)

  const maxSlideIndex = slidesLength - 1
  // const maxNextClicks = dotsList.length - 1

  const hasReachMin = currentSlideData.index === 0
  const hasReachMax = maxSlideIndex === currentSlideData.index
  // // end of VARIABLES

  // // HANDLERS
  const handleDotClick = (dot) => {
    const slideData = { ...currentSlideData }
    slideData.index = dot
    slideData.slide = slides[slideData.index]

    setCurrentSlideData(slideData)
  }

  const handleFadeToNext = useCallback(() => {
    const slideData = { ...currentSlideData }
    slideData.index += 1

    if (hasReachMax) {
      slideData.index = 0
    }

    slideData.slide = slides[slideData.index]

    setCurrentSlideData(slideData)
  }, [currentSlideData, hasReachMax, slides])

  const handleFadeToPrev = () => {
    const slideData = { ...currentSlideData }
    slideData.index -= 1

    if (hasReachMin) {
      slideData.index = maxSlideIndex
    }

    slideData.slide = slides[slideData.index]

    setCurrentSlideData(slideData)
  }

  const handleMouseLeaveFade = () => {
    setStartAutoSlide(true)
  }

  const handleMouseHoverFade = () => {
    setStartAutoSlide(false)
  }
  // end of HANDLERS

  // SIDE EFFECTS
  useEffect(() => {
    const { current: Slide } = slideRef

    const timeoutId = setTimeout(() => {
      Slide.style = `
        opacity: 1;
        transition: ${transition};
        `
    }, 100)

    return () => {
      clearTimeout(timeoutId)

      Slide.style = `
        opacity: 0;
        `
    }
  }, [currentSlideData])

  useEffect(() => {
    if (autoSlide && startAutoSlide) {
      const intervalId = setInterval(() => {
        handleFadeToNext()
      }, autoSlide.interval || 5000)

      return () => {
        clearInterval(intervalId)
      }
    }
  }, [handleFadeToNext, autoSlide, startAutoSlide])

  useEffect(() => {
    const { current: Slide } = slideRef

    const allFocusingElements = Slide.querySelectorAll(
      'a, button, input, textarea, area'
    )

    allFocusingElements.forEach((element) => {
      if (element) {
        element.addEventListener('focus', handleMouseHoverFade)
        element.addEventListener('blur', handleMouseLeaveFade)
      }
    })
  }, [currentSlideData])
  // end of SIDE EFFECTS

  // Component Props
  const componentProps = {
    Styled: {
      flexBasis: '100%'
    },
    Dots: {
      data: { dots: dotsList, currentDot: currentSlideData.index },
      onClick: handleDotClick
    },
    Buttons: [
      { isPrev: true, onClick: handleFadeToPrev },
      { isPrev: false, onClick: handleFadeToNext }
    ],
    Slide: {
      data: { slide: currentSlideData.slide }
    }
  }

  return (
    <Styled
      {...componentProps.Styled}
      onMouseOver={
        autoSlide && autoSlide.pauseOnHover ? handleMouseHoverFade : null
      }
      onMouseLeave={
        autoSlide && autoSlide.pauseOnHover ? handleMouseLeaveFade : null
      }
    >
      {buttons && <Button {...componentProps.Buttons[0]} />}

      <main className='content'>
        <div className='center'>
          <Slide
            ref={slideRef}
            style={{ opacity: 0 }}
            {...componentProps.Slide}
          />
        </div>

        {dots && <Dots {...componentProps.Dots} />}
      </main>

      {buttons && <Button {...componentProps.Buttons[1]} />}
    </Styled>
  )
}

Fader.defaultProps = {
  buttons: true,
  dots: true,
  transition: '0.5s ease-in'
}

Fader.propTypes = {
  dots: PropTypes.bool,
  buttons: PropTypes.bool,
  transition: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired,
  autoSlide: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      pauseOnHover: PropTypes.bool,
      interval: PropTypes.number
    })
  ])
}

export default Fader

