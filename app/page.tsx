"use client"

import { useState } from "react"
import { ethers } from "ethers"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"

export default function Home() {
  const [summoning, setSummoning] = useState(false)
  const [revealed, setRevealed] = useState(false)

  const { isConnected } = useAccount()

  const CONTRACT_ADDRESS =
    "0xc8086F2A9fE7d098eEBaD998a2c61476B0C72193"

  const CONTRACT_ABI = [
    {
      inputs: [],
      name: "invoke",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
  ]

  const beginInvocation = async () => {
    try {
      if (!isConnected) {
        alert("Connect wallet first")
        return
      }

      setSummoning(true)
      setRevealed(false)

      const eth = (window as any).ethereum

      const provider = new ethers.BrowserProvider(eth)

      const signer = await provider.getSigner()

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      )

      const tx = await contract.invoke()

      await tx.wait()

      setTimeout(() => {
        setSummoning(false)
        setRevealed(true)
      }, 3000)
    } catch (err) {
      console.error(err)
      setSummoning(false)
    }
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
            ? "SENTINEL #221 has answered your invocation. Rarity: EPIC."
            : "777 dormant entities remain hidden beneath the Ethereum network."}
        </p>

        <div className="flex flex-col items-center gap-4">
          <ConnectButton />

          <button
            onClick={beginInvocation}
            className="px-10 py-4 border border-purple-400 text-purple-300 rounded-2xl text-lg tracking-[0.2em] uppercase hover:bg-purple-500/20 transition-all duration-300"
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

          {summoning && (
            <p className="text-purple-300">
              › TRANSACTION PENDING...
            </p>
          )}

          {revealed && (
            <p className="text-purple-300">
              › ARTIFACT RECOVERED ON-CHAIN
            </p>
          )}
        </div>
      </div>

      <div className="absolute bottom-10 text-xs tracking-[0.3em] text-zinc-600 uppercase">
        Signal Active • Ethereum Mainnet • 777 Remaining
      </div>
    </main>
  )
}