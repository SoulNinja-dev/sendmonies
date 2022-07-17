const { ethers } = require("hardhat");

const main = async () => {
  const openbankFactory = await hre.ethers.getContractFactory("OpenBank");
  const bankContract = await openbankFactory.deploy();

  console.log("Contract deployed to:", bankContract.address);

  await bankContract.deposit({
    value: hre.ethers.utils.parseEther("0.001"),
  });
  console.log("Deposit successful");
}

const runMain = async () => {
  try {
    await main();
    process.exit(0); // exit Node process without error
  } catch (error) {
    console.log(error);
    process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
  }
};

runMain();
