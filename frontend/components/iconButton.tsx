// This some wacko stuff https://www.pluralsight.com/guides/using-web-sockets-in-your-reactredux-app

import React from 'react'

interface IconButtonProps {
  children: React.ReactNode,
  onClick: React.MouseEventHandler
}

export default function IconButton(props: IconButtonProps): JSX.Element {
  return (
    <button
      className="h-5 w-5 rounded border-2 border-gray-700 text-gray-700 focus:border-gray-400 focus:text-gray-400 hover:border-gray-400 hover:text-gray-400"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}