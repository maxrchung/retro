import React from 'react'

interface InputContentProps {
  content: JSX.Element
  button: JSX.Element
}

export default function InputContainer({
  content,
  button
}: InputContentProps): JSX.Element {
  return (
    <div className={'flex justify-between items-center gap-2'}>
      <div className="flex-1">{content}</div>
      {button}
    </div>
  )
}
