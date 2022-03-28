import { useAppDispatch } from '../state/hooks'
import React, { useEffect } from 'react'
import Retro from 'components/Retro'
import { actions } from 'state/retroSlice'
import { useGetRetro, useRetroUpdated } from 'graphql/client'
import { useRouter } from 'next/router'

export default function Home(): JSX.Element {
  const router = useRouter()
  const { id } = router.query
  const retroId = id as string

  const dispatch = useAppDispatch()

  const { error, data: dataGet } = useGetRetro({ retroId })

  const { data: dataUpdate } = useRetroUpdated({ retroId })

  useEffect(() => {
    if (dataGet) {
      dispatch(actions.setRetro(dataGet.getRetro))
    }
  }, [dataGet])

  useEffect(() => {
    if (dataUpdate) {
      dispatch(actions.setRetro(dataUpdate.retroUpdated))
    }
  }, [dataUpdate])

  if (error) {
    return <>{`Failed to load retro: ${error.message}`}</>
  }

  return <Retro />
}
