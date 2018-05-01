# BitShip ICO

# Utility Command

- In `truffle develop`
```js
// Get balance in Coin of account:
BitShipCoin.deployed().then( (c) => { return c.balanceOf(web3.eth.accounts[0]);} );

// Send ETH to buy Coin
BitShipCoinCrowdsale.deployed().then( inst => {inst.sendTransaction({from: web3.eth.accounts[0],value: web3.toWei(5, "ether")});});
```

- In shell at ICO-root-folder
```bash
# deploy the crowdsale to rinkeby testnet
truffle migrate --network rinkeby
```
