import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  // {
  //   pid: 0,
  //   lpSymbol: 'CAKE',
  //   lpAddresses: {
  //     97: '0x9C21123D94b93361a29B2C2EFB3d5CD8B17e0A9e',
  //     56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  //   },
  //   token: tokens.syrup,
  //   quoteToken: tokens.wbnb,
  // },
  {
    pid: 1,
    lpSymbol: 'UST-MATIC',
    lpAddresses: {
      97: '0xe70b7523f4bffa1f2e88d2ba709afd026030f412',
      56: '0x6fA867BBFDd025780a8CFE988475220AfF51FB8b',
    },
    token: tokens.dfyn,
    quoteToken: tokens.weth,
  },
  {
    pid: 2,
    lpSymbol: 'ETH-USDC',
    lpAddresses: {
      97: '',
      56: '0x97A95deb56d689802F02f50c25EBCda5d0A49591',
    },
    token: tokens.xmark,
    quoteToken: tokens.usdc,
  },
  {
    pid: 27,
    lpSymbol: 'wBTC-ETH',
    lpAddresses: {
      97: '',
      56: '0xC419c78039Dc2E35e639cB0aB1aC7351A4A9AA44',
    },
    token: tokens.dino,
    quoteToken: tokens.usdc,
  },
  {
    pid: 28,
    lpSymbol: 'ETH-USDT',
    lpAddresses: {
      97: '',
      56: '0xcE621CE85eABC6dd95088B81CaB683DFb4628864',
    },
    token: tokens.dino,
    quoteToken: tokens.weth,
  },
  {
    pid: 29,
    lpSymbol: 'ETH-QUICK',
    lpAddresses: {
      97: '',
      56: '0xA629252b0e41111a0aA0112aE04CEE4bCeeAe476',
    },
    token: tokens.wmatic,
    quoteToken: tokens.weth,
  },
  {
    pid: 30,
    lpSymbol: 'AAVE-ETH',
    lpAddresses: {
      97: '',
      56: '0xa8fB745919D959fbbDFAB71b88E82BB4E6BA502E',
    },
    token: tokens.weth,
    quoteToken: tokens.usdc,
  },
  {
    pid: 31,
    lpSymbol: 'DAI-ETH',
    lpAddresses: {
      97: '',
      56: '0xc961AC0404f95141573DAe224525Ae936Bd3bf64',
    },
    token: tokens.wmatic,
    quoteToken: tokens.usdc,
  },
  {
    pid: 32,
    lpSymbol: 'wBTC-USDC',
    lpAddresses: {
      97: '',
      56: '0x18f501866FCaA9935367A223b79041e603b3B86E',
    },
    token: tokens.usdc,
    quoteToken: tokens.usdt,
  },
  {
    pid: 33,
    lpSymbol: 'USDC-QUICK',
    lpAddresses: {
      97: '',
      56: '0x52f061Ec0cB85F2570a5A9Ab511E8F86Ef454300',
    },
    token: tokens.cgg,
    quoteToken: tokens.usdc,
  },
]

export default farms
