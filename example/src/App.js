import React from 'react'

import { Slider, Fader } from 'react-rapid-carousel'

const heroes = [
  <div styles={{ width: '100%' }} key={4}>
    4 <img src='./' />
  </div>,
  <div styles={{ width: '100%' }} key={5}>
    5 :joy
  </div>,
  <div styles={{ width: '100%' }} key={6}>
    6ix
  </div>
]
const App = () => (
  <div>
    <Slider slidesToShow='2'>{heroes.map((hero) => hero)}</Slider>

    <Fader>{heroes.map((hero) => hero)}</Fader>
  </div>
)

export default App

