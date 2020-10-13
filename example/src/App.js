import React from 'react'

import { Slider, Fader } from 'react-rapid-carousel'

const heroes = [
  <div key={4}>
    4 :yes <a href='./'>anchor</a>
  </div>,
  <div key={5}>
    5 :joy <button>Button</button>
  </div>,
  <div key={6}>
    6ix <input type='text' defaultValue='input' />
  </div>
]

const App = () => (
  <div>
    <Slider>{heroes.map((hero) => hero)}</Slider>

    <Fader>{heroes.map((hero) => hero)}</Fader>
  </div>
)

export default App

