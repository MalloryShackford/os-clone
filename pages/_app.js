import '@/styles/globals.css'
import  { ThirdwebWeb3Provider } from '@3rdweb/hooks'


const supportedChainIds = [5] //goerli network
const connectors = {
  injected: {}, //web3 connection method used by MetaMask
}

export default function App({ Component, pageProps }) {
  return  (
  <ThirdwebWeb3Provider
      supportedChainIds={supportedChainIds}
      connectors={connectors}
    >
      <Component {...pageProps} />
    </ThirdwebWeb3Provider>
  )
}