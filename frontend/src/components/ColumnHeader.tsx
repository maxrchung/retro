import classNames from 'classnames'
import React, { useState } from 'react'

interface ColumnHeaderProps {
  content: JSX.Element
  buttons: JSX.Element
}

export default function ColumnHeader({
  content,
  buttons
}: ColumnHeaderProps): JSX.Element {
  const [showButtons, setShowButtons] = useState(false)

  return (
    <div
      className="flex flex-col p-3 pt-1 pb-6"
      onMouseOver={() => setShowButtons(true)}
      onMouseOut={() => setShowButtons(false)}
    >
      <div
        className={classNames('flex justify-end gap-2', {
          invisible: !showButtons
        })}
      >
        {buttons}
      </div>
      <div className="flex items-center">
        {/* wat https://stackoverflow.com/a/40612184/13183186 */}
        {content}
      </div>
    </div>
  )
}
