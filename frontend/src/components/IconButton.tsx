import React, { ReactNode } from 'react'

interface IconButtonProps {
  children: ReactNode
  onClick?: React.MouseEventHandler
}

export default function IconButton(props: IconButtonProps): JSX.Element {
  return (
    <div className="flex items-center">
      <button
        // Ok https://github.com/tailwindlabs/tailwindcss/issues/1231
        className="h-5 w-5 bg-white rounded border-2 focus:outline-none border-blue-500 text-blue-500 focus:border-blue-300 focus:text-blue-300 hover:border-blue-300 hover:text-blue-300"
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </div>
  )
}
