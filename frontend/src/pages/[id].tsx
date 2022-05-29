import React from 'react'
import Retro from 'components/Retro'
import { Provider } from 'react-redux'
import store from 'state/store'
import ErrorBar from 'components/ErrorBar'

export default function Id(): JSX.Element {
  return (
    <Provider store={store}>
      <ErrorBar />
      <Retro />
    </Provider>
  )
}
