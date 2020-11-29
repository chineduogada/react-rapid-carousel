import React, { useState } from 'react'
import { ThemeProvider } from 'react-rapid-carousel'

import Button from './components/Button'
import FaderDemo from './Demos/FaderDemo'
import SliderDemo from './Demos/SliderDemo'

const App = () => {
  const [curr, setCurr] = useState('Fader')

  const renderContent = () => {
    if (curr === 'Slider') return <SliderDemo />
    if (curr === 'Fader')
      return (
        <ThemeProvider
          theme={{
            dots: {
              1: 'gold',
              2: '#2af2'
            },
            carets: {
              1: '#fff',
              2: 'gold'
            }
          }}
        >
          <FaderDemo />
        </ThemeProvider>
      )
  }

  const handleClick = ({
    target: {
      dataset: { id }
    }
  }) => {
    setCurr(id)
  }

  return (
    <div>
      <div
        style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
      >
        <Button onClick={handleClick} data-id='Slider'>
          Slider Demos
        </Button>
        <Button onClick={handleClick} data-id='Fader'>
          Fader Demos
        </Button>
      </div>

      {renderContent()}

      {/* <Slider slidesToShow='2'>
      {heroes.map((hero) => (
        <div key={hero.id}>
          {hero.title} <input type='text' placeholder={hero.title} />
        </div>
      ))}
    </Slider>

    <Fader>
      {heroes.map((hero) => (
        <div key={hero.id}>
          {hero.title} <input type='text' placeholder={hero.title} />
        </div>
      ))}
    </Fader> */}

      {/* <Fader>{heroes.map((hero) => hero)}</Fader> */}
    </div>
  )
}

export default App

