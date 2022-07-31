var myToken = artifacts.require("SampleToken");
module.exports = function (deployer) {
  deployer.deploy(myToken);
};
