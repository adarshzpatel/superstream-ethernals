import { AppProps } from 'next/app'
import '../styles/globals.css'
import {Provider as WagmiProvider} from "wagmi";
import {providers} from "ethers";
import Layout from '../components/Layout';

const provider = providers.getDefaultProvider(
  "https://rpc-mumbai.maticvigil.com"
);

function MyApp({ Component, pageProps }:AppProps) {
  return (
    <WagmiProvider autoConnect provider={provider}>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </WagmiProvider>
  )
}

export default MyApp
