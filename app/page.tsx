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

    setRevealed(true)

  } catch (err) {
    console.log(err)
    alert("Transaction failed")
  } finally {
    setSummoning(false)
  }
}