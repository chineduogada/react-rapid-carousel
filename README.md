# react-rapid-carousel

> A simple but epic React Responsive Carousel.

[![NPM](https://img.shields.io/npm/v/react-rapid-carousel.svg)](https://www.npmjs.com/package/react-rapid-carousel) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-rapid-carousel
```

## USAGE

#### clone and test our github repo `https://github.com/chineduogada/react-rapid-carousel`, and cd `./example/src/Demos` for more examples

```jsx
import React, { useState } from 'react'

import { Slider, Fader } from 'react-rapid-carousel'
import 'react-rapid-carousel/dist/index.css'
import Card from 'card' // this Component are `children` of the `Slider`. For the best visual results, don't add `width` style property on it or `width: auto` is still okay.

const App = () => {
  const [products, setHeroes] = useState([])
  useEffect(() => {
    setTimeout(() => {
      setHeroes([
        { id: 1, title: 'car' },
        { id: 1, title: 'bike' },
        { id: 1, title: 'phone' },
        { id: 1, title: 'laptop' }
      ])
    }, 1000)
  }, [])

  return (
    <div>
      <Slider>
        {products.map((hero) => (
          <Card data={hero} key={hero.id} />
        ))}
      </Slider>
      
      <Slider
        // the `length` is endless :)
        breakpoints={[
          // define any width you want to break, but from from small to large widths
          { width: 391, slidesToShow: 1 },
          { width: 592, slidesToShow: 2 },
          { width: 830, slidesToShow: 3 },
          { width: 920, slidesToShow: 4 }
        ]}
      >
        {products.map((hero) => (
          <Card data={hero} key={hero.id} style={{ width: 'auto' }} />

          // Bad `width` style prop :(, Don't do it! Allow the Component do it for you, or use `breakpoints`
      for responsive desire
          // <Card  style={{ width: '200px' }} data={hero} key={hero.id} />
        ))}
      </Slider>
      // Best for rendering static content (Synchronous rendering)
      <Fader>
        <div>hi</div>
        <div>hello</div>
        <div>welcome</div>
        <div>goodbye</div>
      </Fader>
    </div>
  )
}
```

## API

### Components

#### Slider

| Prop         |                                                                Type/Default                                                                | Description                                                                                                                                                                                    |
| ------------ | :----------------------------------------------------------------------------------------------------------------------------------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| quickSlide   |                                                              boolean/`false`                                                               | Works with `autoSlide` and depends on `slidesToShow`: basically moves in sections: which makes much faster                                                                                     |
| dots         |                                                              boolean/`false`                                                               | Depends on `slidesToShow`: display dots below the Component for moving the slides to a particular section                                                                                      |
| buttons      |                                                               boolean/`true`                                                               | Display caret button: (`next` and `prev` buttons) for moving the slide back and forth                                                                                                          |
| slidesToShow |                                                                 number/`1`                                                                 | The amount of `slides` to display at a time                                                                                                                                                    |
| transition   |                                                          string/`"0.5s ease-in"`                                                           | Css transition property                                                                                                                                                                        |
| children     |                                         Array&#60;HTMLElement&#62; &#124;&#124; HTMLElement/`null`                                         | These are the total amount `slides` to be eventually displayed: all slides, For the best visual results, don't add `width` style property on it or `width: auto` is still okay                 |
| breakpoints  |                                        Array&#60;{width: number: slidesToShow: number}&#62;/`null`                                         | For responsive experience: `width`s should be arranged in an ascending manner/order to get the desired result                                                                                  |
| autoSlide    | boolean/`false` &#124;&#124; {reverse: boolean/`false`, pauseOnHover: boolean/`true`, pauseOnTab: boolean/`true`, interval: number/`3800`} | Adds animation: which happens after every interval which can be paused when the user `hovers` on the Slider or `tabs` on any focusable element and move in a reverse mode, if specified though |

#### Fader component

##### Fader can only render one `slide` at a time: perfect for `heroes`, `banners`, `ads` etc.... has lesser functionalities (but slower in performance, and should be used for static content for best performance).

| Prop       |                                                   Type/Default                                                    | Description                                                                                                                                                                                    |
| ---------- | :---------------------------------------------------------------------------------------------------------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dots       |                                                  boolean/`true`                                                   | Depends on `slidesToShow`: display dots below the Component for moving the slides to a particular section                                                                                      |
| buttons    |                                                  boolean/`false`                                                  | Display caret button: (`next` and `prev` buttons) for moving the slide back and forth                                                                                                          |
| transition |                                              string/`"0.5s ease-in"`                                              | Css transition property                                                                                                                                                                        |
| children   |                            Array&#60;HTMLElement&#62; &#124;&#124; HTMLElement /`null`                            | These are the total amount `slides` to be eventually displayed: all slides, For the best visual results, don't add `width` style property on it or `width: auto` is still okay                 |
| autoSlide  | boolean/`true` &#124;&#124; {pauseOnHover: boolean/`true`, pauseOnTab: boolean/`true`, , interval: number/`3800`} | Adds animation: which happens after every interval which can be paused when the user `hovers` on the Slider or `tabs` on any focusable element and move in a reverse mode, if specified though |

## License

MIT © [chineduogada](https://github.com/chineduogada)
