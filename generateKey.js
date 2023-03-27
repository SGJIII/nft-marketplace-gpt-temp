const { ethers } = require("ethers");

function generatePrivateKey() {
  const wallet = ethers.Wallet.createRandom();
  console.log("Private Key: " + wallet.privateKey);
  console.log("Public Address: " + wallet.address);
}

generatePrivateKey();
