import Column from 'components/Column'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import IconButton from 'components/IconButton'
import { PlusSmIcon } from '@heroicons/react/outline'
import ColumnHeader from 'components/ColumnHeader'
import {
  useCreateColumn,
  useGetRetro,
  useColumnsUpdated,
  useNameUpdated,
  useTimerUpdated
} from 'graphql/client'
import { useRouter } from 'next/router'
import { actions } from 'state/retroSlice'
import Timer from './Timer'
import InputContainer from './InputContainer'
import RetroHeader from './RetroHeader'
import TextArea from './TextArea'
import { isKeyEnterOnly } from 'utils'

export default function Retro(): JSX.Element {
  const router = useRouter()
  const { id } = router.query
  const retroId = id as string

  const dispatch = useAppDispatch()
  // No point to fetch if retroId is not set
  const { error, data: dataGet } = useGetRetro({ retroId }, !retroId)
  const { data: dataColumns } = useColumnsUpdated({ retroId }, !retroId)
  const { data: dataName } = useNameUpdated({ retroId }, !retroId)
  const { data: dataTimer } = useTimerUpdated({ retroId }, !retroId)

  const [columnName, setColumnName] = useState('')
  const { name, columns } = useAppSelector((state) => state.retro)
  const [createColumn] = useCreateColumn({
    retroId,
    columnName
  })

  useEffect(() => {
    if (dataGet) {
      dispatch(actions.updateRetro(dataGet.getRetro))
    }
  }, [dataGet])

  useEffect(() => {
    if (dataColumns) {
      dispatch(actions.updateColumns(dataColumns.columnsUpdated.columns))
    }
  }, [dataColumns])

  useEffect(() => {
    if (dataName) {
      dispatch(actions.updateName(dataName.nameUpdated.name))
    }
  }, [dataName])

  useEffect(() => {
    if (dataTimer) {
      dispatch(actions.updateTimer(dataTimer.timerUpdated.timerEnd))
    }
  }, [dataTimer])

  const submitCreateColumn = () => {
    if (columnName.length > 0) {
      createColumn()
      setColumnName('')
    }
  }

  if (error) {
    return <>{`Failed to load retro: ${error.message}`}</>
  }

  if (!dataGet) {
    return <></>
  }

  return (
    <div className="flex overflow-hidden flex-auto">
      <Head>
        <title>{name} - retro</title>
        <meta name="description" content="A retrospective tool" />
      </Head>

      <div className="flex flex-col gap-3 overflow-hidden flex-auto">
        <RetroHeader />
        <Timer />

        {/* Wacky padding margin hacks to handle overflow-auto button clipping and left-most column indicator */}
        <div className="overflow-auto px-1 py-4 -mt-4">
          <div className="flex">
            {columns.map((column, index) => (
              <Column key={column.id} column={column} index={index} />
            ))}

            {/* flex is needed for proper column width */}
            <div className="flex">
              <div className="flex flex-col w-80 mx-1">
                <div className="bg-gray-100 rounded mx-1 p-3">
                  <ColumnHeader>
                    <InputContainer
                      content={
                        <div className="flex">
                          <TextArea
                            onKeyDown={(e) => {
                              if (isKeyEnterOnly(e)) {
                                submitCreateColumn()
                                e.preventDefault()
                              }
                            }}
                            onChange={(e) => setColumnName(e.target.value)}
                            value={columnName}
                            placeholder="Column"
                          />
                        </div>
                      }
                      button={
                        <IconButton
                          icon={<PlusSmIcon />}
                          onClick={() => submitCreateColumn()}
                        />
                      }
                    />
                  </ColumnHeader>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
