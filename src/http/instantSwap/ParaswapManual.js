import axios from "axios";
import { ONE_INCH_FEE_PERCENTAGE, ONE_INCH_REFERRER_ACCOUNT } from "../../constants";

export default class ParaswapManualApi {
	constructor() {
		this.instance = axios.create({
			baseURL: "https://apiv5.paraswap.io/",
		});
	}

	get(type, payload = {}) {
		switch (type) {
			
			case "quote": {
				return this.getQuote(payload);
			}
			
		}
	}

	
	getQuote(payload) {
		return this.instance.get(`prices`, {
			params: payload,
		});
	}

	
}
