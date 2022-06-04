import Head from 'next/head'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import {
  useGetRetro,
  useColumnsUpdated,
  useNameUpdated,
  useTimerUpdated,
  useRetroRemoved
} from 'graphql/client'
import { useRouter } from 'next/router'
import { actions } from 'state/retroSlice'
import Retro from 'components/Retro'
import { getCookie } from 'cookies-next'

export default function Id(): JSX.Element {
  const router = useRouter()
  const { id } = router.query
  const retroId = id as string

  const dispatch = useAppDispatch()
  // No point to fetch if retroId is not set
  const { data: dataGet } = useGetRetro({ retroId }, !retroId)
  const { data: dataColumns } = useColumnsUpdated({ retroId }, !retroId)
  const { data: dataName } = useNameUpdated({ retroId }, !retroId)
  const { data: dataTimer } = useTimerUpdated({ retroId }, !retroId)
  const { data: dataRemoved } = useRetroRemoved({ retroId }, !retroId)

  const { name } = useAppSelector((state) => state.retro)

  const connectionId = getCookie('retro-connection-id') ?? ''
  dispatch(actions.setConnectionId(connectionId.toString()))

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

  useEffect(() => {
    if (dataRemoved) {
      dispatch(actions.setInfo('Retro was deleted'))
      router.push('/')
    }
  }, [dataRemoved])

  if (!dataGet) {
    return <></>
  }

  return (
    <div className="flex overflow-hidden flex-auto flex-col">
      <Head>
        <title>{name} - retro</title>
        <meta name="description" content="A simple retrospective tool." />
      </Head>

      <Retro />
    </div>
  )
}
