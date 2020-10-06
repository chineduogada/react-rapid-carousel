import React from 'react'

import { Fader } from 'react-rapid-carousel'

const useFader = ({
  slides = [],
  patchConfig,
  config = {
    autoSlide: {
      interval: 5000,
      pauseOnHover: true
    }
  }
}) => {
  const faderConfig = {
    ...config,
    ...patchConfig
  }

  const renderFader = (props) => (
    <Fader {...faderConfig}>
      {slides.map((slide, index) => (
        <div key={index} {...props}>
          {slide}
        </div>
      ))}
    </Fader>
  )

  return renderFader
}

export default useFader

