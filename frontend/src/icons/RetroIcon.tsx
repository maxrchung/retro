import React from 'react'

// Thanks, really cool site! https://yqnn.github.io/svg-path-editor/

// Differences from /public/RetroIcon.svg:
// - Stroke color is currentColor, necessary for hover color
// - CamelCase attributes
// - No background rect
export default function RetroIcon(): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        stroke="currentColor"
        d="M 8 3 Q 12 3 12 7 L 12 17 Q 11 21 8 21 m 8 -18 Q 12 3 12 7 M 12 17 Q 12 21 16 21"
      />
    </svg>
  )
}
