'use client'

interface DisplayProps {
  display: string
  expression: string
}

export default function Display({ display, expression }: DisplayProps) {
  const getFontSize = (value: string): string => {
    if (value.length > 12) return 'text-2xl'
    if (value.length > 9) return 'text-3xl'
    if (value.length > 6) return 'text-4xl'
    return 'text-5xl'
  }

  return (
    <div className="bg-gray-900 px-6 pt-8 pb-4 text-right">
      <div className="min-h-6 text-gray-400 text-sm font-mono truncate mb-1">
        {expression || '\u00A0'}
      </div>
      <div
        className={`text-white font-light font-mono transition-all duration-150 truncate ${
          getFontSize(display)
        }`}
      >
        {display}
      </div>
    </div>
  )
}
