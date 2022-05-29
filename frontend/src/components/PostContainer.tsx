import classNames from 'classnames'
import React, { useState } from 'react'

interface PostContainerProps {
  content: JSX.Element
  buttons: JSX.Element
  isDragging: boolean
}

export default function PostContainer({
  content,
  buttons,
  isDragging
}: PostContainerProps): JSX.Element {
  const [showButtons, setShowButtons] = useState(false)

  return (
    <div
      className="relative"
      onMouseOver={() => setShowButtons(true)}
      onMouseOut={() => setShowButtons(false)}
    >
      <div
        className={classNames(
          'absolute right-0 flex gap-2 mr-2 -translate-y-6',
          {
            invisible: !showButtons,
            hidden: isDragging
          }
        )}
      >
        {buttons}
      </div>
      <div className="p-3">
        {/* wat https://stackoverflow.com/a/40612184/13183186 */}
        {content}
      </div>
    </div>
  )
}
