import { client, client1 } from '../apollo/client';
import { GET_FARMS, GET_PAIRS, GET_SUSHI_PRICE, GET_ETH_PRICE, GET_PAIRDAYDATA } from '../apollo/query';



// *** Added
export const getSushiFarms = async (totalAllocPoint: any, sushiPerBlock: any) => {
  let sushiPriceByETH:any = (await client1.query({
    query: GET_SUSHI_PRICE,
    variables: {
    },
    fetchPolicy: 'cache-first',
  })).data.tokens[0].derivedETH

  let ethPrice = (await client1.query({
    query: GET_ETH_PRICE,
    variables: {
    },
    fetchPolicy: 'cache-first',
  })).data.bundles[0].ethPrice

  // console.log("sushiPriceByETH", sushiPriceByETH, ethPrice)
  let sushiPrice = Number(sushiPriceByETH) * Number(ethPrice);

  let newData:any = [];
  for(let i = 0; i < 2; i++) {
    let _newData = (await client.query({
          query: GET_FARMS,
          variables: {
            skip: i * 100
          },
          fetchPolicy: 'cache-first',
        })).data.sushiFarms
    newData.push(..._newData);
  }
  console.log("====================", newData)

  let pairAddresses:any = [];
  for (let i = 0; i < newData.length; i++) {
    pairAddresses.push(newData[i].lpToken.id)
  }
  // console.log(pairAddresses)
  let pairsBefore1W = await getPairs(pairAddresses, true)
  let pairs = await getPairs(pairAddresses, false)

  // let pool = {
  //   liquidity: 0,
  //   APR: 0
  // }

  let liquidities:any = [];
  for(let i = 0; i < pairs.length; i++) {
  	let pool = newData.find((p: any, j: any) => p.lpToken.id === pairs[i].id)
    let totalSupply = pairs[i].totalSupply;
    let Lp_price = (pairs[i].reserveUSD / totalSupply)
    let liquidity = pool.totalSupply * Lp_price / 1e18;
    liquidities.push(liquidity);
    // console.log("liquidity", liquidity, Lp_price)
  }

  let poolInfos: any = [];
  for(let i = 0; i < pairs.length; i++) {
    // let pairDayDatas = (await client1.query({
    //   query: GET_PAIRDAYDATA,
    //   variables: {
    //     pairAddress: [pairs[i].id]
    //   },
    //   fetchPolicy: 'cache-first',
    // })).data.pairDayDatas

    // let feeAPR = (Number(pairDayDatas[0].volumeUSD) * 0.0025 *365) / pairs[i].reserveUSD * 100;
    let pool = newData.find((p: any, j: any) => p.lpToken.id === pairs[i].id)
    // console.log("volumeUSD", pairs[i].volumeUSD, pairsBefore1W[i].volumeUSD)
    // console.log("pool", pool)

    let rewardAPR = (sushiPrice * pool.allocPoint / totalAllocPoint * sushiPerBlock / 10**18 * 6500 * 365 / liquidities[i] * 100)
    let rewardPerday = pool.allocPoint / totalAllocPoint * sushiPerBlock / 10**18 * 6646
    // console.log("rewardPerday", newData[i].allocPoint, totalAllocPoint, sushiPerBlock)

    poolInfos.push({
      // feeAPR: feeAPR, 
      feeAPR: 0, 
      rewardAPR: rewardAPR, 
      liquidity: liquidities[i], 
      id: pairs[i].id,
      rewardPerday: rewardPerday,
      token0: pairs[i].token0,
      token1: pairs[i].token1,
      pid: pool.farmPid
    })
  }

  // console.log("poolInfos", poolInfos)

  return poolInfos
}

const getPairs = async (pairAddresses: any, beforeOneWeek: boolean) => {
  // console.log("beforeOneWeek", beforeOneWeek)

  let timestamp:any = Math.round((new Date()).getTime() / 1000)
  let newData = await client1.query({
    query: GET_PAIRS,
    variables: {
      timestamp: beforeOneWeek ? String(timestamp - 24 * 7 * 3600) : String(timestamp),
      pairAddresses: pairAddresses
    },
    fetchPolicy: 'cache-first',
  })
  return newData.data.pairs
}
// ***