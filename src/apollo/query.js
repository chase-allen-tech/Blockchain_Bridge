import { gql } from '@apollo/client';

// export const GET_FARMS = gql`
//   query pools($skip: Int!) {
// 	  pools (skip: $skip, first: 100, orderBy: "allocPoint", orderDirection: "desc", where: { allocPoint_gt: 0, accSushiPerShare_gt: 0 }) {
// 	    id
// 	    pair
// 	    allocPoint
// 	    balance
// 	  }
// 	}
// `

export const GET_FARMS = gql`
  query sushiFarms($skip: Int!) {
	  sushiFarms(skip: $skip, first: 100, orderBy: allocPoint, orderDirection: desc, where: { allocPoint_gt: 0, accSushiPerShare_gt: 0, masterChef_in: ["0xc2edad668740f1aa35e4d8f227fb8e17dca888cd"] }) {
	    farmPid
	    allocPoint
	    totalSupply
	    lpToken {
	      id
	    }
	  }
	}
`

export const GET_PAIRS = gql`
  query pairs($timestamp: String!, $pairAddresses: [Bytes]!) {
	  pairs (where: { id_in: $pairAddresses, timestamp_lt: $timestamp }) {
	    id
	    reserve0
	    reserve1
	    reserveUSD
	    volumeUSD
	    totalSupply
	    token0 {
	    	id
	    	name
	    	symbol
	    }
	    token1 {
	    	id
	    	name
	    	symbol
	    }
	  }
	}
`

export const GET_PAIRDAYDATA = gql`
	query pairDayDatas($pairAddress: [Bytes]!){
	  pairDayDatas (first: 1, orderBy: date, orderDirection: desc, where: {pair_in: $pairAddress}) {
	    date
	    id
	    reserveUSD
	    reserve0
	    reserve1
	    volumeUSD
	  }
	}
`

export const GET_SUSHI_PRICE = gql`
  query price {
	  tokens (where: { id: "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2"} ) {
	    id
	    derivedETH
	  }
	}
`

export const GET_ETH_PRICE = gql`
  query price {
	  bundles {
	    ethPrice
	  }
	}
`
// export const GET_FARMS = gql`
//   query {
// 	  pools (first: 10) {
// 	    id
// 	    pair
// 	    allocPoint
// 	    userCount
// 	  }
// 	}
// `