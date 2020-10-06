export const getTranslateXRanges = (dot, slidesToShow) => {
  let currentTranslateXRange, nextTranslateXRange

  if (!dot) {
    currentTranslateXRange = -(dot * 100)
    nextTranslateXRange = -((dot + slidesToShow) * 100)
  } else {
    currentTranslateXRange = -(dot * (slidesToShow * 100))
    nextTranslateXRange = -((dot + 1) * (slidesToShow * 100))
  }

  return {
    currentTranslateXRange,
    nextTranslateXRange
  }
}

export const strippedNum = (n) => Number(`${n}`.replace(/^-/, '')) / 100

