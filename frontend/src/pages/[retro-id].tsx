import { useAppDispatch } from '../state/hooks'
import React from 'react'
import Retro from 'components/Retro'
import { actions } from 'state/retroSlice'
import { useRetroUpdated } from 'graphql/client'

export default function Home(): JSX.Element {
  const { loading, error, data } = useRetroUpdated({
    retroId: 'test-id'
  })

  // const { loading, error, data } = useGetRetro({
  //   id: 'test-id'
  // })

  if (loading) {
    return <>Loading...</>
  }

  if (error) {
    return <>{`Failed to load retro: ${error.message}`}</>
  }

  if (!data) {
    return <>Failed to load retro</>
  }

  const dispatch = useAppDispatch()
  dispatch(actions.setRetro(data.retroUpdated))

  return <Retro />
}
