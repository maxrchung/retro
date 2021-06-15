import React from 'react'

interface IconButtonProps {
  children: React.ReactNode,
  onClick: React.MouseEventHandler
}

export default function IconButton(props: IconButtonProps): JSX.Element {
  return (
    <div className="flex items-center">
      <button
        // Ok https://github.com/tailwindlabs/tailwindcss/issues/1231
        className="h-5 w-5 bg-white rounded border-2 focus:outline-none border-pink-400 text-pink-400 focus:border-pink-300 focus:text-pink-300 hover:border-pink-300 hover:text-pink-300"
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </div>
    
  )
}