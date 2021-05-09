import { AppProps } from 'next/app';
import React from 'react';
import 'tailwindcss/tailwind.css';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />
}