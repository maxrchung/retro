import { PlusSmIcon } from '@heroicons/react/outline'
import { useCreateColumn } from 'graphql/client'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useAppSelector } from 'state/hooks'
import { isKeyEnterOnly } from 'utils'
import Column from './Column'
import ColumnHeader from './ColumnHeader'
import IconButton from './IconButton'
import InputContainer from './InputContainer'
import RetroHeader from './RetroHeader'
import TextArea from './TextArea'
import Timer from './Timer'

export default function RetroContent(): JSX.Element {
  const router = useRouter()
  const { id } = router.query
  const retroId = id as string
  const [columnName, setColumnName] = useState('')

  const { columns } = useAppSelector((state) => state.retro)
  console.log(columns)

  const [createColumn] = useCreateColumn({
    retroId,
    columnName
  })

  const submitCreateColumn = () => {
    if (columnName.length > 0) {
      createColumn()
      setColumnName('')
    }
  }

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex justify-between gap-3 p-3">
        <RetroHeader />
        <Timer />
      </div>

      {/* Wacky padding margin hacks to handle overflow-auto button clipping and left-most column indicator */}
      <div className="flex overflow-x-auto overflow-y-hidden px-1 pb-3">
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
                        title="Create column"
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
  )
}
