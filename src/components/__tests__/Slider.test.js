import React from 'react'
import { render as rtl, cleanup } from '@testing-library/react'
import Slider from '../core/Slider'

let expectedProps

beforeEach(() => {
  expectedProps = {
    children: [
      <p key={1}>first slide</p>,
      <p key={2}>second slide</p>,
      <p key={3}>third slide</p>,
      <p key={4}>fourth slide</p>,
      <p key={5}>fifth slide</p>
    ],
    dots: true,
    buttons: true
  }
})

afterEach(() => cleanup())

const render = () => rtl(<Slider {...expectedProps} />)

describe('Slider component', () => {
  test('should render `slides` and `dots` correctly', () => {
    const component = render()

    const slides = component.getAllByTestId(/slide/i)
    const dots = component.getAllByRole('dot-button')

    expect(slides.length).toEqual(expectedProps.children.length)
    expect(dots.length).toEqual(expectedProps.children.length)
  })

  describe('when `children.length` is one:(1 slide is passed via `children` prop)', () => {
    test('should render only ONLY 1 `slide` and 1 `dot`', () => {
      expectedProps.children = <p key='first'>first hero</p>
      const component = render()

      const slides = component.getAllByTestId(/slide/i)
      const dots = component.getAllByRole('dot-button')

      expect(slides.length).toEqual(1)
      expect(dots.length).toEqual(1)
    })
  })

  describe('when `children` is NOT passed or is `falsy`', () => {
    test('should render NOTHING', () => {
      expectedProps.children = undefined
      const component = render()

      const slides = component.queryAllByTestId(/slide/i)
      const dotsWrapper = component.queryAllByTestId('dots')
      const caretButtons = component.queryAllByRole(/caret-button/i)

      expect(slides.length).toEqual(0)
      expect(dotsWrapper.length).toEqual(0)
      expect(caretButtons.length).toEqual(0)
    })
  })

  describe('when `slideToShow` prop is three:(3)', () => {
    test('should render two:(2) `dot`', () => {
      expectedProps.slidesToShow = 3
      const component = render()
      const dots = component.queryAllByRole(/dot-button/i)

      expect(dots.length).toEqual(2)
    })
  })

  describe('when `slideToShow` prop is three:(5)', () => {
    test('should render 1 `dot`', () => {
      expectedProps.slidesToShow = 5
      const component = render()
      const dots = component.queryAllByRole(/dot-button/i)

      expect(dots.length).toEqual(1)
    })
  })

  describe('when `dots` and `buttons` props are `truthy`', () => {
    test('should render `slides`, `caret-buttons`:(prev button & next button) and `dots` wrapper', () => {
      const component = render()

      const caretButtons = component.getAllByRole(/caret-button/i)
      const dotsWrapper = component.getAllByTestId(/dots/i)

      expect(caretButtons.length).toEqual(2)
      expect(dotsWrapper.length).toEqual(1)
    })
  })

  describe('when `dots` prop is `falsy`', () => {
    test('should NOT render `dots` wrapper', () => {
      expectedProps.dots = false
      const component = render()

      const dotsWrapper = component.queryAllByTestId(/dots/i)
      expect(dotsWrapper.length).toEqual(0)
    })
  })

  describe('when `buttons` prop is `falsy`', () => {
    test('should NOT render `caret-buttons`: (prev button & next button)', () => {
      expectedProps.buttons = false
      const component = render()

      const caretButtons = component.queryAllByRole(/caret-button/i)

      expect(caretButtons.length).toEqual(0)
    })
  })
})

