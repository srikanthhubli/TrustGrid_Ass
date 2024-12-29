# Logistics NFT Server

This repository contains the implementation of a server application built using Node.js, Express, and ethers.js to interact with Ethereum smart contracts. The application allows for minting and transferring NFTs, as well as checking balances of both NFTs and ERC20 tokens.

## Prerequisites

Before running the server, ensure you have the following installed:

- Node.js (v16 or higher)
- npm (Node Package Manager)
- An Ethereum-compatible wallet with access to a blockchain network

## Getting Started

### 1. Clone the Repository
```bash
git clone <repository_url>
cd <repository_name>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and populate it with the following variables:
```env
PROVIDER_URL=<Your Ethereum provider URL, e.g., Infura or Alchemy>
PRIVATE_KEY=<Your private key for signing transactions>
LOGISTICS_NFT_CONTRACT_ADDRESS=<Deployed Logistics NFT contract address>
ERC20_TOKEN_CONTRACT_ADDRESS=<Deployed ERC20 token contract address>
```

### 4. Run the Server
```bash
node server.js
```
The server will start on `http://localhost:3000`.

## API Endpoints

### POST `/mint`
Mint a new logistics NFT.

#### Request Body
```json
{
  "userAddress": "0x1234...", // Address to mint the NFT to
  "tokenId": 1                 // Unique ID for the logistics item
}
```

#### Response
```json
{
  "message": "Logistics item minted successfully",
  "txHash": "0xabcdef..." // Transaction hash
}
```

### POST `/transfer`
Transfer a logistics NFT to another address.

#### Request Body
```json
{
  "fromAddress": "0x1234...", // Sender's address
  "toAddress": "0x5678...",   // Recipient's address
  "tokenId": 1,                // ID of the logistics item
  "value": 1                   // Quantity to transfer
}
```

#### Response
```json
{
  "message": "Logistics item transferred successfully",
  "txHash": "0xabcdef..." // Transaction hash
}
```

### GET `/balance`
Check the balance of a specific NFT for an address.

#### Query Parameters
- `address` (string): Address to check the balance for.
- `tokenId` (number): ID of the logistics item.

#### Response
```json
{
  "balance": 1 // Number of NFTs owned
}
```

### GET `/balanceERC20`
Check the ERC20 token balance for an address.

#### Query Parameters
- `address` (string): Address to check the balance for.

#### Response
```json
{
  "balance": "100.00" // ERC20 token balance in human-readable format
}
```

## Contract Details

### Logistics NFT ABI
The following functions are supported by the Logistics NFT contract:
- `mint(address to, uint256 itemId, uint256 amount, string memory itemName, uint256 itemPrice)`
- `transfer(address to, uint256 tokenId)`
- `safeTransferFrom(address from, address to, uint256 id, uint256 value, bytes memory data)`
- `balanceOf(address account, uint256 id) view returns (uint256)`

### ERC20 ABI
The following functions are supported by the ERC20 contract:
- `balanceOf(address account) public view returns (uint256)`
- `transfer(address recipient, uint256 amount) public returns (bool)`

## Error Handling
If any errors occur during API requests, the server will return a `500 Internal Server Error` with a JSON response containing an error message:
```json
{
  "error": "Failed to <action>"
}
```

## License
This project is licensed under the MIT License. Feel free to use and modify the code.
