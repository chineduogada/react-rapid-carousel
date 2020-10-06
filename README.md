# react-rapid-carousel

> A simple but epic React Responsive Carousel.

[![NPM](https://img.shields.io/npm/v/react-rapid-carousel.svg)](https://www.npmjs.com/package/react-rapid-carousel) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-rapid-carousel
```

## USAGES

### with Components

###### Use Components directly to maximize your needs.

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

###### Using the provided hooks, you focus more on what to add: (custom functionalities and appearance), rather than how to implement the Components themselves.

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
      //
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

## API

### Components

#### Slider

| Prop         |                                    Type                                    | Description                                                                                                                       |
| ------------ | :------------------------------------------------------------------------: | --------------------------------------------------------------------------------------------------------------------------------- |
| quickSlide   |                                  boolean                                   | Works with `autoSlide` and depends on `slidesToShow`: basically moves in sections: which makes much faster                        |
| dots         |                                  boolean                                   | Depends on `slidesToShow`: display dots below the Component for moving the slides to a particular section                         |
| buttons      |                                  boolean                                   | Display caret button: (`next` and `prev` buttons) for moving the slide back and forth                                             |
| slidesToShow |                                   number                                   | The amount of `slides` to display at a time                                                                                       |
| transition   |                                   string                                   | Css transition property                                                                                                           |
| children     |                   Array<HTMLElement> &#124; HTMLElement                    | These are the total amount `slides` to be eventually displayed: all slides                                                        |
| breakpoints  |                Array<{width: number: slidesToShow: number}>                | For responsive experience: `width`s should be arranged in an ascending manner/order to get the desired result                     |
| autoSlide    | boolean &#124; {reverse: boolean, pauseOnHover: boolean, interval: number} | Adds animation: which happens after every interval which can be pauseOnMouseHover and move in a reverse mode, if specified though |

#### Fader component

##### Fader can only render one `slide` at a time: perfect for `heroes`, `headers`, etc.... Is a lighter version

| Prop       |                           Type                           | Description                                                                                               |
| ---------- | :------------------------------------------------------: | --------------------------------------------------------------------------------------------------------- |
| dots       |                         boolean                          | Depends on `slidesToShow`: display dots below the Component for moving the slides to a particular section |
| buttons    |                         boolean                          | Display caret button: (`next` and `prev` buttons) for moving the slide back and forth                     |
| transition |                          string                          | Css transition property                                                                                   |
| children   |          Array<HTMLElement> &#124; HTMLElement           | These are the total amount `slides` to be eventually displayed: all slides                                |
| autoSlide  | boolean &#124; {pauseOnHover: boolean, interval: number} | Adds animation: which happens after every interval and can pauseOnMouseHover, if specified though         |

### Hooks

#### useSlider

| Prop        |                 Type                  | Description                                                                                                                                       |
| ----------- | :-----------------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| slides      | Array<HTMLElement> &#124; HTMLElement | equivalent to `Slider.props.children`                                                                                                             |
| config      |                Object                 | equivalent to `...Slider.props` : all possible props that be passed to `Slider` component                                                         |
| patchConfig |                Object                 | equivalent to `...Slider.props`: but depends on `config` because its appends to it: can override existing props from the `config` or add new ones |

#### useFader

| Prop        |                 Type                  | Description                                                                                                                                      |
| ----------- | :-----------------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| slides      | Array<HTMLElement> &#124; HTMLElement | equivalent to `Fader.props.children`                                                                                                             |
| config      |                Object                 | equivalent to `...Fader.props` : all possible props that be passed to `Fader` component                                                          |
| patchConfig |                Object                 | equivalent to `...Fader.props`: but depends on `config` because its appends to it: can override existing props from the `config` or add new ones |

## License

MIT © [chineduogada](https://github.com/chineduogada)
