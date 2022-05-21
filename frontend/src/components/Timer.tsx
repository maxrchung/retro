import { BanIcon, ClockIcon, PlusIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import { useUpdateTimer } from 'graphql/client'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from 'state/hooks'
import IconButton from './IconButton'

const getTimer = (timer: Date, curr: Date): string => {
  if (timer <= curr) {
    return '00:00'
  }

  const duration = new Date(timer.getTime() - curr.getTime())

  // Display 2 minimum integer digits https://stackoverflow.com/a/31466357

  const seconds = duration
    .getSeconds()
    .toLocaleString(undefined, { minimumIntegerDigits: 2, useGrouping: false })

  // I don't know about this one chief
  const removeSeconds = duration.getTime() - duration.getSeconds()
  const minutes = Math.trunc(removeSeconds / (1000 * 60)).toLocaleString(
    undefined,
    {
      minimumIntegerDigits: 2,
      useGrouping: false
    }
  )

  return minutes + ':' + seconds
}

export default function Timer(): JSX.Element {
  const { timerEnd, id } = useAppSelector((state) => state.retro)
  const timer = new Date(timerEnd)
  const [updateTimer] = useUpdateTimer()

  const [isOver, setIsOver] = useState(false)

  // https://stackoverflow.com/a/59861536
  const [curr, setCurr] = useState(new Date())
  useEffect(() => {
    // 100 milliseconds to prevent skips
    const interval = setInterval(() => setCurr(new Date()), 100)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const addSeconds = (seconds: number) => () => {
    const timerUpdate = timer <= curr ? new Date(curr) : new Date(timerEnd)
    timerUpdate.setUTCSeconds(timerUpdate.getUTCSeconds() + seconds)
    updateTimer({
      variables: {
        retroId: id,
        timerEnd: timerUpdate.toISOString()
      }
    })
  }

  return (
    <div
      className="flex gap-3"
      onMouseOver={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
    >
      <div className="flex items-center gap-2">
        <ClockIcon width={24} /> {getTimer(timer, curr)}
      </div>
      <div className={classNames('flex gap-2', { invisible: !isOver })}>
        <IconButton
          onClick={() => {
            updateTimer({
              variables: {
                retroId: id,
                timerEnd: new Date(0).toISOString()
              }
            })
          }}
          icon={<BanIcon />}
        />

        <IconButton
          onClick={addSeconds(600)}
          icon={<PlusIcon />}
          label="10 min"
        />
        <IconButton
          onClick={addSeconds(300)}
          icon={<PlusIcon />}
          label="5 min"
        />
        <IconButton
          onClick={addSeconds(60)}
          icon={<PlusIcon />}
          label="1 min"
        />
      </div>
    </div>
  )
}
