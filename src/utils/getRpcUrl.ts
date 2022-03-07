export const nodes = [process.env.REACT_APP_NODE_1, process.env.REACT_APP_NODE_2, process.env.REACT_APP_NODE_3]

const getNodeUrl = () => {
  // return nodes[randomIndex]
  // return "https://polygon-mainnet.infura.io/v3/111d750ade4541a48ae98627b84228e5";
  return "https://polygon-rpc.com/";
}

export default getNodeUrl
