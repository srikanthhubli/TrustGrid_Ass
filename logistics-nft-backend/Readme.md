Here's the entire `README.md` content in a single file:

```markdown
# Logistics NFT and ERC-20 Token Management

This project provides a simple Express-based API for interacting with a Logistics Non-Fungible Token (NFT) and an ERC-20 token contract using the Ethers.js library. The API allows minting, transferring, and checking the balance of Logistics NFTs and ERC-20 tokens on the Ethereum blockchain.

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v16 or higher)
- NPM or Yarn (for managing dependencies)

## Environment Setup

Create a `.env` file in the root of the project directory with the following variables:

```bash
PROVIDER_URL=<Your Ethereum provider URL (e.g., Infura or Alchemy or Hardhat)>
PRIVATE_KEY=<Your wallet private key>
LOGISTICS_NFT_CONTRACT_ADDRESS=<Your Logistics NFT contract address>
ERC20_TOKEN_CONTRACT_ADDRESS=<Your ERC-20 token contract address>
```

- `PROVIDER_URL`: URL of your Ethereum node provider (e.g., Infura, Alchemy, etc.)
- `PRIVATE_KEY`: Private key for signing transactions (use a secure method for managing private keys)
- `LOGISTICS_NFT_CONTRACT_ADDRESS`: Address of the Logistics NFT contract
- `ERC20_TOKEN_CONTRACT_ADDRESS`: Address of the ERC-20 token contract

## Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Available Routes

The API exposes the following endpoints:

### 1. Mint a Logistics Item (NFT)

**POST** `/mint`

- **Description**: Mint a new logistics item as an NFT.
- **Request Body**:
  ```json
  {
    "userAddress": "<user_wallet_address>",
    "tokenId": <token_id>
  }
  ```
- **Response**:
  ```json
  {
    "message": "Logistics item minted successfully",
    "txHash": "<transaction_hash>"
  }
  ```
  
### 2. Transfer a Logistics Item (NFT)

**POST** `/transfer`

- **Description**: Transfer a logistics item (NFT) from one address to another.
- **Request Body**:
  ```json
  {
    "fromAddress": "<sender_wallet_address>",
    "toAddress": "<recipient_wallet_address>",
    "tokenId": <token_id>,
    "value": <value_to_transfer>
  }
  ```
- **Response**:
  ```json
  {
    "message": "Logistics item transferred successfully",
    "txHash": "<transaction_hash>"
  }
  ```

### 3. Check Balance of Logistics NFTs for a User

**POST** `/balance`

- **Description**: Check the balance of a specific logistics NFT (by token ID) for a user.
- **Request Body**:
  ```json
  {
    "address": "<user_wallet_address>",
    "tokenId": <token_id>
  }
  ```
- **Response**:
  ```json
  {
    "balance": <balance>
  }
  ```

### 4. Check ERC-20 Token Balance for a User

**POST** `/balanceERC20`

- **Description**: Check the balance of ERC-20 tokens for a user.
- **Request Body**:
  ```json
  {
    "address": "<user_wallet_address>"
  }
  ```
- **Response**:
  ```json
  {
    "balance": "<token_balance>"
  }
  ```

## Running the Server

1. Start the server:
   ```bash
   npm start
   ```

   The server will be running on `http://localhost:3000`.

## How It Works

- The API interacts with two smart contracts: a Logistics NFT contract and an ERC-20 token contract.
- **Logistics NFT Contract**:
  - Allows minting of new logistics items as NFTs.
  - Enables transferring of NFTs between users.
  - Allows checking the balance of NFTs by token ID for a user.
- **ERC-20 Token Contract**:
  - Enables checking the ERC-20 token balance of a user.

## Additional Notes

- Be careful with private key management. In production environments, use a secure key management service.
- Ensure the Ethereum provider URL and contract addresses are correctly set in the `.env` file.
- The `mint` method in the Logistics NFT contract expects additional metadata like the item name and price when minting NFTs.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

You can copy and paste this directly into a `README.md` file in your project.