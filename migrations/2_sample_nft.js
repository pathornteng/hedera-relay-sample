var myNFT = artifacts.require("SampleNFT");
module.exports = function (deployer) {
  deployer.deploy(myNFT);
};
