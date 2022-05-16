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
      className="relative"
      onMouseOver={() => !alwaysShowButtons && setShowButtons(true)}
      onMouseOut={() => !alwaysShowButtons && setShowButtons(false)}
    >
      <div
        className={classNames(
          'absolute right-0 flex gap-x-1 mr-1 -translate-y-5',
          {
            invisible: !alwaysShowButtons && !showButtons
          }
        )}
      >
        {buttons}
      </div>
      <div className="p-4 w-100 right-0 flex justify-between items-center">
        {/* wat https://stackoverflow.com/a/40612184/13183186 */}
        <div className="min-w-0 flex-1">{content}</div>
      </div>
    </div>
  )
}
