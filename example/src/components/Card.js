import React from 'react'

function Card({ data }) {
  return (
    <div
      style={{
        border: '1px solid',
        minHeight: '120px',
        padding: '3px',
        margin: '3px',
        width: 'auto'
      }}
    >
      {data.title} <input type='text' placeholder={data.title} />
    </div>
  )
}

export default Card

