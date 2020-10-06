import React from 'react'

import { Slider } from 'react-rapid-carousel'

const useSlider = ({
  slides = [],
  patchConfig,
  config = {
    // quickSlide: true,
    slidesToShow: 1,
    breakpoints: [
      { width: 500, slidesToShow: 1 },
      { width: 768, slidesToShow: 3 },
      { width: 900, slidesToShow: 4 },
      { width: 1440, slidesToShow: 5 }
    ],

    autoSlide: {
      reverse: true,
      interval: 3000,
      pauseOnHover: true
    }
  }
}) => {
  const sliderConfig = {
    ...config,
    ...patchConfig
  }

  const renderSlider = (props) => (
    <Slider {...sliderConfig}>
      {slides.map((slide, index) => (
        <div key={index} {...props}>
          {slide}
        </div>
      ))}
    </Slider>
  )

  return renderSlider
}

export default useSlider

