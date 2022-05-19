import React from 'react'

interface HeaderProps {
  children: JSX.Element
}

export default function ColumnHeader(props: HeaderProps): JSX.Element {
  return (
    <div className="flex flex-col justify-center min-h-16">
      {props.children}
    </div>
  )
}
