import React from 'react'

interface HeaderProps {
  children: JSX.Element
}

export default function Header(props: HeaderProps): JSX.Element {
  return (
    <div className="flex flex-col justify-center h-20">{props.children}</div>
  )
}
