import Column from 'components/column'
import Head from 'next/head'
import React from 'react'
import { useAppSelector } from 'app/hooks'

export default function Home(): JSX.Element {
  const columns = useAppSelector(state => state.columns)

  return (
    <div className="container">
      <Head>
        <title>Retro</title>
        <meta name="description" content="A retrospective tool made with some cool stuff" />
      </Head>

      <div className="flex w-screen">
        {columns.map(column =>
          <Column
            key={column.id}
            {...column}
          />
        )}

        <div>
          <input className="block border-2 border-black" />
          <button className="border-2 border-black p-2">
            + Column
          </button>
        </div>
      </div>
    </div>
  )
}
