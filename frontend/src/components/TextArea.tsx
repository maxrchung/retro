import React from 'react'
import TextareaAutosize, {
  TextareaAutosizeProps
} from 'react-textarea-autosize'

export default function TextArea(props: TextareaAutosizeProps): JSX.Element {
  return (
    <form className="flex flex-auto">
      <TextareaAutosize
        inputMode="url"
        className="py-1 px-3 flex-1 rounded focus:outline-none border-2 border-blue-500 focus:border-blue-300 hover:border-blue-300 resize-none"
        {...props}
      />
    </form>
  )
}
