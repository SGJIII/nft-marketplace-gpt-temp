const hre = require("hardhat");

module.exports = async function () {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const concertTicketInstance = await deployments.get("ConcertTicket");

  const marketplaceInstance = await deploy("Marketplace", {
    from: deployer,
    args: [concertTicketInstance.address],
    log: true,
  });

  console.log(`Marketplace deployed to: ${marketplaceInstance.address}`);
  console.log(
    `Updating ConcertTicket's baseURI to: https://api.example.com/metadata/`
  );

  const concertTicket = await ethers.getContractAt(
    "ConcertTicket",
    concertTicketInstance.address
  );
  await concertTicket
    .connect(deployer)
    .setBaseURI("https://api.example.com/metadata/");
};
