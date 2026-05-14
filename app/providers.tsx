"use client"

import "@rainbow-me/rainbowkit/styles.css"

import {
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit"

import {
  WagmiProvider,
} from "wagmi"

import {
  mainnet,
} from "wagmi/chains"

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"

const config = getDefaultConfig({
  appName: "VEIL//777",
  projectId: "fb6aec98ba1ccca43d88dfdd2074949c",
  chains: [mainnet],
})

const queryClient = new QueryClient()

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}