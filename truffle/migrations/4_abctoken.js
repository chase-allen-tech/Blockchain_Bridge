const Token = artifacts.require("ABCToken.sol");

module.exports = function (deployer) {
  deployer.deploy(Token,"1000000000000000000000000000");
};
