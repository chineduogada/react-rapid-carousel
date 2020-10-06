import React from 'react'
import { render as rtl, cleanup, fireEvent } from '@testing-library/react'
import Fader from '../core/Fader'
import { act } from 'react-dom/test-utils'

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

const render = () => rtl(<Fader {...expectedProps} />)

describe('Fade component', () => {
  describe('when rendered initially', () => {
    test('should render `first slide`', () => {
      const component = render()

      expectedProps.children.forEach((_, index, children) => {
        if (index === 0) {
          const content = children[index].props.children
          component.getByText(content)
        } else {
          const content = children[index].props.children
          const restSlides = component.queryAllByText(content)

          expect(restSlides.length).toEqual(0)
        }
      })
    })

    test('should render `children.length`(5) `dots`', () => {
      const component = render()
      const dots = component.getAllByRole('dot-button')

      expect(dots.length).toEqual(expectedProps.children.length)
    })

    test('should render `caret-buttons`:(prev button & next button) and `dots` wrapper', () => {
      const component = render()

      const caretButtons = component.getAllByRole(/caret-button/i)
      const dotsWrapper = component.getAllByTestId(/dots/i)

      expect(caretButtons.length).toEqual(2)
      expect(dotsWrapper.length).toEqual(1)
    })
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

  describe('when a controls are clicked', () => {
    test('should render the corresponding `slide`: when each `dot` is clicked', () => {
      const component = render()

      expectedProps.children.forEach((_, index, children) => {
        const dot = component.getAllByRole(/dot-button/i)[index]
        const content = children[index].props.children

        act(() => {
          fireEvent.click(dot)
        })

        component.getByText(content)
      })
    })

    test('should render the corresponding `slide`: when a `caret-button` is clicked', () => {
      const component = render()
      const prevBtn = component.getAllByRole(/caret-button/i)[0]
      const nextBtn = component.getAllByRole(/caret-button/i)[1]
      const firstDot = component.getAllByRole(/dot-button/i)[0]
      const lastDot = component.getAllByRole(/dot-button/i)[
        expectedProps.children.length - 1
      ]

      component.getByText(/first slide/i)

      act(() => {
        fireEvent.click(prevBtn)
      })
      act(() => {
        fireEvent.click(prevBtn)
      })
      component.getByText(/fourth slide/i)

      act(() => {
        fireEvent.click(lastDot)
      })
      act(() => {
        fireEvent.click(nextBtn)
      })
      component.getByText(/first slide/i)

      act(() => {
        fireEvent.click(firstDot)
      })
      act(() => {
        fireEvent.click(prevBtn)
      })
      component.getByText(/fifth slide/i)
    })
  })
})

