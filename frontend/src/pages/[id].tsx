import { useAppDispatch } from '../state/hooks'
import React, { useEffect } from 'react'
import Retro from 'components/Retro'
import { actions } from 'state/retroSlice'
import { useGetRetro, useLazyGetRetro, useRetroUpdated } from 'graphql/client'
import { useRouter } from 'next/router'

export default function Home(): JSX.Element {
  const router = useRouter()
  const { id } = router.query
  const retroId = id as string

  const dispatch = useAppDispatch()

  // Because data updates reset the cache, we want to ensure we call the initial
  // GetRetro only once
  // https://stackoverflow.com/a/60801406/13183186
  const [skip, setSkip] = React.useState(false)
  const { loading, error, data: dataGet } = useGetRetro({ retroId }, skip)
  useEffect(() => {
    // check whether data exists
    if (!loading && dataGet) {
      setSkip(true)
    }
  }, [dataGet, loading])

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
