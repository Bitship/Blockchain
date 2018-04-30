const BitShipCoinCrowdsale = artifacts.require('./BitShipCoinCrowdsale.sol');
const BitShipCoin = artifacts.require('./BitShipCoin.sol');

module.exports = function (deployer, network, accounts) {
  const openingTime = web3.eth.getBlock('latest').timestamp + 2; // two secs in the future
  const closingTime = openingTime + 86400 * 20; // 20 days
  const wallet = accounts[0];

  const initialRate = new web3.BigNumber(2000);
  const finalRate = new web3.BigNumber(1000);

  return deployer
    .then(() => {
      return deployer.deploy(BitShipCoin);
    })
    .then(() => {
      return deployer.deploy(
        BitShipCoinCrowdsale,
        openingTime,
        closingTime,
        initialRate,
        finalRate,
        wallet,
        BitShipCoin.address
      );
    })
    .then(() => {
      BitShipCoinCrowdsale.deployed().then((crowdsale) => {
        BitShipCoin.deployed().then((coin) => {
          coin.transferOwnership(crowdsale.address)
        })
      })
    });
}