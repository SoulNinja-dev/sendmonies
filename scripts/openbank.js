const { ethers } = require("hardhat");

const main = async () => {
  const [owner, user1, user2] = await hre.ethers.getSigners();
  const openbankFactory = await hre.ethers.getContractFactory("OpenBank");
  const bankContract = await openbankFactory.deploy();

  console.log("Contract deployed to:", bankContract.address);

  await bankContract.deposit({
    value: hre.ethers.utils.parseEther("0.001"),
  });
  console.log("Deposit successful");

  printContractBalance(bankContract);

  await bankContract.withdraw(hre.ethers.utils.parseEther("0.001"));
  console.log("Withdraw successful");

  printContractBalance(bankContract);

  await bankContract.connect(owner).deposit({
    value: hre.ethers.utils.parseEther("0.001"),
  });
  await bankContract.connect(user1).deposit({
    value: hre.ethers.utils.parseEther("0.01"),
  });
  await bankContract.connect(user2).deposit({
    value: hre.ethers.utils.parseEther("0.04"),
  });

  printContractBalance(bankContract);
  printBalances(bankContract, owner, user1, user2);

  await bankContract
    .connect(owner)
    .withdraw(hre.ethers.utils.parseEther("0.01"))
    .catch((err) => {
      console.log(err.error);
    });

  await bankContract
    .connect(user1)
    .withdraw(hre.ethers.utils.parseEther("0.01"))
    .catch((err) => {
      console.log(err.error);
    });

  await bankContract
    .connect(user2)
    .transfer(await user1.getAddress(), hre.ethers.utils.parseEther("0.01"))
    .catch((err) => {
      console.log(err.error);
    });

  printContractBalance(bankContract);
  printBalances(bankContract, owner, user1, user2);
};

const printContractBalance = async (bankContract) => {
  let contractBalance = await hre.ethers.provider.getBalance(
    bankContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );
};

const printBalances = async (bankContract, owner, user1, user2) => {
  console.log(
    `balance of ${await owner.getAddress()} is ${await bankContract
      .connect(owner)
      .getBalance()}`
  );
  console.log(
    `balance of ${await user1.getAddress()} is ${await bankContract
      .connect(user1)
      .getBalance()}`
  );
  console.log(
    `balance of ${await user2.getAddress()} is ${await bankContract
      .connect(user2)
      .getBalance()}`
  );
};

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
