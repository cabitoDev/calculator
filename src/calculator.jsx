import React, { useState } from 'react'

export const Calculator = () => {
  const [operation, setOperation] = useState('')
  const [actualNumber, setActualNumber] = useState(0)
  const buttons = {
    clear: 'AC',
    divide: '/',
    multiply: '*',
    seven: '7',
    eight: '8',
    nine: '9',
    subtract: '-',
    four: '4',
    five: '5',
    six: '6',
    add: '+',
    one: '1',
    two: '2',
    three: '3',
    equals: '=',
    zero: '0',
    decimal: '.'
  }

  const clickButton = ev => {
    if (ev) {
      switch (ev.target.id) {
      }
    }
  }
  return (
    <>
      <div id='display'>{operation}</div>
      <div id='actual'>{actualNumber}</div>
      {Object.keys(buttons).map(key => (
        <button
          id={key}
          key={key}
          onClick={ev => {
            clickButton(ev)
          }}
        >
          {buttons[key]}
        </button>
      ))}
    </>
  )
}
