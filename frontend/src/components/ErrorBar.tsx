import { ExclamationCircleIcon, XIcon } from '@heroicons/react/outline'
import React from 'react'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { actions } from 'state/retroSlice'
import IconButton from './IconButton'

export default function ErrorBar(): JSX.Element {
  const errors = useAppSelector((state) => state.errors)
  const dispatch = useAppDispatch()

  if (errors.length === 0) {
    return <></>
  }

  return (
    <div className="flex m-3 mb-0 p-3 rounded border-2 text-red-400 border-red-400 justify-between items-center gap-3">
      <div className="flex gap-2 items-center">
        <div>
          <ExclamationCircleIcon className="h-6 w-6" />
        </div>
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </div>
      <IconButton
        isError
        title="Clear errors"
        icon={<XIcon />}
        onClick={() => dispatch(actions.clearErrors())}
      />
    </div>
  )
}
