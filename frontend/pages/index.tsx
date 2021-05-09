import Head from 'next/head';
import React from 'react';

export default function Home(): JSX.Element {
  return (
    <div className="container">
      <Head>
        <title>Retro</title>
        <meta name="description" content="A retro tool made with some cool stuff" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <button className="border-2 border-black p-2">
        + Column
      </button>
    </div>
  )
}
