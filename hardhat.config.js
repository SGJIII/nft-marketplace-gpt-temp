// hardhat.config.js

require("@nomiclabs/hardhat-waffle");
require("hardhat-deploy");
const { projectId, privateKey } = require("./secrets.json");

module.exports = {
  solidity: {
    compilers: [{ version: "0.8.0" }, { version: "0.8.1" }],
  },
  networks: {
    hardhat: {
      accounts: [
        {
          privateKey: privateKey, // Replace with your private key (without the "0x" prefix)
          balance: "10000000000000000000000", // This is optional
        },
      ],
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
      accounts: [privateKey],
      gasPrice: 8000000000,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
