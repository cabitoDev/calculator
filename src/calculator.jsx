import React, { useState } from 'react'

export const Calculator = () => {
  const [operation, setOperation] = useState('')
  const [actualNumber, setActualNumber] = useState('0')
  const [finishedOperation, setFinishedOperation] = useState(false)

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
    let result
    let lastFinished = false
    const actualNum = actualNumber
    let op = operation
    if (finishedOperation) {
      lastFinished = true
      setFinishedOperation(false)
      op = ''
    }
    if (ev) {
      if (ev.target.id === 'clear') {
        setOperation('')
        setActualNumber('0')
        return
      }
      if (
        ev.target.id === 'divide' ||
        ev.target.id === 'multiply' ||
        ev.target.id === 'subtract' ||
        ev.target.id === 'add'
      ) {
        setActualNumber(prev => {
          const lastOps = op.slice(-2)[0]
          if (
            lastOps === '/' ||
            lastOps === '*' ||
            lastOps === '+' ||
            lastOps === '-'
          ) {
            setOperation(op.slice(0, -2) + buttons[ev.target.id])
            return buttons[ev.target.id]
          }
          if (prev === '/' || prev === '*' || prev === '+') {
            if (buttons[ev.target.id] === '-') {
              setOperation(op + buttons[ev.target.id])
              return buttons[ev.target.id]
            }
            setOperation(op.slice(0, -1) + buttons[ev.target.id])
            return buttons[ev.target.id]
          } else if (!isNaN(actualNum)) {
            setOperation(op + actualNum + buttons[ev.target.id])
            return buttons[ev.target.id]
          } else {
            setOperation(op.slice(0, -1) + buttons[ev.target.id])
            return buttons[ev.target.id]
          }
        })
        return
      }
      if (ev.target.id === 'equals') {
        /* eslint-disable no-eval */
        result = eval(op + actualNum)
        setOperation(op + actualNum + '=' + result)
        setActualNumber(result)

        setFinishedOperation(true)
        return
      }
      if (ev.target.id === 'zero') {
        if (lastFinished) {
          setOperation('')
          setActualNumber(buttons[ev.target.id])
          return
        }
        if (!actualNum.toString().startsWith('0') || actualNum.includes('.')) {
          setActualNumber(actualNum + '0')
        }
        return
      }
      if (ev.target.id === 'decimal') {
        setActualNumber(actualNum.includes('.') ? actualNum : actualNum + '.')
        return
      }
      if (op === '') setOperation('')
      if (lastFinished) {
        setOperation('')
        setActualNumber(buttons[ev.target.id])
        return
      }
      if (isNaN(parseInt(actualNum))) {
        setActualNumber(buttons[ev.target.id])
      } else {
        setActualNumber(
          actualNum !== '0'
            ? actualNum + buttons[ev.target.id]
            : buttons[ev.target.id]
        )
      }
    }
  }
  return (
    <>
      <div id='operation'>{operation}</div>
      <div id='display'>{actualNumber}</div>
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
