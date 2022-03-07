import { ParaSwap } from "paraswap";


import OneInchApi from "./OneInch";
import GodexApi from "./Godex";

import SimpleSwapApi from "./SimpleSwap";
import StealthexApi from "./Stealthex";
import ChangeNow from "./ChangeNow";
import SideShift from "./SideShift";
import ParaswapManualApi from "./ParaswapManual";

export default {
	paraswap: new ParaSwap(),
	paraswapmanual : new ParaswapManualApi(),
	oneInch: new OneInchApi(),
	godex: new GodexApi(),
	simpleSwap: new SimpleSwapApi(),
	stealthex: new StealthexApi(),
	changeNow: new ChangeNow(),
	sideShift: new SideShift(),
};





/* {
	"address": "0x94d863173ee77439e4292284ff13fad54b3ba182",
	"chainId": 1,
	"decimals": 18,
	"logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/6852.png",
	"name": "Akropolis Delphi",
	"symbol": "ADEL"
}, */