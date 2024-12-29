const { ethers } = require("hardhat");



async function main() {
  // Get the signers (wallets) from Hardhat
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Replace with the constructor arguments for your contract
  const uri = process.env.URI;  // URI from .env
  const paymentTokenAddress = process.env.PAYMENT_TOKEN_ADDRESS; // ERC20 token address from .env
  const walletContractAddress = process.env.WALLET_CONTRACT_ADDRESS; // ERC4337 wallet contract address from .env

  // Deploy the LogisticsItemsNFT contract
  const LogisticsItemsNFT = await ethers.getContractFactory("LogisticsItemsNFT");
  const logisticsItemsNFT = await LogisticsItemsNFT.deploy(uri, paymentTokenAddress, walletContractAddress);

  const logisticsItemsNFTAddress = await logisticsItemsNFT.getAddress();
  console.log("LogisticsItemsNFT contract deployed to:", logisticsItemsNFTAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
