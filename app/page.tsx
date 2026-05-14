"use client"

import { useState } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { sepolia } from "wagmi/chains"

const CONTRACT_ADDRESS = "0xc8086F2A9fE7d098eEBaD998a2c61476B0C72193"

const CONTRACT_ABI = [
  {
    inputs: [],
    name: "invoke",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const

export default function Home() {
  const [revealed, setRevealed] = useState(false)

  const { isConnected, chainId } = useAccount()

  const {
    writeContract,
    data: hash,
    isPending,
    error,
  } = useWriteContract()

  const {
    isLoading: isConfirming,
    isSuccess,
  } = useWaitForTransactionReceipt({
    hash,
  })

  const beginInvocation = () => {
    if (!isConnected) {
      alert("Connect wallet first")
      return
    }

    if (chainId !== sepolia.id) {
      alert("Switch wallet to Sepolia first")
      return
    }

    setRevealed(false)

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "invoke",
      chainId: sepolia.id,
    })
  }

  const summoning = isPending || isConfirming

  if (isSuccess && !revealed) {
    setTimeout(() => {
      setRevealed(true)
    }, 500)
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-purple-900/20 blur-3xl" />
      <div className="absolute w-[500px] h-[500px] border border-purple-400/20 rounded-full animate-spin" />
      <div className="absolute w-[320px] h-[320px] border border-purple-300/20 rounded-full animate-pulse" />

      <div className="relative z-10 text-center">
        <div className="mb-8 text-7xl text-purple-300 animate-pulse">
          {revealed ? "◆" : "◈"}
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-[0.2em] text-purple-300 mb-6 drop-shadow-[0_0_25px_rgba(168,85,247,0.9)]">
          VEIL//777
        </h1>

        <p className="text-zinc-400 tracking-[0.3em] uppercase text-sm mb-4">
          Ethereum Invocation Protocol
        </p>

        <h2 className="text-2xl md:text-5xl font-bold mb-6">
          {summoning
            ? "SIGNAL DETECTED..."
            : revealed
            ? "ARTIFACT RECOVERED"
            : "THE VEIL IS OPEN"}
        </h2>

        <p className="max-w-xl text-zinc-500 mb-10 leading-relaxed">
          {summoning
            ? "Submitting invocation transaction to Ethereum..."
            : revealed
            ? "Your VEIL//777 artifact has been minted on Sepolia."
            : "777 dormant entities remain hidden beneath the Ethereum network."}
        </p>

        <div className="flex flex-col items-center gap-4">
          <ConnectButton />

          <button
            onClick={beginInvocation}
            disabled={summoning}
            className="px-10 py-4 border border-purple-400 text-purple-300 rounded-2xl text-lg tracking-[0.2em] uppercase hover:bg-purple-500/20 transition-all duration-300 disabled:opacity-50"
          >
            {summoning
              ? "Invoking..."
              : revealed
              ? "Invoke Again"
              : "Begin Invocation"}
          </button>
        </div>

        <div className="mt-12 space-y-3 text-left font-mono text-xs text-zinc-400 max-w-xl mx-auto">
          <p>› Contract Connected</p>
          <p>› Sepolia Network Active</p>

          {hash && (
            <p className="text-purple-300 break-all">
              › TX: {hash}
            </p>
          )}

          {error && (
            <p className="text-red-400">
              › ERROR: {error.message}
            </p>
          )}

          {summoning && (
            <p className="text-purple-300">
              › TRANSACTION PENDING...
            </p>
          )}

          {revealed && (
            <p className="text-purple-300">
              › NFT MINTED ON-CHAIN
            </p>
          )}
        </div>
      </div>                                                                                                                                                                             <div className="absolute bottom-10 text-xs tracking-[0.3em] text-zinc-600 uppercase">
        Signal Active • Ethereum Sepolia • 777 Remaining
      </div>
    </main>
  )
}                                                                                                                                                                                                           