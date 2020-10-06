import React, { useState } from 'react'

import { useSlider, useFader } from 'react-rapid-carousel'
import 'react-rapid-carousel/dist/index.css'

const heroes = [
  <div>
    <h3>
      <b>1</b>
    </h3>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, ipsam cum!
    Blanditiis voluptates praesentium non recusandae ipsam reiciendis,
    <a href='/1'>
      ipsa cumque optio aliquam ea velit, eos, nihil neque minus soluta
      cupiditate.
    </a>
  </div>,

  <div>
    <h3>
      <b>2</b>
    </h3>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, ipsam cum!
    Blanditiis voluptates praesentium non recusandae ipsam reiciendis,
    <a href='/2'>
      ipsa cumque optio aliquam ea velit, eos, nihil neque minus soluta
      cupiditate.
    </a>
  </div>,

  <div>
    <h3>
      <b>3</b>
    </h3>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, ipsam cum!
    Blanditiis voluptates praesentium non recusandae ipsam reiciendis,
    <a href='/3'>
      ipsa cumque optio aliquam ea velit, eos, nihil neque minus soluta
      cupiditate.
    </a>
  </div>,
  <div>
    <h3>
      <b>4</b>
    </h3>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, ipsam cum!
    Blanditiis voluptates praesentium non recusandae ipsam reiciendis,
    <a href='/4'>
      ipsa cumque optio aliquam ea velit, eos, nihil neque minus soluta
      cupiditate.
    </a>
  </div>,
  <div>
    <h3>
      <b>5</b>
    </h3>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, ipsam cum!
    Blanditiis voluptates praesentium non recusandae ipsam reiciendis,
    <a href='/5'>
      ipsa cumque optio aliquam ea velit, eos, nihil neque minus soluta
      cupiditate.
    </a>
  </div>,
  <div>
    <h3>
      <b>6</b>
    </h3>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, ipsam cum!
    Blanditiis voluptates praesentium non recusandae ipsam reiciendis,
    <a href='/6'>
      ipsa cumque optio aliquam ea velit, eos, nihil neque minus soluta
      cupiditate.
    </a>
  </div>,
  <div>
    <h3>
      <b>7</b>
    </h3>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, ipsam cum!
    Blanditiis voluptates praesentium non recusandae ipsam reiciendis,
    <a href='/7'>
      ipsa cumque optio aliquam ea velit, eos, nihil neque minus soluta
      cupiditate.
    </a>
    <button>h1</button>
  </div>,
  <div>
    <h3>
      <b>8</b>
    </h3>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, ipsam cum!
    Blanditiis voluptates praesentium non recusandae ipsam reiciendis,
    <a href='/8'>
      ipsa cumque optio aliquam ea velit, eos, nihil neque minus soluta
      cupiditate.
    </a>
  </div>,
  <div>
    <h3>
      <b>9</b>
    </h3>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, ipsam cum!
    Blanditiis voluptates praesentium non recusandae ipsam reiciendis,
    <a href='/9'>
      ipsa cumque optio aliquam ea velit, eos, nihil neque minus soluta
      cupiditate.
    </a>
  </div>,
  <div>
    <h3>
      <b>10</b>
    </h3>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, ipsam cum!
    Blanditiis voluptates praesentium non recusandae ipsam reiciendis,
    <a href='/10'>
      ipsa cumque optio aliquam ea velit, eos, nihil neque minus soluta
      cupiditate.
    </a>
  </div>,
  <div>
    <h3>
      <b>11</b>
    </h3>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, ipsam cum!
    Blanditiis voluptates praesentium non recusandae ipsam reiciendis,
    <a href='/11'>
      ipsa cumque optio aliquam ea velit, eos, nihil neque minus soluta
      cupiditate.
    </a>
  </div>,
  <div>
    <h3>
      <b>12</b>
    </h3>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, ipsam cum!
    Blanditiis voluptates praesentium non recusandae ipsam reiciendis,
    <a href='/12'>
      ipsa cumque optio aliquam ea velit, eos, nihil neque minus soluta
      cupiditate.
    </a>
  </div>,
  <div>
    <h3>
      <b>13</b>
    </h3>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, ipsam cum!
    Blanditiis voluptates praesentium non recusandae ipsam reiciendis,
    <a href='/13'>
      ipsa cumque optio aliquam ea velit, eos, nihil neque minus soluta
      cupiditate.
    </a>
  </div>
]

const App = () => {
  const [autoPlay, setAutoPlay] = useState(true)

  const renderSlider = useSlider({
    slides: heroes,
    patchConfig: {
      breakpoints: [
        { width: '414', slidesToShow: 1 },
        { width: 768, slidesToShow: '3' },
        { width: '900', slidesToShow: 5 }
      ],
      autoSlide: autoPlay
        ? {
            reverse: true,
            interval: 2000,
            pauseOnHover: true
          }
        : null
    }
  })

  const renderFader = useFader({
    slides: heroes,
    patchConfig: {
      dots: false
    }
  })

  return (
    <div style={{ padding: 10, marginBottom: 500 }}>
      <button onClick={() => setAutoPlay(true)}>play</button>
      <button onClick={() => setAutoPlay(false)}>pause</button>
      <button onClick={() => setAutoPlay((prevPlay) => !prevPlay)}>
        toggle play
      </button>

      {renderSlider({
        style: {
          boxShadow: '0 0 5px #3332',
          borderRadius: 3,
          margin: 10,
          padding: 10,
          minHeight: 300
        },
        onClick: ({ target }) => {
          console.log('hey', target)
        }
      })}

      {renderSlider({
        style: {
          boxShadow: '0 0 5px #3332',
          borderRadius: 3,
          margin: 10,
          padding: 10,
          minHeight: 300
        },
        onClick: ({ target }) => {
          console.log('hey', target)
        }
      })}

      <br />

      <div
        style={{
          borderBottom: '3px solid coral'
        }}
      >
        {renderFader({
          style: {
            margin: 0,
            padding: 10,
            minHeight: 300
          },
          onClick: ({ target }) => {
            console.log("Fader's slide clicked", target)
          }
        })}
      </div>
    </div>
  )
}

export default App

