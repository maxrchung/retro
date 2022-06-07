import { ExclamationCircleIcon, XIcon } from '@heroicons/react/outline'
import React from 'react'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { actions } from 'state/retroSlice'
import IconButton from './IconButton'

export default function InfoBar(): JSX.Element {
  const info = useAppSelector((state) => state.info)
  const dispatch = useAppDispatch()

  if (info.length === 0) {
    return <></>
  }

  return (
    <div className="flex m-3 mb-0 p-3 rounded border-2 border-gray-100 bg-gray-100 justify-between items-center gap-3">
      <div className="flex gap-2 items-center">
        <div>
          <ExclamationCircleIcon className="h-6 w-6" />
        </div>
        <p>{info}</p>
      </div>
      <IconButton
        title="Clear info"
        icon={<XIcon />}
        onClick={() => dispatch(actions.clearInfo())}
      />
    </div>
  )
}
