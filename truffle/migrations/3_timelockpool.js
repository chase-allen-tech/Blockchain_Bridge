const TimeLockNonTransferablePool = artifacts.require("TimeLockNonTransferablePool.sol");

module.exports = function (deployer) {
  deployer.deploy(TimeLockNonTransferablePool,
    "Staked ABC",
    "SABC",
    "0x26e2F191C50fe512a45FA8a9CEe7887632170672",
    "0x26e2F191C50fe512a45FA8a9CEe7887632170672",
    "0x85c0526e328C390ea9144f5c490939F56a242E62",
    "1000000000000000000",
    "31536000",
    "1000000000000000000",
    "315360000"
    );
};
