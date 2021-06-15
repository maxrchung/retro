import React from 'react'

interface IconButtonProps {
  children: React.ReactNode,
  onClick: React.MouseEventHandler
}

export default function IconButton(props: IconButtonProps): JSX.Element {
  return (
    <div className="flex items-center">
      <button
        className="h-5 w-5 rounded border-2 border-gray-700 text-gray-700 focus:border-gray-400 focus:text-gray-400 hover:border-gray-400 hover:text-gray-400"
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </div>
    
  )
}