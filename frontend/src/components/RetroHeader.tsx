import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import IconButton from 'components/IconButton'
import {
  BackspaceIcon,
  CheckIcon,
  DocumentDuplicateIcon,
  EyeIcon,
  EyeOffIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/outline'
import {
  useClearRetro,
  useCloneRetro,
  useHidePosts,
  useRemoveRetro,
  useShowPosts,
  useUpdateRetroName
} from 'graphql/client'
import { useRouter } from 'next/router'
import { isKeyEnterOnly } from 'utils'
import classNames from 'classnames'
import TextArea from './TextArea'
import { actions } from 'state/retroSlice'

export default function Retro(): JSX.Element {
  const router = useRouter()
  const { id } = router.query
  const retroId = id as string

  const [removeRetro, { data: dataRemove }] = useRemoveRetro({ retroId })
  const [updateRetroName] = useUpdateRetroName()
  const [clearRetro] = useClearRetro({ retroId })
  const [cloneRetro, { data: dataClone }] = useCloneRetro({ retroId })
  const [showPosts] = useShowPosts({ retroId })
  const [hidePosts] = useHidePosts({ retroId })

  const { name, showPosts: canShowPosts } = useAppSelector(
    (state) => state.retro
  )
  const [isEditing, setIsEditing] = useState(false)
  const [isOver, setIsOver] = useState(false)
  const [editName, setEditName] = useState(name)

  const dispatch = useAppDispatch()

  useEffect(() => setEditName(name), [name])

  useEffect(() => {
    if (dataRemove) {
      dispatch(actions.setInfo('Retro was deleted'))
      router.push('/')
    }
  }, [dataRemove])

  useEffect(() => {
    if (dataClone) {
      dispatch(actions.setInfo('Retro copied to new link'))
      router.push(`/${dataClone.cloneRetro}`)
    }
  }, [dataClone])

  return (
    <div
      className="flex items-center gap-2 w-full md:w-1/2 "
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
        <div className="flex gap-3 items-center">
          <h1
            className="font-bold text-xl cursor-text"
            onClick={() => setIsEditing(true)}
          >
            {editName}
          </h1>
          <IconButton
            icon={canShowPosts ? <EyeIcon /> : <EyeOffIcon />}
            onClick={() => (canShowPosts ? hidePosts() : showPosts())}
            title={canShowPosts ? 'Hide posts' : 'Show posts'}
          />
        </div>
      )}

      <fieldset
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

        {!isEditing && (
          <>
            <IconButton
              icon={<DocumentDuplicateIcon />}
              onClick={() => cloneRetro()}
              title="Clone retro"
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
          </>
        )}
      </fieldset>
    </div>
  )
}
