import React from 'react'

import { Slider, Fader } from 'react-rapid-carousel'
import 'react-rapid-carousel/dist/index.css'

const heroes = [
  <div key={4}>4 :yes</div>,
  <div key={5}>5 :joy</div>,
  <div key={6}>6ix</div>
]

const App = () => (
  <div>
    <Slider>{heroes.map((hero) => hero)}</Slider>

    <Fader>{heroes.map((hero) => hero)}</Fader>
  </div>
)

export default App

