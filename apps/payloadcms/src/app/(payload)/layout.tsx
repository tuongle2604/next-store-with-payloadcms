/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import '@payloadcms/next/css'
import type { ServerFunctionClient } from 'payload'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import React from 'react'
import { importMap } from './admin/importMap.js'
import './custom.scss'
import QueryClientProvider from '@/providers/QueryClientProvider'

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

function Providers({ children }: { children: React.ReactNode }) {
  'use client'
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    <QueryClientProvider>{children}</QueryClientProvider>
    {/* <QueryClientProvider client={queryClient}>{children}</QueryClientProvider> */}
  </RootLayout>
)

export default Layout
