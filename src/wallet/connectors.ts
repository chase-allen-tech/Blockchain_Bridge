import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42,97,137,66,1337, 250, 43114, 56, 122, 1285] })


export const walletconnect = new WalletConnectConnector({
    rpc: { 4: "https://rinkeby.infura.io/v3/5943806f71034503bbbb49413ffbbe15" },
    qrcode: true
  })
