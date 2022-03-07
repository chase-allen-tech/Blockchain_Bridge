import { ChainId, JSBI, Percent, Token, WETH } from "@uniswap/sdk";
import { BigNumber } from "@0x/utils";



export const BTC = {
	symbol: "BTC",
	name: "Bitcoin",
	logoURI: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579",
	decimals: 18,
	chainId: 1,
	address: "0x0000000000000000000000000000000000000001",
};


export const Infura_API =  process.env.INFURA_URL || "https://mainnet.infura.io/v3/5943806f71034503bbbb49413ffbbe15";

export const CHANGE_NOW_FLOW = process.env.REACT_APP_CHANGE_NOW_FLOW || 'standard';

export const SIDE_SHIFT_TYPE = process.env.REACT_APP_SIDE_SHIFT_TYPE || 'variable';

export const ZERO = new BigNumber(0);

export const supportedDEXes = {
	paraswap: [
		"MultiPath",
		"ParaSwapPool",
		"Swerve",
		"Balancer",
		"SushiSwap",
		"UniswapV2",
		"Uniswap",
		"Oasis",
		"Aave",
		"Weth",
		"Bancor",
		"Kyber",
		"Compound",
		"Zerox",
		"DefiSwap",
		"LINKSWAP",
		"ShibaSwap",
		"ParaSwapPool3",
		"ParaSwapPool7",
		"ParaSwapPool10",
		"UniswapV3",
		"OneInchLP",
		"SakeSwap",
		"BalancerV2",
		"KyberDMM"
	],
	dexag: ["synthetix", "ag", "curvefi", "zero_x"],
};

export const DEXesImages = {
	BalancerV2: "BALANCER.svg",
	UniswapV3:"UNISWAP.svg",
	ParaSwapPool3: "PARASWAP.jpg",
	ParaSwapPool7: "PARASWAP.jpg",
	ParaSwapPool10: "PARASWAP.jpg",
	Weth: "RADARRELAY.jpg",
	Uniswap: "UNISWAP.svg",
	UniswapV2: "UNISWAP.svg",
	Compound: "COMPOUND.png",
	CHAI: "CHAI.png",
	Oasis: "OASIS.svg",
	Kyber: "KYBER.svg",
	Aave: "AAVE.png",
	Bancor: "BANCOR.svg",
	zero_x: "ZEROEX.png",
	Zerox: "ZEROEX.png",
	MultiPath: "PARASWAP.jpg",
	ParaSwapPool: "PARASWAP.jpg",
	Swerve: "SWERVE.png",
	Balancer: "BALANCER.svg",
	SushiSwap: "SUSHISWAP.svg",
	synthetix: "SYNTHETIX.jpg",
	ag: "XBLASTER.png",
	curvefi: "CURVEFI.png",
	godex: "GODEX.png",
	oneInch: "ONEINCH.svg",
	coinSwitch: "coinSwitch.png",
	simpleSwap: "simpleswap.png",
	stealthex: "Stealthex.png",
	DefiSwap: "defiSwap.png",
	LINKSWAP: "linkSwap.png",
	changeNow: "CHANGE_NOW.png",
	sideShift: "SIDESHIFT.png",
	ShibaSwap: "shiba.png",
	OneInchLP: "ONEINCH.svg",
	SakeSwap: "sakeswap.png",
	KyberDMM: "kyber1.png"

};

export const networks_dict = {
	1 : 'eth'
}


const UNI_ADDRESS = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
export const UNI: { [chainId in ChainId]: Token } = {
	[ChainId.MAINNET]: new Token(ChainId.MAINNET, UNI_ADDRESS, 18, "UNI", "Uniswap"),
	[ChainId.RINKEBY]: new Token(ChainId.RINKEBY, UNI_ADDRESS, 18, "UNI", "Uniswap"),
	[ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, UNI_ADDRESS, 18, "UNI", "Uniswap"),
	[ChainId.GÖRLI]: new Token(ChainId.GÖRLI, UNI_ADDRESS, 18, "UNI", "Uniswap"),
	[ChainId.KOVAN]: new Token(ChainId.KOVAN, UNI_ADDRESS, 18, "UNI", "Uniswap"),
};

export const DEFAULT_DECIMALS = 18;

export const SIMPLE_SWAP_FIXED = process.env.REACT_APP_SIMPLESWAP_FIXED_RATE === "true" || false;
export const PROXY_URL = process.env.REACT_APP_PROXY_URL || "http://localhost:3001";

export const NFT_REFERRER_ACCOUNT = process.env.REACT_APP_NFT_REFERRER_ACCOUNT
	? process.env.REACT_APP_NFT_REFERRER_ACCOUNT
	: process.env.REACT_APP_REFERRER_ACCOUNT;
export const ONE_INCH_REFERRER_ACCOUNT = process.env.REACT_APP_1INCH_REFERRER_ACCOUNT
	? process.env.REACT_APP_1INCH_REFERRER_ACCOUNT
	: process.env.REACT_APP_REFERRER_ACCOUNT;
export const ONE_INCH_FEE_PERCENTAGE = process.env.REACT_APP_1INCH_REFERRER_FEE_PERCENTAGE
	? process.env.REACT_APP_1INCH_REFERRER_FEE_PERCENTAGE
	: "0";
export const PARASWAP_REFERRER_ACCOUNT = process.env.REACT_APP_PARASWAP_REFERRER
	? process.env.REACT_APP_PARASWAP_REFERRER
	: process.env.REACT_APP_REFERRER_ACCOUNT;
export const BITREFILL_REF_TOKEN = process.env.REACT_APP_BITREFILL_REF_TOKEN
	? process.env.REACT_APP_BITREFILL_REF_TOKEN
	: process.env.REACT_APP_REFERRER_ACCOUNT;