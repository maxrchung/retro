import classNames from 'classnames'
import React, { useState } from 'react'

interface CardProps {
  content: JSX.Element
  buttons: JSX.Element
  alwaysShowButtons?: boolean
}

export default function Card({
  content,
  buttons,
  alwaysShowButtons = false
}: CardProps): JSX.Element {
  const [showButtons, setShowButtons] = useState(alwaysShowButtons)

  return (
    <div
      className={'p-2 min-w-0 flex justify-between items-center'}
      onMouseOver={() => !alwaysShowButtons && setShowButtons(true)}
      onMouseOut={() => !alwaysShowButtons && setShowButtons(false)}
    >
      {/* wat https://stackoverflow.com/a/40612184/13183186 */}
      <div className="p-1 min-w-0 flex-1">{content}</div>
      <div
        className={classNames('p-1 flex flex-col gap-y-2', {
          invisible: !alwaysShowButtons && !showButtons
        })}
      >
        {buttons}
      </div>
    </div>
  )
}
