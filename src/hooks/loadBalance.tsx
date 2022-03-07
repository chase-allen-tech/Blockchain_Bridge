import ERC20_ABI from '../constants/abis/erc20.json';
import { loadContract } from '../utils';
import { ETHER, Token } from "@uniswap/sdk";

export async function getCoinBalance(account:any,active:any,library:any,token:any){
	if (account && active && library && token){
		if (token.symbol === "ETH"){
			let bal = await library.eth.getBalance(account);
			return Number(bal);
		}else{
			let c = loadContract(library,ERC20_ABI,token.address);
			let resp = await c.methods.balanceOf(account).call();
			return Number(resp);
		}	
	} else{
		return 0;
	}
}