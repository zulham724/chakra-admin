import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import React from 'react'
import theme from 'theme/theme'

import 'styles/Fonts.css'
import 'styles/App.css'
import 'styles/Contact.css'

 import {
   QueryClient,
   QueryClientProvider,
 } from 'react-query'

import 'react-calendar/dist/Calendar.css'
import 'styles/MiniCalendar.css'
import Head from 'next/head'

import Lottie from 'lottie-react'

 // Create a client
 const queryClient = new QueryClient()

// ** services
import api from 'services/api'

// ** React Imports
import { useSession } from "next-auth/react"

// ** Next Auth
import { SessionProvider } from "next-auth/react"

// ** Next Router
import Router,{ useRouter } from 'next/router'

const App = props => {
  const { Component, pageProps: { session, ...pageProps } } = props

  const router = useRouter()

  const getLayout = Component.getLayout ?? (page => {
    // return console.log(router)
    if (router.pathname === "/pages/login") {
      return page
    }

    return (
      <Auth>
        {page}
      </Auth>
    )
  })

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Head>
          <title>Horizon UI Dashboard</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta name='theme-color' content='#000000' />
        </Head>
        <SessionProvider
          session={session}
        >
          <React.StrictMode>
            {/* <Component {...pageProps} /> */}
            {getLayout(<Component {...pageProps} />)}
          </React.StrictMode>
        </SessionProvider>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { data: session, status } = useSession({ required: true })

  if (status === "loading") {
    return <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <Lottie
        animationData={require('assets/lottie/loading.json')}
        loop
        autoPlay
        style={{
          width: 200,
          height: 200
        }}
      />
    </div>
    // return <Loading />
  }

  if (status === "unauthenticated") {
    // Router.push('/pages/login')
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

export default App
