import React from 'react'
import Link from 'next/link'
import GitHubIcon from 'icons/GitHubIcon'
import IconButton from 'components/IconButton'
import TwitterIcon from 'icons/TwitterIcon'
import RetroIcon from 'icons/RetroIcon'

export default function SiteHeader(): JSX.Element {
  return (
    <nav className="flex justify-between items-center p-3 bg-gray-100">
      <a href="/">
        <IconButton icon={<RetroIcon />} label="retro" title="Home" />
      </a>
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
