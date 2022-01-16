import Column from 'components/Column'
import Head from 'next/head'
import React, { useContext, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import Card from 'components/Card'
import IconButton from 'components/IconButton'
import { PlusIcon } from '@heroicons/react/outline'
import Header from 'components/Header'
import { useGetRetro } from 'graphql/client'
import Retro from 'components/Retro'
import { actions } from 'state/retroSlice'

export default function Home(): JSX.Element {
  const { loading, error, data } = useGetRetro({
    id: 'test-id'
  })

  if (loading) {
    return <>Loading...</>
  }

  if (error) {
    return <>`Error: ${error.message}`</>
  }

  if (!data) {
    return <>Error, no data</>
  }

  const dispatch = useAppDispatch()
  dispatch(actions.setRetro(data.getRetro))

  return <Retro />
}
