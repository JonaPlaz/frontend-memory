import { createPublicClient, http } from 'viem'
import { localhost } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: localhost,
  transport: http(process.env.RPC),
})