const BitShipCoinCrowdsale = artifacts.require('./BitShipCoinCrowdsale.sol');
const BitShipCoin = artifacts.require('./BitShipCoin.sol');

module.exports = function (deployer, network, accounts) {
  var timestamp = Math.round((new Date()).getTime() / 1000);
  const openingTime = timestamp + 300; // 5 minute in the future
  const closingTime = openingTime + 86400 * 20; // 20 days
  const wallet = accounts[0];

  const initialRate = new web3.BigNumber(2000);
  const finalRate = new web3.BigNumber(1000);

  return deployer
    .then(() => {
      return deployer.deploy(BitShipCoin);
    })
    .then(() => {
      console.log([openingTime, closingTime, initialRate, finalRate, wallet, BitShipCoin.address]);
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
