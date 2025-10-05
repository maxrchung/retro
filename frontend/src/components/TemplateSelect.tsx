import classNames from 'classnames'
import ChevronIcon from 'icons/ChevronIcon'
import React, { useState } from 'react'

export const TemplateSelect = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative group">
      <select
        name="template"
        className="appearance-none py-1 pl-3 pr-9 rounded bg-white border-2 outline-none border-blue-500 focus:border-blue-300 hover:border-blue-300"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setIsOpen(false)}
        title="Select template"
      >
        <option>Went well, To improve, Action items</option>
        <option>Start, Stop, Continue</option>
        <option>Highlights, Lowlights, Kudos</option>
        <option>Yay, Nay</option>
        <option>Who, What, When, Where, Why</option>
        <option>😊, 🥳, 😎, 😡, 😢, 😨</option>
        <option>Empty</option>
      </select>

      <div
        className={classNames(
          'absolute right-2 top-1.5 pointer-events-none text-blue-500 group-hover:text-blue-300 group-focus-within:text-blue-300',
          { 'rotate-180': isOpen }
        )}
      >
        <ChevronIcon />
      </div>
    </div>
  )
}
