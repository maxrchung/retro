import { AppProps } from 'next/app';
import React from 'react';
import 'tailwindcss/tailwind.css';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />
}