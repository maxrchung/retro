import { ExclamationCircleIcon, XIcon } from '@heroicons/react/outline'
import React from 'react'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { actions } from 'state/retroSlice'
import IconButton from './IconButton'

export default function ErrorBar(): JSX.Element {
  const error = useAppSelector((state) => state.error)
  const dispatch = useAppDispatch()

  if (!error || error.length === 0) {
    return <></>
  }

  return (
    <div className="flex m-3 p-3 rounded border-2 text-red-400 border-red-400 justify-between items-center gap-3">
      <div className="flex gap-2 items-center">
        <div>
          <ExclamationCircleIcon className="h-6 w-6" />
        </div>
        {error}
      </div>
      <IconButton
        isError
        title="Clear error"
        icon={<XIcon />}
        onClick={() => dispatch(actions.clearError())}
      />
    </div>
  )
}
