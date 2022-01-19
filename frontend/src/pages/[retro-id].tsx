import { useAppDispatch } from '../state/hooks'
import React, { useEffect } from 'react'
import Retro from 'components/Retro'
import { actions } from 'state/retroSlice'
import { useGetRetro, useRetroUpdated } from 'graphql/client'

export default function Home(): JSX.Element {
  const { loading, error, data } = useRetroUpdated({
    id: 'test-id'
  })

  console.log(loading)
  console.log(error)
  console.log(data)

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
