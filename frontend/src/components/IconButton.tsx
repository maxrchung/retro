import React from 'react'

interface IconButtonProps {
  icon?: JSX.Element
  onClick?: React.MouseEventHandler
  label?: string
  title: string
}

export default function IconButton({
  icon,
  onClick,
  label,
  title
}: IconButtonProps): JSX.Element {
  return (
    <button
      // Ok https://github.com/tailwindlabs/tailwindcss/issues/1231
      className="whitespace-nowrap flex flex-row p-1 bg-white rounded border-2 focus:outline-none border-blue-500 text-blue-500 focus:border-blue-300 focus:text-blue-300 hover:border-blue-300 hover:text-blue-300"
      onClick={onClick}
      title={title}
    >
      {icon && <span className="h-6 w-6">{icon}</span>} {label}
    </button>
  )
}
