// scripts/deploy-erc20.js
const { ethers } = require("hardhat");

async function main() {
    // Get the signer (deployer)
    const [deployer] = await ethers.getSigners();
    console.log("Deploying ERC20 token with the account:", deployer.address);

    // Get the contract factory for ERC20 token
    const Token = await ethers.getContractFactory("MyERC20Token");

    const value = ethers.parseUnits("1", 18);
    console.log("Initial supply:", value.toString());

    // Deploy the ERC20 token with an initial supply
    const token = await Token.deploy(value);
    
    // Wait for deployment to finish
    await token.waitForDeployment();
    
    // Get the deployed contract address
    const tokenAddress = await token.getAddress();
    
    console.log("ERC20 Token deployed to:", tokenAddress);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });