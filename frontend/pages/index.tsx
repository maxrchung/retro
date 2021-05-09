import Head from 'next/head';
import React, { useRef, useEffect } from 'react';

export default function Home(): JSX.Element {
  const socket = useRef(null);

  useEffect(() => {
    socket.current = new WebSocket("ws://localhost:3010");
    socket.current.onmessage = message => {
      console.log(message.data);
    };
  }, []);

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
