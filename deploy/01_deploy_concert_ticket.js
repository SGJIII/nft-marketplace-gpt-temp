// deploy/01_deploy_concert_ticket.js

const hre = require("hardhat");

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("ConcertTicket", {
    from: deployer,
    args: ["0x0000000000000000000000000000000000000000"], // Temporarily pass a zero address for marketplaceAddress
    log: true,
  });
};
