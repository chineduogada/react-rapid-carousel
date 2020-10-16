import React from 'react'

function Box({ heading, children, isSmall }) {
  const boxStyle = { margin: 20, padding: 10, border: '1px solid #eee' }

  const headingStyle = {
    margin: '-25px 0 10px',
    padding: 7.5,
    backgroundColor: '#f9f9f9',
    width: 'fit-content'
  }

  const renderContent = () => {
    if (isSmall)
      return (
        <div style={boxStyle}>
          <h6 style={headingStyle}>{heading}</h6>
          {children}
        </div>
      )

    return (
      <div style={boxStyle}>
        <h4 style={headingStyle}>{heading}</h4>
        {children}
      </div>
    )
  }

  return renderContent()
}

export default Box

