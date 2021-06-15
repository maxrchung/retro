import React from 'react'

interface FrameProps {
  content: React.ReactNode
  buttons: React.ReactNode
}

export default function Card(props: FrameProps): JSX.Element {
  return (
    <div className="p-2 min-w-0 flex justify-between items-center">
      {/* wat https://stackoverflow.com/a/40612184/13183186 */}
      <div className="p-1 min-w-0 flex-1">
        {props.content}
      </div>
      <div className="p-1">
        {props.buttons}
      </div>
    </div>
  )
}