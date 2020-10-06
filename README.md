# react-rapid-carousel

> A simple but epic React Responsive Carousel.

[![NPM](https://img.shields.io/npm/v/react-rapid-carousel.svg)](https://www.npmjs.com/package/react-rapid-carousel) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-rapid-carousel
```

## Usage

### with hooks

```jsx
import React, { useState } from 'react'

// Comes with great props `configurations` and `Components.defaultProps`
import { useSlider, useFader } from 'react-rapid-carousel'

import 'react-rapid-carousel/dist/index.css'

// the contents for each `slide` don't necessarily needs to have same length. All you should care is the "height" or "minHeight" css properties in order to give a specific UI resemblance.
const heroes = [
  <div>1</div>,
  <div>2</div>,
  <div>3</div>,
  <div>
    <p>4 lorem.</p>
    <img src="./">
  </div>,
  <div>5</div>,
  <div>6ix</div>
]

const App = () => {
  const renderSlider = useSlider({
    slides: heroes,
    // is {...spread} below the main `config` obj: (only changes what is specified) !
    patchConfig: {
      breakpoints: [
        { width: '414', slidesToShow: 1 },
        { width: 768, slidesToShow: '3' }
      ],
      autoSlide: {
        reverse: true,
        interval: 2000,
        pauseOnHover: true
      }
    }
    // `config` overrides the entire one: (with the new one and defaultProps from the Component) !!!
    // config: {
    //   quickSlide: true
    // }
  })

  const renderFader = useFader({
    slides: heroes,
    patchConfig: {
      dots: false
    }
  })

  return (
    <div>
      {renderSlider({
        // all props will be passed to each slide
        style: {
          borderRadius: 3,
          minHeight: 300
        },
        onClick: ({ currentTarget }) => {
          console.log('hey', currentTarget)
        }
      })}

      {/*Fader can only render one `slide` at a time: perfect for `heroes`, `headers`, etc... */}
      {renderFader({
        style: {
          minHeight: 300
        },
        onMouseOver: () => {
          console.log('Fader: get off me! :)')
        }
      })}
    </div>
  )
}
```

### with Components

```jsx
import React, { useState } from 'react'

// Comes with only `Components.defaultProps`
import { Slider, Fader } from 'react-rapid-carousel'

import 'react-rapid-carousel/dist/index.css'

const heroes = [
  <div>1</div>,
  <div>2</div>,
  <div>3</div>,
  <div>4</div>,
  <div>5 :)</div>,
  <div>6ix</div>
]

const App = () => (
  <div>
    <Slider buttons={false} autoSlide slidesToShow={4}>
      {heroes.map((hero, index) => (
        <div key={index}>{hero} i'm a Slider</div>
      ))}
    </Slider>

    <Fader autoSlide={{ pauseOnHover: true }}>
      {heroes.map((hero, index) => (
        <div key={index}>{hero} i'm a Fader</div>
      ))}
    </Fader>
  </div>
)
```

## License

MIT © [chineduogada](https://github.com/chineduogada)
