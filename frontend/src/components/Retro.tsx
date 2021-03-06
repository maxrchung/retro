import { PlusSmIcon } from '@heroicons/react/outline'
import { useCreateColumn } from 'graphql/client'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useAppSelector } from 'state/hooks'
import { isKeyEnterOnly } from 'utils'
import Column from './Column'
import IconButton from './IconButton'
import InputContainer from './InputContainer'
import RetroHeader from './RetroHeader'
import TextArea from './TextArea'
import Timer, { TimerOrientation } from './Timer'

export default function Retro(): JSX.Element {
  const router = useRouter()
  const { id } = router.query
  const retroId = id as string
  const [columnName, setColumnName] = useState('')

  const { columns } = useAppSelector((state) => state.retro)

  const [createColumn] = useCreateColumn({
    retroId,
    columnName
  })

  const submitCreateColumn = () => {
    createColumn()
    setColumnName('')
  }

  return (
    <div className="flex flex-col overflow-hidden flex-auto">
      <header className="flex flex-col gap-3 p-3">
        <div className="flex justify-between gap-3">
          <RetroHeader />
          <div className="hidden md:flex md:w-1/2 justify-end">
            <Timer orientation={TimerOrientation.RIGHT} />
          </div>
        </div>

        <div className="md:hidden">
          <Timer orientation={TimerOrientation.LEFT} />
        </div>
      </header>

      <div className="flex overflow-x-auto overflow-y-hidden px-1 pb-3 flex-auto">
        {/* Not exactly sure why we need this but otherwise the rightmost column is shortened */}
        <div className="flex">
          {columns.map((column, index) => (
            <Column key={column.id} column={column} index={index} />
          ))}

          {/* flex is needed for proper column width */}
          <div className="flex flex-col w-80">
            <div className="p-3 mt-6 border-2 border-transparent">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
