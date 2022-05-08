import React from 'react'
import Retro from 'components/Retro'
import { DndProvider } from 'react-dnd'
import { Provider } from 'react-redux'
import { HTML5Backend } from 'react-dnd-html5-backend'
import store from 'state/store'

export default function Id(): JSX.Element {
  return (
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <Retro />
      </Provider>
    </DndProvider>
  )
}
