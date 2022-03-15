import { AppProps } from 'next/app'
import '../styles/globals.css'
import {Provider as WagmiProvider} from "wagmi";
import {providers} from "ethers";
import Layout from '../components/Layout';
import { Toaster } from 'react-hot-toast';

const provider = providers.getDefaultProvider(
  "https://rpc-mumbai.maticvigil.com"
);

function MyApp({ Component, pageProps }:AppProps) {
  return (
    <WagmiProvider autoConnect provider={provider}>
        <Toaster position='bottom-right'/>
        <Layout>
        <Component {...pageProps} />
       </Layout>
    </WagmiProvider>
  )
}

export default MyApp
