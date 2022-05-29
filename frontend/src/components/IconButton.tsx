import classNames from 'classnames'
import React from 'react'

interface IconButtonProps {
  icon?: JSX.Element
  onClick?: React.MouseEventHandler
  label?: string
  title: string
  isError?: boolean
}

export default function IconButton({
  icon,
  onClick,
  label,
  title,
  isError
}: IconButtonProps): JSX.Element {
  return (
    <button
      // Ok https://github.com/tailwindlabs/tailwindcss/issues/1231
      className={classNames(
        'whitespace-nowrap flex flex-row p-1 bg-white rounded border-2 focus:outline-none',
        {
          'border-blue-500 text-blue-500 focus:border-blue-300 focus:text-blue-300 hover:border-blue-300 hover:text-blue-300':
            !isError,
          'border-red-400 text-red-400 focus:border-red-400 focus:text-red-300 hover:border-red-300 hover:text-red-300':
            isError
        }
      )}
      onClick={onClick}
      title={title}
    >
      {icon && <span className="h-6 w-6">{icon}</span>} {label}
    </button>
  )
}
