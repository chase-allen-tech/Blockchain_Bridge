export const farmsContainer:any = {
    1 : {
        '1inch' : [
            {
                'name' : 'Dai/StETH LP farm',
                'address' : '0xd7012cDeBF10d5B352c601563aA3A8D1795A3F52',
                "stakeCoins" : [
                    {
                        'id' : "staked-ether",
                        "symbol" : "StETH",
                        "address" : "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84"
                    },
                    {
                        'id': "dai",
                        "symbol" : "dai",
                        "address" : "0x6B175474E89094C44Da98b954EedeAC495271d0F"
                    }
                ],
                "rewardToken" : 
                    {
                        "id" : "lido-dao",
                        "1inch_id" : 1,
                        "address" : "0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32",
                        "decimals" : 18
                    }
                
                
            },
            {
                'name' : '1inch/Opium LP farm',
                'address' : '0x48371588E964F1e8939127AF68622e32268640FA',
                "stakeCoins" : [
                    {
                        'id' : "1inch",
                        "symbol" : "1Inch",
                        "address" : "0x111111111117dc0aa78b770fa6a738034120c302"
                    },
                    {
                        'id': "opium",
                        "symbol" : "opium",
                        "address" : "0x888888888889c00c67689029d7856aac1065ec11"
                    }
                ],
                "rewardToken" : 
                    {
                        "id" : "opium",
                        "1inch_id" : 1,
                        "address" : "0x888888888889c00c67689029d7856aac1065ec11",
                        "decimals" : 18
                    }
                
                
            }
        ]
    },

}