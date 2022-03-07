import { getAddress } from "@ethersproject/address";

export function round(num:number){
    return Math.round((num + Number.EPSILON) * 100) / 100
}


export function loadContract(w3:any,abi:any,address:string){
    return new w3.eth.Contract(abi,address);
}

export function truncate(str:any) {
    return str.length > 10 ? str.substring(0, 4) + "..." + str.substring(str.length-4,str.length-1) : str;
}

export function toFixed(x:any) {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split('e-')[1]);
      if (e) {
          x *= Math.pow(10,e-1);
          x = '0.' + (new Array(e)).join('0') + x.toString().substring(8);
      }
    } 
    return x;
  }


export async function calculateAP(library:any,abi:any,contract:string,setter_apr:any,setter_apy:any,period:number){
    let c = loadContract(library,abi,contract);
    let multiplier = await c.methods.getMultiplier(period).call();
    let year = 31536000;
    multiplier /=  10**18;
    let rate_period = year / period
    let apr = round((multiplier - 1) * rate_period *100)
    let apy = round(((multiplier ** rate_period) - 1 ) * 100)
    console.log(apr)
    if (setter_apr){
        setter_apr(apr);
    }
    if (setter_apy){
        setter_apy(apy);
    }
}


export function correctNumber(num:number){
    let s = String(num);
    if (s.length < 2){
        s = "0"+s;
    }

    return s
}


export function timeConverter(timestamp:number){
    var a = new Date(timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date:string = correctNumber(a.getDate());
    var hour:string = correctNumber(a.getHours());
    var min:string = correctNumber(a.getMinutes());
    var sec:string = correctNumber(a.getSeconds());
    var dt = date + ' ' + month + ' ' + year;
    var time =  hour + ':' + min + ':' + sec ;
    return  [dt , time];
  }


export async function getPrice(){
    try {
        let idd = "chainlink";
        let vs = "usd";
        let resp:any = await fetch('https://api.coingecko.com/api/v3/simple/price?ids='+idd+'&vs_currencies='+vs);
        let data:any = await resp.json();
        return data.chainlink.usd;
    } catch (err) {
        return 0
    }
}

export async function getPriceCoin(idd:any){
    try {
        let vs = "usd";
        let resp:any = await fetch('https://api.coingecko.com/api/v3/simple/price?ids='+idd+'&vs_currencies='+vs);
        let data:any = await resp.json();
        return data[idd].usd;
    } catch (err) {return 0}
}


export function formatNumber(num:any)
{
    num = num.toFixed(2) + '';
    let x = num.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

export function isAddress(value: any): string | false {
	try {
		return getAddress(value);
	} catch {
		return false;
	}
}