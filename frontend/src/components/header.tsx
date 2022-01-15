import React from 'react'

interface HeaderProps {
  children: React.ReactNode
}

export default function Header(props: HeaderProps): JSX.Element {
  return (
    <div className="flex flex-col justify-center h-20">{props.children}</div>
  )
}
