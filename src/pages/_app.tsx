import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import React from 'react'
import theme from 'theme/theme'

import 'styles/Fonts.css'
import 'styles/App.css'
import 'styles/Contact.css'

import 'react-calendar/dist/Calendar.css'
import 'styles/MiniCalendar.css'
import Head from 'next/head'

// ** services
import api from 'services/api'

// ** React Imports
import { useSession } from "next-auth/react"

// ** Next Auth
import { SessionProvider } from "next-auth/react"

function MyApp ({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Horizon UI Dashboard</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#000000' />
      </Head>
      <React.StrictMode>
        <SessionProvider
          session={session}
          // basePath={'http://localhost:3000'}
        >
          <Auth>
            <Component {...pageProps} />
          </Auth>
        </SessionProvider>
      </React.StrictMode>
    </ChakraProvider>
  )
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { data: session, status } = useSession({ required: true })

  // if (status === "loading") {
  //   return <Loading />
  // }

  if (status === "unauthenticated") {
    return <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >Unauthenticated</div>
  }

  if (status === "authenticated") {
    // console.log('authenticated', session)
    api.defaults.headers.Authorization = `Bearer ${session.accessToken}`
  }


  return children
}

export default MyApp
