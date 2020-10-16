import React, { useEffect, useState } from 'react'
import { Slider } from 'react-rapid-carousel'
import Box from '../components/Box'
import Card from '../components/Card'

function SliderDemo() {
  const [heroes, setHeroes] = useState([])

  useEffect(() => {
    setTimeout(() => {
      setHeroes([
        { id: 1, title: 'hi' },
        { id: 1, title: 'hello' },
        { id: 1, title: 'welcome' },
        { id: 1, title: 'goodbye' }
      ])
    }, 1000)
  }, [])

  return (
    <div style={{ padding: 10 }}>
      <h2 style={{ paddingBottom: 20 }}>Slider</h2>

      <Box heading='QuickSlide'>
        <Box isSmall heading='Enabled'>
          <Slider slidesToShow={2} quickSlide>
            {heroes.map((hero) => (
              <Card data={hero} key={hero.id} />
            ))}
          </Slider>
        </Box>

        <Box isSmall heading='Disabled'>
          <Slider slidesToShow={2} transition='linear 1s'>
            {heroes.map((hero) => (
              <Card data={hero} key={hero.id} />
            ))}
          </Slider>
        </Box>
      </Box>

      <Box heading='Breakpoints'>
        <Slider
          breakpoints={[
            { width: '543', slidesToShow: 1 },
            { width: 600, slidesToShow: 2 },
            { width: 900, slidesToShow: '4' }
          ]}
        >
          {heroes.map((hero) => (
            <Card data={hero} key={hero.id} />
          ))}
        </Slider>
      </Box>

      <Box heading='AutoSlide'>
        <Box isSmall heading='with custom Interval'>
          <Slider autoSlide={{ interval: 6500 }} buttons={false} dots>
            {heroes.map((hero) => (
              <Card data={hero} key={hero.id} />
            ))}
          </Slider>
        </Box>

        <Box isSmall heading='with PauseOnHover and PauseOnTab disabled'>
          <Slider autoSlide={{ pauseOnHover: false, pauseOnTab: false }}>
            {heroes.map((hero) => (
              <Card data={hero} key={hero.id} />
            ))}
          </Slider>
        </Box>

        <Box isSmall heading='with Reverse enabled'>
          <Slider autoSlide={{ reverse: true }}>
            {heroes.map((hero) => (
              <Card data={hero} key={hero.id} />
            ))}
          </Slider>
        </Box>
      </Box>
    </div>
  )
}

export default SliderDemo

