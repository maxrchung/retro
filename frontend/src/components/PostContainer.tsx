import classNames from 'classnames'
import React, { useState } from 'react'

interface PostContainerProps {
  content: JSX.Element
  buttons: JSX.Element
}

export default function PostContainer({
  content,
  buttons
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
          'absolute right-0 flex gap-x-1 mr-1 -translate-y-5',
          {
            invisible: !showButtons
          }
        )}
      >
        {buttons}
      </div>
      <div className="p-4">
        {/* wat https://stackoverflow.com/a/40612184/13183186 */}
        <div className="flex-1">{content}</div>
      </div>
    </div>
  )
}
