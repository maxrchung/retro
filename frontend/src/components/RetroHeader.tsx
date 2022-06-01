import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../state/hooks'
import IconButton from 'components/IconButton'
import {
  BackspaceIcon,
  CheckIcon,
  DuplicateIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/outline'
import {
  useClearRetro,
  useCloneRetro,
  useRemoveRetro,
  useUpdateRetroName
} from 'graphql/client'
import { useRouter } from 'next/router'
import { isKeyEnterOnly } from 'utils'
import classNames from 'classnames'
import TextArea from './TextArea'

export default function Retro(): JSX.Element {
  const router = useRouter()
  const { id } = router.query
  const retroId = id as string

  const [removeRetro, { data: dataRemove }] = useRemoveRetro({ retroId })
  const [updateRetroName] = useUpdateRetroName()
  const [clearRetro] = useClearRetro({ retroId })
  const [cloneRetro, { data: dataClone }] = useCloneRetro({ retroId })

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

  useEffect(() => {
    if (dataClone) {
      router.push(`/${dataClone.cloneRetro}`)
    }
  }, [dataClone])

  return (
    <div
      className="flex items-center gap-3 w-full md:w-1/2 "
      onMouseOver={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
    >
      {isEditing ? (
        <TextArea
          autoFocus
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
        <h1
          className="font-bold text-xl cursor-text"
          onClick={() => setIsEditing(true)}
        >
          {editName}
        </h1>
      )}

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
          title={isEditing ? 'Confirm retro name' : 'Edit retro name'}
        />

        <IconButton
          icon={<DuplicateIcon />}
          onClick={() => cloneRetro()}
          title="Copy retro"
        />

        <IconButton
          icon={<BackspaceIcon />}
          onClick={() =>
            confirm(
              'Are you sure you want to clear this retro? All posts in the retro will be deleted.'
            ) && clearRetro()
          }
          title="Clear retro"
        />

        <IconButton
          icon={<TrashIcon />}
          onClick={() =>
            confirm(
              'Are you sure you want to delete this retro? All columns and posts in the retro will be deleted.'
            ) && removeRetro()
          }
          title="Delete retro"
        />
      </div>
    </div>
  )
}
