import React from 'react'
import { Fader } from 'react-rapid-carousel'
import Box from '../components/Box'
import Card from '../components/Card'

function FaderDemo() {
  const heroes = [
    { id: 1, title: 'hi' },
    { id: 1, title: 'hello' },
    { id: 1, title: 'welcome' },
    { id: 1, title: 'goodbye' }
  ]

  return (
    <div style={{ padding: 10 }}>
      <h2 style={{ paddingBottom: 20 }}>Fader</h2>

      <Box heading='Breakpoints'>
        <Fader
          breakpoints={[
            { width: '320', slidesToShow: 1 },
            { width: 600, slidesToShow: 2 },
            { width: 900, slidesToShow: '4' }
          ]}
          transition='ease-out 2s'
          buttons
        >
          {heroes.map((hero) => (
            <Card data={hero} key={hero.id} />
          ))}
        </Fader>
      </Box>

      <Box heading='AutoSlide'>
        <Box isSmall heading='with custom Interval'>
          <Fader autoSlide={{ interval: 6500 }} dots={false} buttons>
            {heroes.map((hero) => (
              <Card data={hero} key={hero.id} />
            ))}
          </Fader>
        </Box>

        <Box isSmall heading='with PauseOnHover and PauseOnTab disabled'>
          <Fader autoSlide={{ pauseOnHover: false, pauseOnTab: false }}>
            {heroes.map((hero) => (
              <Card data={hero} key={hero.id} />
            ))}
          </Fader>
        </Box>

        <Box isSmall heading='with'>
          <Fader autoSlide={{ reverse: true }}>
            {heroes.map((hero) => (
              <Card data={hero} key={hero.id} />
            ))}
          </Fader>
        </Box>
      </Box>
    </div>
  )
}

export default FaderDemo

