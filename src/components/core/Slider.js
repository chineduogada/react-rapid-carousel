import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import createRange from '../../utils/createRange'
import Button from '../Button'
import { getTranslateXRanges, strippedNum } from '../../helpers'
import Dots from '../Dots'
import Slide from '../Slide'
import Styled from '../Styled'
import useSwipe from '../../hooks/useSwipe'

function Slider({
  children: slides,
  slidesToShow: propSlidesToShow,
  quickSlide,
  autoSlide,
  breakpoints,
  dots,
  buttons,
  transition,
  swipe = true
}) {
  // Default configuration
  slides = slides && !slides.length ? [slides] : slides

  if (!slides) {
    return null
  }
  if (autoSlide) {
    autoSlide = {
      pauseOnHover: true,
      pauseOnTab: true,
      interval: 3800,
      ...autoSlide
    }
  }
  // end of Basic configuration

  // States
  const [translateX, setTranslateX] = useState(0)
  const [nextClicks, setNextClicks] = useState(0)
  const [slideToPrev, setSlideToPrev] = useState(false)
  const [startAutoSlide, setStartAutoSlide] = useState(true)

  const sliderRef = useRef()
  // end of States

  // VARIABLES
  const { length: slidesLength } = slides

  const [slidesToShow, setSlidesToShow] = useState(propSlidesToShow)

  const hasAllSlidesInContainer = slidesToShow === slidesLength

  const sliderSections = Math.ceil(slidesLength / slidesToShow)
  const dotsList = createRange(sliderSections)

  const maxTranslateX = -100 * (slidesToShow * (dotsList.length - 1))
  const maxNextClicks = dotsList.length - 1

  const hasReachMin = quickSlide ? nextClicks === 0 : translateX === 0
  const hasReachMax = quickSlide
    ? nextClicks === maxNextClicks
    : maxTranslateX === translateX
  // end of VARIABLES

  // HANDLERS
  const handleDotClick = (dot) => {
    const { currentTranslateXRange } = getTranslateXRanges(dot, slidesToShow)

    setNextClicks(dot)
    setTranslateX(currentTranslateXRange)
  }

  const handleSlideToNext = useCallback(() => {
    if (!hasAllSlidesInContainer) {
      if (hasReachMax) {
        setNextClicks(0)
        return setTranslateX(0)
      }

      if (quickSlide) {
        setNextClicks((prevNextClicks) => prevNextClicks + 1)
        return setTranslateX(
          (prevTranslateX) => prevTranslateX - slidesToShow * 100
        )
      }

      setTranslateX((prevTranslateX) => prevTranslateX - 100)
    }
  }, [hasAllSlidesInContainer, hasReachMax, quickSlide, slidesToShow])

  const handleSlideToPrev = useCallback(() => {
    if (!hasAllSlidesInContainer) {
      if (hasReachMin) {
        setNextClicks(maxNextClicks)
        return setTranslateX(maxTranslateX)
      }

      if (quickSlide) {
        setNextClicks((prevNextClicks) => prevNextClicks - 1)
        return setTranslateX(
          (prevTranslateX) => prevTranslateX + slidesToShow * 100
        )
      }

      setTranslateX((prevTranslateX) => prevTranslateX + 100)
    }
  }, [hasAllSlidesInContainer, hasReachMin, quickSlide, slidesToShow])

  const handleMouseLeaveSlide = useCallback(() => {
    setStartAutoSlide(true)
  }, [])

  const handleMouseHoverSlide = useCallback(() => {
    setStartAutoSlide(false)
  }, [])
  // end of HANDLERS

  // SIDE EFFECTS
  useEffect(() => {
    const { current: Slider } = sliderRef

    const allDocSlides = Slider.querySelectorAll('.slide')
    const allSlides = []

    allDocSlides.forEach((slide) => allSlides.push(slide))

    const setTabIndex = (nodeList, tabIndex) => {
      nodeList.forEach((item) => {
        const allFocusingElements = item.querySelectorAll(
          'a, button, input, textarea, area'
        )

        allFocusingElements.forEach((element) => {
          if (autoSlide && autoSlide.pauseOnTab) {
            element.addEventListener('focus', handleMouseHoverSlide)
            element.addEventListener('blur', handleMouseLeaveSlide)
          }

          element.tabIndex = tabIndex
        })
      })
    }

    setTabIndex(allSlides, 0)

    allSlides.splice(strippedNum(translateX), slidesToShow)

    setTabIndex(allSlides, -1)
  }, [
    slides,
    translateX,
    slidesToShow,
    handleMouseHoverSlide,
    handleMouseLeaveSlide
  ])

  useEffect(() => {
    if (autoSlide && startAutoSlide) {
      const hasReachMax = quickSlide
        ? (slidesToShow + strippedNum(translateX)) * -100 === maxTranslateX
        : (slidesToShow + strippedNum(translateX)) * -100 ===
          -((slidesLength - 1) * 100)

      const hasReachMin = quickSlide
        ? translateX === -(slidesToShow * 100) && slideToPrev
        : translateX + 1 * 100 === 0

      const intervalId = setInterval(() => {
        if (autoSlide.reverse) {
          if (hasReachMax) {
            setSlideToPrev(true)
          }
          if (hasReachMin) {
            setSlideToPrev(false)
          }

          if (slideToPrev) {
            handleSlideToPrev()
          } else {
            handleSlideToNext()
          }
        } else {
          handleSlideToNext()
        }
      }, autoSlide.interval)

      return () => {
        clearInterval(intervalId)
      }
    }
  }, [
    handleSlideToNext,
    handleSlideToPrev,
    translateX,
    slidesToShow,
    slideToPrev,
    autoSlide,
    startAutoSlide
  ])

  useEffect(() => {
    if (breakpoints && breakpoints.length) {
      const mappedBreakpoints = breakpoints.map((breakpoint) => ({
        width: Number(breakpoint.width),
        slidesToShow: Number(breakpoint.slidesToShow)
      }))

      mappedBreakpoints.forEach((breakpoint, index, breakpoints) => {
        if (breakpoints[index + 1]) {
          const nextBreakpoint = breakpoints[index + 1]

          if (breakpoint.width > nextBreakpoint.width) {
            console.warn(
              `'props.breakpoints[${index}].width' is higher than 'props.breakpoints[${
                index + 1
              }].width'. It should be the other way around or remove 'props.breakpoints[${index}].width'`
            )
          }
        }
      })

      let mediaQueryMin, mediaQueryMax, handleResize

      mappedBreakpoints.forEach((breakpoint) => {
        mediaQueryMin = window.matchMedia(`(min-width: ${breakpoint.width}px)`)
        mediaQueryMax = window.matchMedia(`(max-width: ${breakpoint.width}px)`)

        handleResize = (e) => {
          if (e.matches) {
            setSlidesToShow(breakpoint.slidesToShow)
          }
        }

        handleResize(mediaQueryMin)

        mediaQueryMin.addEventListener('change', handleResize)
        mediaQueryMax.addEventListener('change', handleResize)
      })

      return () => {
        mediaQueryMin.removeEventListener('change', handleResize)
        mediaQueryMax.removeEventListener('change', handleResize)
      }
    }
  }, [])

  const [state] = useSwipe(sliderRef.current)

  useEffect(() => {
    // console.log(state)
    if (state.movedLeft) {
      handleSlideToNext()
    }
    if (state.movedRight) {
      handleSlideToPrev()
    }
  }, [state])
  // end of SIDE EFFECTS

  // Component Props
  const componentProps = {
    Styled: {
      flexBasis: `${100 / slidesToShow}%`
    },
    Dots: {
      data: { dots: dotsList, slidesToShow, translateX },
      onClick: handleDotClick
    },
    Buttons: [
      { isPrev: true, onClick: handleSlideToPrev },
      { isPrev: false, onClick: handleSlideToNext }
    ],
    Slide: (slide) => ({
      data: { slide, transition, translateX }
    })
  }

  return (
    <Styled
      {...componentProps.Styled}
      ref={sliderRef}
      onMouseOver={
        autoSlide && autoSlide.pauseOnHover ? handleMouseHoverSlide : null
      }
      onMouseLeave={
        autoSlide && autoSlide.pauseOnHover ? handleMouseLeaveSlide : null
      }
    >
      {buttons && <Button {...componentProps.Buttons[0]} />}

      <main className='content'>
        <div className='center'>
          {slides.map((slide, index) => (
            <Slide key={index} {...componentProps.Slide(slide)} />
          ))}
        </div>

        {dots && <Dots {...componentProps.Dots} />}
      </main>

      {buttons && <Button {...componentProps.Buttons[1]} />}
    </Styled>
  )
}

Slider.defaultProps = {
  slidesToShow: 1,
  buttons: true,
  dots: false,
  transition: '0.5s ease-in'
}

Slider.propTypes = {
  quickSlide: PropTypes.bool,
  dots: PropTypes.bool,
  buttons: PropTypes.bool,
  slidesToShow: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  transition: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired,
  breakpoints: PropTypes.arrayOf(
    PropTypes.shape({
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      slidesToShow: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired
    })
  ),
  autoSlide: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      reverse: PropTypes.bool,
      pauseOnHover: PropTypes.bool,
      interval: PropTypes.number
    })
  ])
}

export default Slider

