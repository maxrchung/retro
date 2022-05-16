import React, { ReactNode } from 'react'

interface IconButtonProps {
  icon: JSX.Element
  onClick?: React.MouseEventHandler
}

export default function IconButton({
  icon,
  onClick
}: IconButtonProps): JSX.Element {
  return (
    <button
      // Ok https://github.com/tailwindlabs/tailwindcss/issues/1231
      className="flex flex-row w-8 h-8 p-1 bg-white rounded border-2 focus:outline-none border-blue-500 text-blue-500 focus:border-blue-300 focus:text-blue-300 hover:border-blue-300 hover:text-blue-300"
      onClick={onClick}
    >
      {icon}
    </button>
  )
}
