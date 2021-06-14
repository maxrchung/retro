// This some wacko stuff https://www.pluralsight.com/guides/using-web-sockets-in-your-reactredux-app

import React from 'react'

interface IconButtonProps {
  children: React.ReactNode,
  onClick: React.MouseEventHandler
}

export default function IconButton(props: IconButtonProps): JSX.Element {
  return (
    <button
      className="h-5 w-5 rounded border border-gray-900 text-gray-900 focus:border-gray-500 focus:text-gray-500 hover:border-gray-500 hover:text-gray-500"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}