var FamilyFund = artifacts.require("FamilyFund");

module.exports = function (deployer) {
  deployer.deploy(FamilyFund, 3, 1);
};
