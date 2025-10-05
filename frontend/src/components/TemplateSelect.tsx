import classNames from 'classnames'
import ChevronIcon from 'icons/ChevronIcon'
import React from 'react'

export const TemplateSelect = (): JSX.Element => {
  return (
    <div className="relative group">
      <select
        name="template"
        className="appearance-none py-1 pl-3 pr-9 rounded bg-white border-2 outline-none border-blue-500 focus:border-blue-300 hover:border-blue-300"
        title="Select template"
      >
        <option>Went well, To improve, Action items</option>
        <option>Start, Stop, Continue, Kudos</option>
        <option>Liked, Learned, Lacked, Laughed</option>
        <option>Yay, Nay</option>
        <option>Questions, Comments, Concerns</option>
        <option>😊, 🥳, 😎, 😡, 😢, 😨</option>
        <option>Empty</option>
      </select>

      <div
        className={classNames(
          // I would like to rotate chevron on select menu open, but it's too
          // difficult to track with native select. Toggling on click isn't good
          // enough because of keyboard controls like Enter, Space, and Escape.
          // Escape is particularly problematic because select onKeyDown doesn't
          // even get an event when Escape is used to close menu.
          'absolute right-2 top-1.5 pointer-events-none text-blue-500 group-hover:text-blue-300 group-focus-within:text-blue-300'
        )}
      >
        <ChevronIcon />
      </div>
    </div>
  )
}
