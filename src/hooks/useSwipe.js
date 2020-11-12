import { useEffect, useReducer } from 'react'

const useSwipe = (container) => {
  // console.log(container)

  const initialState = {
    hold: 0,
    movedLeft: 0,
    movedRight: 0
  }

  const reducer = (state = initialState, action) => {
    switch (action) {
      case 'MOVE_LEFT':
        return {
          movedLeft: 1,
          movedRight: 0
        }

      case 'MOVE_RIGHT':
        return {
          movedRight: 1,
          movedLeft: 0
        }

      default:
        state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, false)
      container.addEventListener('touchmove', handleTouchMove, false)

      let xDown = 0

      function getTouches(evt) {
        return (
          evt.touches || // browser API
          evt.originalEvent.touches
        ) // jQuery
      }

      function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0]
        xDown = firstTouch.clientX
      }

      function handleTouchMove(evt) {
        if (!xDown) {
          return
        }

        let xUp = evt.touches[0].clientX
        let xDiff = xDown - xUp

        if (xDiff > 0) {
          dispatch('MOVE_LEFT')
        } else {
          dispatch('MOVE_RIGHT')
        }

        xDown = 0
      }
    }
  }, [container])

  return [state, dispatch]
}

export default useSwipe

