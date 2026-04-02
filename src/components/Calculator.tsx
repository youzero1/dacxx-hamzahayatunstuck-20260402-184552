'use client'

import { useState, useCallback } from 'react'
import Display from './Display'
import Button from './Button'

type ButtonType = 'number' | 'operator' | 'equals' | 'clear' | 'special'

interface ButtonConfig {
  label: string
  value: string
  type: ButtonType
  span?: number
}

const buttons: ButtonConfig[][] = [
  [
    { label: 'AC', value: 'AC', type: 'clear' },
    { label: '+/-', value: '+/-', type: 'special' },
    { label: '%', value: '%', type: 'special' },
    { label: '÷', value: '/', type: 'operator' },
  ],
  [
    { label: '7', value: '7', type: 'number' },
    { label: '8', value: '8', type: 'number' },
    { label: '9', value: '9', type: 'number' },
    { label: '×', value: '*', type: 'operator' },
  ],
  [
    { label: '4', value: '4', type: 'number' },
    { label: '5', value: '5', type: 'number' },
    { label: '6', value: '6', type: 'number' },
    { label: '-', value: '-', type: 'operator' },
  ],
  [
    { label: '1', value: '1', type: 'number' },
    { label: '2', value: '2', type: 'number' },
    { label: '3', value: '3', type: 'number' },
    { label: '+', value: '+', type: 'operator' },
  ],
  [
    { label: '0', value: '0', type: 'number', span: 2 },
    { label: '.', value: '.', type: 'number' },
    { label: '=', value: '=', type: 'equals' },
  ],
]

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [expression, setExpression] = useState('')
  const [prevValue, setPrevValue] = useState<string | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [history, setHistory] = useState<string[]>([])

  const calculate = useCallback(
    (a: string, op: string, b: string): string => {
      const numA = parseFloat(a)
      const numB = parseFloat(b)
      let result: number

      switch (op) {
        case '+':
          result = numA + numB
          break
        case '-':
          result = numA - numB
          break
        case '*':
          result = numA * numB
          break
        case '/':
          if (numB === 0) return 'Error'
          result = numA / numB
          break
        default:
          return b
      }

      const resultStr = parseFloat(result.toFixed(10)).toString()
      return resultStr
    },
    []
  )

  const handleNumber = useCallback(
    (value: string) => {
      if (waitingForOperand) {
        setDisplay(value)
        setWaitingForOperand(false)
      } else {
        if (value === '.' && display.includes('.')) return
        setDisplay(display === '0' && value !== '.' ? value : display + value)
      }
    },
    [display, waitingForOperand]
  )

  const handleOperator = useCallback(
    (value: string) => {
      if (operator && !waitingForOperand) {
        const result = calculate(prevValue!, operator, display)
        setDisplay(result)
        setPrevValue(result)
        setExpression(`${result} ${getOperatorSymbol(value)}`)
      } else {
        setPrevValue(display)
        setExpression(`${display} ${getOperatorSymbol(value)}`)
      }
      setOperator(value)
      setWaitingForOperand(true)
    },
    [display, operator, prevValue, waitingForOperand, calculate]
  )

  const getOperatorSymbol = (op: string): string => {
    const symbols: Record<string, string> = {
      '+': '+',
      '-': '-',
      '*': '×',
      '/': '÷',
    }
    return symbols[op] || op
  }

  const handleEquals = useCallback(() => {
    if (!operator || !prevValue) return

    const result = calculate(prevValue, operator, display)
    const historyEntry = `${prevValue} ${getOperatorSymbol(operator)} ${display} = ${result}`
    setHistory((prev) => [historyEntry, ...prev.slice(0, 4)])
    setExpression(`${prevValue} ${getOperatorSymbol(operator)} ${display} =`)
    setDisplay(result)
    setPrevValue(null)
    setOperator(null)
    setWaitingForOperand(true)
  }, [display, operator, prevValue, calculate])

  const handleClear = useCallback(() => {
    setDisplay('0')
    setExpression('')
    setPrevValue(null)
    setOperator(null)
    setWaitingForOperand(false)
  }, [])

  const handleSpecial = useCallback(
    (value: string) => {
      if (value === '+/-') {
        setDisplay((parseFloat(display) * -1).toString())
      } else if (value === '%') {
        setDisplay((parseFloat(display) / 100).toString())
      }
    },
    [display]
  )

  const handleButtonClick = useCallback(
    (value: string, type: ButtonType) => {
      switch (type) {
        case 'number':
          handleNumber(value)
          break
        case 'operator':
          handleOperator(value)
          break
        case 'equals':
          handleEquals()
          break
        case 'clear':
          handleClear()
          break
        case 'special':
          handleSpecial(value)
          break
      }
    },
    [handleNumber, handleOperator, handleEquals, handleClear, handleSpecial]
  )

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start justify-center p-4">
      <div className="bg-gray-800 rounded-3xl shadow-2xl overflow-hidden w-80 border border-gray-700">
        {/* Display */}
        <Display display={display} expression={expression} />

        {/* Buttons */}
        <div className="p-4 grid grid-cols-4 gap-3">
          {buttons.map((row, rowIndex) =>
            row.map((btn, colIndex) => (
              <Button
                key={`${rowIndex}-${colIndex}`}
                label={btn.label}
                value={btn.value}
                type={btn.type}
                span={btn.span}
                onClick={() => handleButtonClick(btn.value, btn.type)}
                isActive={operator === btn.value && waitingForOperand}
              />
            ))
          )}
        </div>
      </div>

      {/* History Panel */}
      {history.length > 0 && (
        <div className="bg-gray-800 rounded-3xl shadow-2xl overflow-hidden w-80 border border-gray-700 p-4">
          <h2 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-3">
            History
          </h2>
          <ul className="space-y-2">
            {history.map((entry, index) => (
              <li
                key={index}
                className="text-white text-sm bg-gray-700 rounded-xl px-4 py-2 font-mono"
              >
                {entry}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setHistory([])}
            className="mt-3 w-full text-xs text-gray-400 hover:text-red-400 transition-colors"
          >
            Clear History
          </button>
        </div>
      )}
    </div>
  )
}
