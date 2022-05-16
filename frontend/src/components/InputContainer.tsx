import React from 'react'

interface InputContentProps {
  content: JSX.Element
  button: JSX.Element
}

// It seems I needed this at some point, but I removed it without problem? https://stackoverflow.com/a/40612184/13183186

export default function InputContainer({
  content,
  button
}: InputContentProps): JSX.Element {
  return (
    <div className={'p-2 flex justify-between items-center'}>
      <div className="p-1 flex-1">{content}</div>
      <div className="p-1">{button}</div>
    </div>
  )
}
