import { BanIcon, ClockIcon, PlusIcon } from '@heroicons/react/solid'
import { useUpdateTimer } from 'graphql/client'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from 'state/hooks'

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
  const [updateTimer] = useUpdateTimer()

  const timer = new Date(timerEnd)

  // https://stackoverflow.com/a/59861536
  const [curr, setCurr] = useState(new Date())
  useEffect(() => {
    const interval = setInterval(() => setCurr(new Date()), 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const addSeconds = (seconds: number) => () => {
    const timerUpdate = timer <= curr ? new Date(curr) : new Date(timerEnd)
    timerUpdate.setUTCSeconds(timerUpdate.getUTCSeconds() + seconds)
    console.log(timerUpdate.toISOString())
    updateTimer({
      variables: {
        retroId: id,
        timerEnd: timerUpdate.toISOString()
      }
    })
  }

  return (
    <>
      <div>
        <ClockIcon width={24} /> {getTimer(timer, curr)}
      </div>
      <button onClick={addSeconds(600)}>
        <PlusIcon width={24} /> 10m
      </button>
      <button onClick={addSeconds(60)}>
        <PlusIcon width={24} /> 1m
      </button>
      <button
        onClick={() => {
          updateTimer({
            variables: {
              retroId: id,
              timerEnd: new Date(0).toISOString()
            }
          })
        }}
      >
        <BanIcon width={24} />
      </button>
    </>
  )
}
