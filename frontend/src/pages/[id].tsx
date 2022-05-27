import React from 'react'
import Retro from 'components/Retro'
import { Provider } from 'react-redux'
import store from 'state/store'

export default function Id(): JSX.Element {
  return (
    <Provider store={store}>
      <Retro />
    </Provider>
  )
}
