// const FamilyFundTest = artifacts.require("FamilyFundTest");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
// contract("FamilyFundTest", function (/* accounts */) {
//   it("should assert true", async function () {
//     await FamilyFundTest.deployed();
//     return debug(assert.isTrue(true));
//   });
// });

// const MetaCoin = artifacts.require("MetaCoin");
const FF = artifacts.require("FamilyFund");
contract("FamilyFund", (accounts) => {
  it("Creating Fund", async () => {
    const ffInstance = await FF.deployed();
    await ffInstance.createFund(3, 1, { from: accounts[0] });
    assert.equal(await ffInstance.returnFundBalance(), 0, "Fund must be empty");
    assert.equal(await ffInstance.isFundActive(), true, "Wrong fund state");
  });
  it("Adding first member", async () => {
    const ffInstance = await FF.deployed();
    await ffInstance.createFund.call(3, 1, { from: accounts[0] });
    console.log(
      "First member: " + (await ffInstance.getMembers.call()) + "Tamam!"
    );
    await ffInstance.addMember.call(accounts[1], { from: accounts[0] });
    // await ffInstance.addMember
    //   .call(accounts[1], { from: accounts[0] })
    //   .then(assert.equal(true, false, "Member added again!"))
    //   .catch((e) => console.log(">>>>>> Not added :-)"));
    await ffInstance.addMember.call(accounts[2], { from: accounts[0] });
    await ffInstance.addMember.call(accounts[3], { from: accounts[0] });
    await ffInstance.addMember.call(accounts[3], { from: accounts[0] });
    await ffInstance.addMember.call(accounts[4], { from: accounts[0] });
  });
});

// contract("MetaCoin", (accounts) => {
//   it("should put 10000 MetaCoin in the first account", async () => {
//     const metaCoinInstance = await MetaCoin.deployed();
//     const balance = await metaCoinInstance.getBalance.call(accounts[0]);

//     assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
//   });
//   it("should call a function that depends on a linked library", async () => {
//     const metaCoinInstance = await MetaCoin.deployed();
//     const metaCoinBalance = (
//       await metaCoinInstance.getBalance.call(accounts[0])
//     ).toNumber();
//     const metaCoinEthBalance = (
//       await metaCoinInstance.getBalanceInEth.call(accounts[0])
//     ).toNumber();

//     assert.equal(
//       metaCoinEthBalance,
//       2 * metaCoinBalance,
//       "Library function returned unexpected function, linkage may be broken"
//     );
//   });
//   it("should send coin correctly", async () => {
//     const metaCoinInstance = await MetaCoin.deployed();

//     // Setup 2 accounts.
//     const accountOne = accounts[0];
//     const accountTwo = accounts[1];

//     // Get initial balances of first and second account.
//     const accountOneStartingBalance = (
//       await metaCoinInstance.getBalance.call(accountOne)
//     ).toNumber();
//     const accountTwoStartingBalance = (
//       await metaCoinInstance.getBalance.call(accountTwo)
//     ).toNumber();

//     // Make transaction from first account to second.
//     const amount = 10;
//     await metaCoinInstance.sendCoin(accountTwo, amount, { from: accountOne });

//     // Get balances of first and second account after the transactions.
//     const accountOneEndingBalance = (
//       await metaCoinInstance.getBalance.call(accountOne)
//     ).toNumber();
//     const accountTwoEndingBalance = (
//       await metaCoinInstance.getBalance.call(accountTwo)
//     ).toNumber();

//     assert.equal(
//       accountOneEndingBalance,
//       accountOneStartingBalance - amount,
//       "Amount wasn't correctly taken from the sender"
//     );
//     assert.equal(
//       accountTwoEndingBalance,
//       accountTwoStartingBalance + amount,
//       "Amount wasn't correctly sent to the receiver"
//     );
//   });
// });
