'use client'

type ButtonType = 'number' | 'operator' | 'equals' | 'clear' | 'special'

interface ButtonProps {
  label: string
  value: string
  type: ButtonType
  span?: number
  onClick: () => void
  isActive?: boolean
}

export default function Button({
  label,
  type,
  span,
  onClick,
  isActive,
}: ButtonProps) {
  const getButtonStyles = (): string => {
    const base =
      'flex items-center justify-center rounded-full font-medium text-xl h-16 cursor-pointer select-none transition-all duration-100 active:scale-95 shadow-md'

    switch (type) {
      case 'clear':
      case 'special':
        return `${base} bg-gray-500 hover:bg-gray-400 text-black`
      case 'operator':
        return `${base} ${
          isActive
            ? 'bg-white text-orange-500 hover:bg-gray-100'
            : 'bg-orange-500 hover:bg-orange-400 text-white'
        }`
      case 'equals':
        return `${base} bg-orange-500 hover:bg-orange-400 text-white`
      case 'number':
      default:
        return `${base} bg-gray-600 hover:bg-gray-500 text-white`
    }
  }

  return (
    <button
      onClick={onClick}
      className={`${getButtonStyles()} ${
        span === 2 ? 'col-span-2 justify-start pl-6' : ''
      }`}
    >
      {label}
    </button>
  )
}
