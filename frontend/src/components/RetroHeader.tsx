import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../state/hooks'
import IconButton from 'components/IconButton'
import { CheckIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline'
import { useRemoveRetro, useUpdateRetroName } from 'graphql/client'
import { useRouter } from 'next/router'
import { isKeyEnterOnly } from 'utils'
import classNames from 'classnames'

export default function Retro(): JSX.Element {
  const router = useRouter()
  const { id } = router.query
  const retroId = id as string

  const [removeRetro, { data: dataRemove }] = useRemoveRetro({ retroId })
  const [updateRetroName] = useUpdateRetroName()

  const { name } = useAppSelector((state) => state.retro)
  const [isEditing, setIsEditing] = useState(false)
  const [isOver, setIsOver] = useState(false)
  const [editName, setEditName] = useState(name)

  useEffect(() => setEditName(name), [name])

  useEffect(() => {
    if (dataRemove) {
      router.push('/')
    }
  }, [dataRemove])

  return (
    <div
      className="flex items-center gap-3"
      onMouseOver={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
    >
      <h1 className="font-bold text-xl">
        {isEditing ? (
          <input
            autoFocus
            className="-ml-3 p-2 flex-1 rounded border-2 border-blue-500 focus:outline-none focus:border-blue-300 hover:border-blue-300"
            onKeyDown={(e) => {
              if (isKeyEnterOnly(e)) {
                setIsEditing(false)
                updateRetroName({
                  variables: {
                    retroId,
                    retroName: editName
                  }
                })
              } else if (e.key === 'Escape') {
                setIsEditing(false)
                setEditName(name)
              }
            }}
            onChange={(e) => setEditName(e.target.value)}
            value={editName}
          />
        ) : (
          <span className="cursor-text" onClick={() => setIsEditing(true)}>
            {editName}
          </span>
        )}
      </h1>

      <div
        className={classNames('flex gap-2', {
          invisible: !isOver
        })}
      >
        <IconButton
          icon={isEditing ? <CheckIcon /> : <PencilIcon />}
          onClick={() => {
            isEditing
              ? updateRetroName({
                  variables: {
                    retroId,
                    retroName: editName
                  }
                })
              : setEditName(name)
            setIsEditing(!isEditing)
          }}
          title={isEditing ? 'Edit retro name' : 'Confirm retro name'}
        />

        <IconButton
          icon={<TrashIcon />}
          onClick={() =>
            confirm('Are you sure you want to delete this retro?') &&
            removeRetro()
          }
          title="Delete retro"
        />
      </div>
    </div>
  )
}
