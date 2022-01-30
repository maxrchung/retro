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

  const {
    loading,
    error,
    data: dataGet
  } = useGetRetro({
    id: retroId
  })

  const { data: dataUpdate } = useRetroUpdated({
    id: retroId
  })

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

  if (loading) {
    return <>Loading...</>
  }

  if (error) {
    return <>{`Failed to load retro: ${error.message}`}</>
  }

  if (!dataGet) {
    return <>Failed to load retro</>
  }

  return <Retro />
}
