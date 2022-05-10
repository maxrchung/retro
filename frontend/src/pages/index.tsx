import React from 'react'
import { useCreateRetro } from 'graphql/client'
import { useRouter } from 'next/router'

export default function Home(): JSX.Element {
  const router = useRouter()
  const [createRetro, { loading, data }] = useCreateRetro()

  if (data) {
    router.push(`/${data.createRetro}`)
  }

  return (
    <button onClick={() => createRetro()} disabled={loading}>
      Create retro
    </button>
  )
}
