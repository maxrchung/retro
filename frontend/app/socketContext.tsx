// This some wacko stuff https://www.pluralsight.com/guides/using-web-sockets-in-your-reactredux-app

import React, { useEffect, useState } from 'react'
import { useAppDispatch } from 'app/hooks'
import * as Types from 'backend/types'

interface SendRequest {
  (request: Types.Request): void
}

interface ContextProps {
  children: React.ReactNode
}

const SocketContext = React.createContext<SendRequest>(() => undefined)

export { SocketContext }

export default function SocketContextProvider(props: ContextProps): JSX.Element {
  // Can't initialize WebSocket here because WebSocket is client only
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:3010')
    newSocket.onmessage = (message: MessageEvent<string>) =>
      handleResponse(message)
    setSocket(newSocket)
  }, [])

  const handleResponse = (message: MessageEvent<string>): void => {
    const response = JSON.parse(message.data)
    console.log(`received: ${response}`)
    dispatch(response)
  }

  const sendRequest = (request: Types.Request): void => {
    if (socket != null) {
      socket.send(JSON.stringify(request))
    }
  }

  return (
    <SocketContext.Provider value={sendRequest}>
        {props.children}
    </SocketContext.Provider>
  )
}