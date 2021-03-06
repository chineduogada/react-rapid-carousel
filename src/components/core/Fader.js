import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import createRange from '../../utils/createRange'
import Button from '../Button'
import Dots from '../Dots'
import Slide from '../Slide'
import Styled from '../Styled'
import useSwipe from '../../hooks/useSwipe'

function Fader({ children: slides, autoSlide, dots, buttons, transition }) {
  // Basic configuration
  slides = slides && !slides.length ? [slides] : slides

  if (!slides) {
    return null
  }
  if (autoSlide) {
    autoSlide = { pauseOnHover: true, pauseOnTab: true, ...autoSlide }
  }
  // end of Basic configuration

  // // States
  const [currentSlideData, setCurrentSlideData] = useState({
    slide: slides[0],
    index: 0
  })
  const [startAutoSlide, setStartAutoSlide] = useState(true)
  const sliderRef = useRef()
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
      if (autoSlide && autoSlide.pauseOnTab) {
        element.addEventListener('focus', handleMouseHoverFade)
        element.addEventListener('blur', handleMouseLeaveFade)
      }
    })
  }, [currentSlideData])

  const [state] = useSwipe(sliderRef.current)

  useEffect(() => {
    // console.log(state)
    if (state.movedLeft) {
      handleFadeToNext()
    }
    if (state.movedRight) {
      handleFadeToPrev()
    }
  }, [state])
  // end of SIDE EFFECTS

  // Component Props
  const componentProps = {
    Styled: {
      flexBasis: '100%',
      fader: 'true'
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
      ref={sliderRef}
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

        {dots && (
          <Dots
            style={{
              transform: 'translateX(-50%)',
              position: 'absolute',
              bottom: '8px',
              left: '50%',
              zIndex: '10'
            }}
            {...componentProps.Dots}
          />
        )}
      </main>

      {buttons && <Button {...componentProps.Buttons[1]} />}
    </Styled>
  )
}

Fader.defaultProps = {
  buttons: false,
  dots: true,
  transition: '0.5s ease-in',
  autoSlide: {
    interval: 3800
  }
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

