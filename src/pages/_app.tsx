import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react"
import { Layout } from 'components/layout'
import { WagmiConfig } from 'wagmi'
import { client } from 'utils/wagmiclient'

export default function App({ Component, pageProps }: AppProps) {
  return (
      <ChakraProvider>
        <WagmiConfig client={client}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </WagmiConfig>
      </ChakraProvider>
  )
}
