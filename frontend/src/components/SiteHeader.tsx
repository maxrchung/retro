import React from 'react'
import Link from 'next/link'
import GitHubIcon from 'icons/GitHubIcon'
import IconButton from 'components/IconButton'
import TwitterIcon from 'icons/TwitterIcon'
import RetroIcon from 'icons/RetroIcon'
import { useAppDispatch } from 'state/hooks'
import { actions } from 'state/retroSlice'

export default function SiteHeader(): JSX.Element {
  const dispatch = useAppDispatch()

  return (
    <nav className="flex justify-between items-center p-3 bg-gray-100">
      <Link href="/">
        <IconButton
          icon={<RetroIcon />}
          label="retro"
          title="Home"
          onClick={() => dispatch(actions.resetState())}
        />
      </Link>
      <div className="flex justify-between gap-2 align-items-center">
        <a href="https://github.com/maxrchung/retro">
          <IconButton icon={<GitHubIcon />} title="GitHub" />
        </a>
        <a href="https://twitter.com/maxrchung">
          <IconButton icon={<TwitterIcon />} title="Twitter" />
        </a>
      </div>
    </nav>
  )
}
