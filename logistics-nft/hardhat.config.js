require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,  // Reduced runs for smaller contract size
      },
      viaIR: true, // Enable IR-based code generation
      evmVersion: "paris",
    },
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true, // Enable for testing
      gas: 12000000,
      blockGasLimit: 12000000,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      accounts: [process.env.PRIVATE_KEY],
      allowUnlimitedContractSize: true,
      gas: 12000000,
      blockGasLimit: 12000000,
    },
    rinkeby: {
      url: process.env.ALCHEMY_API_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};