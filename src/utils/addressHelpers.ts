import addresses from '../constants/contracts'
import tokens from '../constants/tokens'
import { Address } from '../constants/types'

export const getAddress = (address: any): string => {
  const mainNetChainId = 56
  const chainId = process.env.REACT_APP_CHAIN_ID || 56
  return address[chainId] ? address[chainId] : address[mainNetChainId]
}

// export const getCakeAddress = () => {
//   return getAddress(tokens.cake.address)
// }
export const getMasterChefAddress = () => {
  return getAddress(addresses.masterChef)
}
export const getMulticallAddress = () => {
  return getAddress(addresses.mulltiCall)
}
// export const getWbnbAddress = () => {
//   return getAddress(tokens.wbnb.address)
// }
// export const getLotteryAddress = () => {
//   return getAddress(addresses.lottery)
// }
// export const getLotteryTicketAddress = () => {
//   return getAddress(addresses.lotteryNFT)
// }
// export const getPancakeProfileAddress = () => {
//   return getAddress(addresses.pancakeProfile)
// }
// export const getPancakeRabbitsAddress = () => {
//   return getAddress(addresses.pancakeRabbits)
// }
// export const getBunnyFactoryAddress = () => {
//   return getAddress(addresses.bunnyFactory)
// }
// export const getClaimRefundAddress = () => {
//   return getAddress(addresses.claimRefund)
// }
// export const getPointCenterIfoAddress = () => {
//   return getAddress(addresses.pointCenterIfo)
// }
// export const getBunnySpecialAddress = () => {
//   return getAddress(addresses.bunnySpecial)
// }
