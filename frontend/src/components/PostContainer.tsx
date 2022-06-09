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
      <fieldset
        className={classNames(
          'absolute right-0 flex gap-2 mr-3 -translate-y-6',
          {
            'md:invisible': !showButtons
          }
        )}
      >
        {buttons}
      </fieldset>
      <div className="px-3 py-4">
        {/* wat https://stackoverflow.com/a/40612184/13183186 */}
        {content}
      </div>
    </div>
  )
}
