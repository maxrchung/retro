import Head from 'next/head'
import React, { useRef, useEffect } from 'react'
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux'
import { getAllColumns } from '../app/retroSlice'  

export default function Home(): JSX.Element {
  const dispatch = useDispatch()
  const socket = useRef(null)
  const columns = useSelector((state: RootStateOrAny) => state.retro.columns)
  console.log("Hi, I received columns: " + columns)

  useEffect(() => {
    socket.current = new WebSocket("ws://localhost:3010")
    socket.current.onmessage = message => {
      dispatch(getAllColumns(message.data))
    }
  }, [])

  return (
    <div className="container">
      <Head>
        <title>Retro</title>
        <meta name="description" content="A retro tool made with some cool stuff" />
      </Head>

      <button className="border-2 border-black p-2">
        + Column
      </button>
    </div>
  )
}
