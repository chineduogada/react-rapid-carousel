import React from 'react'
import { ThemeProvider as ThemeProviderFormStyled } from 'styled-components'

const ThemeProvider = ({ children, theme }) => (
  <ThemeProviderFormStyled theme={theme}>{children}</ThemeProviderFormStyled>
)

export default ThemeProvider

