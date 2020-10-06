# react-rapid-carousel

> A simple but epic React Responsive Carousel.

[![NPM](https://img.shields.io/npm/v/react-rapid-carousel.svg)](https://www.npmjs.com/package/react-rapid-carousel) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-rapid-carousel
```

## USAGEs

### with Components

###### Use Component directly to maximize your needs.

###### Comes with only `Components.defaultProps` benefits.

#### Simple Example

```jsx
import React, { useState } from 'react'

import { Slider, Fader } from 'react-rapid-carousel'
import 'react-rapid-carousel/dist/index.css'

const heroes = [
  <div key={4}>
    4 <img src='./' />
  </div>,
  <div key={5}>5 :joy</div>,
  <div key={6}>6ix</div>
]

const App = () => (
  <div>
    <Slider>{heroes.map((hero) => hero)}</Slider>

    <Fader>{heroes.map((hero) => hero)}</Fader>
  </div>
)
```

#### Complex Example

```jsx
import React, { useState } from 'react'

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

### With hooks

###### Using the provided hooks, you focus more on how to add your custom functionalities and appearance, rather than how to the Components themselves.

###### Comes with great props `configurations` and `Components.defaultProps` benefits.

#### Simple Example

```jsx
import React, { useState } from 'react'

import { useSlider } from 'react-rapid-carousel'
import 'react-rapid-carousel/dist/index.css'

const slides = [<div>1</div>, <div>2</div>, <div>lorem</div>]

const App = () => {
  const renderSlider = useSlider(slides)

  return useSlider()
}
```

#### Complex Example

```jsx
import React, { useState } from 'react'

import { useSlider, useFader } from 'react-rapid-carousel'
import 'react-rapid-carousel/dist/index.css'

// the contents for each `slide` don't necessarily needs to have same length. All you should care is the "height" or "minHeight" css properties in order to give a specific UI resemblance: (as shown below).
const heroes = [
  <div>1</div>,
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
    // specifies an Array<HTMLElement> or one HTMLElement
    slides: heroes,
    // is {...spread} below the main `config` obj: (only changes what is specified)!!!
    patchConfig: {
      // specifies `slidesToShow` for a `media-query`
      breakpoints: [
        { width: '414', slidesToShow: 1 },
        { width: 768, slidesToShow: '3' }
      ],
      // specifies animation: which happens after every 2s and pause onMouseHover in a reverse mode
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
      // specifies not to display `dots`
      dots: false
    }
  })

  return (
    <div>
      {renderSlider({
        // all props will be passed to each `slide`
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
          // specifies shape for each of the slides: (might be very useful)
          minHeight: 300
        },
        onMouseOver: () => {
          console.log('Fader: get off me! :joy')
        }
      })}
    </div>
  )
}
```

## License

MIT © [chineduogada](https://github.com/chineduogada)
