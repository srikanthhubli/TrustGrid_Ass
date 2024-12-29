// scripts/deploy-erc4337-wallet.js
const { ethers } = require("hardhat");

async function main() {
    try {
        // Get the signer (deployer)
        const [deployer] = await ethers.getSigners();
        console.log("Deploying ERC4337 wallet with the account:", deployer.address);

        // Deploy the EntryPoint contract
        console.log("Deploying EntryPoint...");
        const EntryPoint = await ethers.getContractFactory("EntryPoint");
        const entryPoint = await EntryPoint.deploy();
        await entryPoint.waitForDeployment();
        const entryPointAddress = await entryPoint.getAddress();
        console.log("EntryPoint deployed to:", entryPointAddress);

        // Deploy the ERC4337 Wallet contract with constructor parameters
        console.log("Deploying ERC4337 Wallet...");
        const MyERC4337Wallet = await ethers.getContractFactory("MyERC4337Wallet");
        
        // Pass constructor parameters as an array
        const wallet = await MyERC4337Wallet.deploy(
            entryPointAddress,  // first parameter - entryPoint address
            deployer.address,   // second parameter - owner address
            {                   // deployment options (optional)
                gasLimit: 5000000
            }
        );
        
        await wallet.waitForDeployment();
        const walletAddress = await wallet.getAddress();
        console.log("ERC4337 Wallet deployed to:", walletAddress);

    } catch (error) {
        console.error("Deployment Error Details:", error);
        throw error;
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });