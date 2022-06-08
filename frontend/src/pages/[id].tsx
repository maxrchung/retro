import Head from 'next/head'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import {
  useGetRetro,
  useColumnsUpdated,
  useRetroRemoved,
  useOptionsUpdated
} from 'graphql/client'
import { useRouter } from 'next/router'
import { actions } from 'state/retroSlice'
import Retro from 'components/Retro'
import { getCookie } from 'cookies-next'
import { RETRO_CONNECTION_ID } from 'graphql/constants'

export default function Id(): JSX.Element {
  const router = useRouter()
  const { id } = router.query
  const retroId = id as string

  const dispatch = useAppDispatch()
  // No point to fetch if retroId is not set
  const { data: dataGet } = useGetRetro({ retroId }, !retroId)
  const { data: dataColumns } = useColumnsUpdated({ retroId }, !retroId)
  const { data: dataOptions } = useOptionsUpdated({ retroId }, !retroId)
  const { data: dataRemoved } = useRetroRemoved({ retroId }, !retroId)
  const { name } = useAppSelector((state) => state.retro)
  const connectionId = getCookie(RETRO_CONNECTION_ID) ?? ''

  useEffect(() => {
    dispatch(actions.setConnectionId(connectionId.toString()))
  }, [connectionId])

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
    if (dataOptions) {
      dispatch(actions.updateOptions(dataOptions.optionsUpdated))
    }
  }, [dataOptions])

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
    <>
      <Head>
        <title>{name} - retro</title>
        <meta name="description" content="A simple retrospective tool." />
      </Head>

      <Retro />
    </>
  )
}
