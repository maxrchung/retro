import { BanIcon, ClockIcon, PlusSmIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import { useUpdateTimer } from 'graphql/client'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from 'state/hooks'
import IconButton from './IconButton'

export enum TimerOrientation {
  RIGHT,
  LEFT
}

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

interface TimerProps {
  orientation: TimerOrientation
}

export default function Timer({ orientation }: TimerProps): JSX.Element {
  const { timerEnd, id } = useAppSelector((state) => state.retro)
  const timer = new Date(timerEnd)
  const [updateTimer] = useUpdateTimer()

  const [isOver, setIsOver] = useState(false)

  // https://stackoverflow.com/a/59861536
  const [curr, setCurr] = useState(new Date())
  useEffect(() => {
    // 100 milliseconds to prevent skips
    const interval = setInterval(() => setCurr(new Date()), 100)
    return () => clearInterval(interval)
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

  return orientation === TimerOrientation.RIGHT ? (
    <div
      className="flex gap-3 flex-auto justify-end"
      onMouseOver={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
    >
      <div
        className={classNames('flex gap-2 items-center', {
          invisible: !isOver
        })}
      >
        <IconButton
          onClick={addSeconds(600)}
          icon={<PlusSmIcon />}
          label="10"
          title="Add 10 minutes"
        />
        <IconButton
          onClick={addSeconds(300)}
          icon={<PlusSmIcon />}
          label="5"
          title="Add 5 minutes"
        />
        <IconButton
          onClick={addSeconds(60)}
          icon={<PlusSmIcon />}
          label="1"
          title="Add 1 minute"
        />
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
          title="Cancel timer"
        />
      </div>
      <div className="flex items-center gap-2">
        <ClockIcon width={24} /> {getTimer(timer, curr)}
      </div>
    </div>
  ) : (
    <div
      className="flex gap-3 w-full"
      onMouseOver={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
    >
      <div className="flex items-center gap-2">
        <ClockIcon width={24} /> {getTimer(timer, curr)}
      </div>
      <div
        className={classNames('flex gap-2 items-center', {
          invisible: !isOver
        })}
      >
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
          title="Cancel timer"
        />
        <IconButton
          onClick={addSeconds(60)}
          icon={<PlusSmIcon />}
          label="1"
          title="Add 1 minute"
        />
        <IconButton
          onClick={addSeconds(300)}
          icon={<PlusSmIcon />}
          label="5"
          title="Add 5 minutes"
        />
        <IconButton
          onClick={addSeconds(600)}
          icon={<PlusSmIcon />}
          label="10"
          title="Add 10 minutes"
        />
      </div>
    </div>
  )
}
