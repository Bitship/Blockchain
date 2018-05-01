require('dotenv').config()
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = process.env.MNEMONIC;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*" // Match any network id
    }
  },
  networks: {
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, process.env.TEST_NET_ROPSTEN, 0)
      },
      network_id: 3
    }
  },
  networks: {
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, process.env.TEST_NET_RINBEKY, 0)
      },
      network_id: 4,
      gas: 4000000,
      gasPrice: 10000000000,
    }
  }
};
