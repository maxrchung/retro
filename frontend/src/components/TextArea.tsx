import React from 'react'
import TextareaAutosize, {
  TextareaAutosizeProps
} from 'react-textarea-autosize'

export default function TextArea(props: TextareaAutosizeProps): JSX.Element {
  return (
    <TextareaAutosize
      className="py-1 px-2 flex-1 rounded focus:outline-none border-2 border-blue-500 focus:border-blue-300 hover:border-blue-300 resize-none"
      {...props}
    />
  )
}
