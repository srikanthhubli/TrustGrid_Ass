Here’s the updated documentation incorporating **IPFS via Pinata (Pinata SDK)** for storing and retrieving metadata securely:

---

# Logistics Items NFT Smart Contract

## Overview
This project implements a smart contract to manage logistics items as NFTs using the **ERC1155** standard. It integrates **ERC20** tokens for payments, supports **ERC4337** for account abstraction, and utilizes **IPFS via Pinata** for metadata storage.

### Key Features
- Logistics items represented as NFTs (ERC1155 standard) with IPFS-hosted metadata.
- Ownership transfer functionality, including batch operations.
- Seamless integration with ERC20 tokens for payments.
- Support for ERC4337 wallet contract to enable account abstraction and advanced wallet operations.
- Metadata securely stored and retrieved using **IPFS via Pinata**.

---

## Implementation Details

### IPFS Integration
- **Pinata SDK** is used to upload and retrieve metadata files on IPFS.
- Metadata contains key details like item name, description, price, and image URL.
- Each logistics item is associated with a unique IPFS CID for its metadata.

### ERC1155 Standard
- Metadata URI follows the IPFS CID format: `ipfs://<CID>`.
- Supports minting, transferring, and batch operations for NFTs.

### ERC20 Integration
- Payment is facilitated using ERC20 tokens. Buyers pay in tokens, validated by the `transferFrom` function.

### ERC4337 Integration
- Enables account abstraction through the `executeERC4337` function.

---

## Prerequisites
Ensure you have the following:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Hardhat](https://hardhat.org/)
- Access to an Ethereum node (via Hardhat, Infura, or Alchemy)
- [Pinata API Key](https://www.pinata.cloud/)

---

## Setup Instructions

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd logistics-nft
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Create a `.env` file and add:
```env
PRIVATE_KEY=<Your_Private_Key>
URI=<Your_Pinata_IMAGE_URI_Key>
WALLET_ADDRESS=<Your_WALLET_ADDRESS>
PAYMENT_TOKEN_ADDRESS=<Your_PAYMENT_TOKEN_ADDRESS>
WALLET_CONTRACT_ADDRESS=<Your_WALLET_CONTRACT_ADDRESS>
```

---

## Deployment

### Step 1: Start Local Node
```bash
npx hardhat node
```

### Step 2: Deploy ERC20 Token
Deploy the ERC20 token contract:
```bash
npx hardhat run scripts/deployERC20Token.js --network localhost
```

### Step 3: Deploy ERC1155 Token
Deploy the ERC1155 token contract:
```bash
npx hardhat run scripts/deployERC1155Token.js --network localhost
```

### Step 4: Deploy LogisticsItemsNFT Contract
Update the `scripts/deploy.js` script:
- Metadata URI: Example: `ipfs://<Metadata_CID>/`
- ERC20 Token Address: Address of the deployed ERC20 token.
- ERC4337 Wallet Address: Address of the ERC4337 wallet contract.

Deploy the contract:
```bash
npx hardhat run scripts/deploy.js --network localhost
```

---

## Contract APIs

### ERC1155 Functions
#### `mint(address to, uint256 itemId, uint256 amount, string metadataURI)`
Mints logistics NFTs linked to IPFS metadata.
- **Parameters**:
  - `to`: Recipient's address.
  - `itemId`: Unique item identifier.
  - `amount`: Number of units.
  - `metadataURI`: IPFS URI of the metadata (e.g., `ipfs://<CID>`).

#### `transferOwnership(address from, address to, uint256 itemId, uint256 amount)`
Transfers ownership of an item.

#### `transferWithPayment(address from, address to, uint256 itemId, uint256 amount)`
Transfers ownership after validating ERC20 token payment.

### ERC20 Functions
#### `approve(address spender, uint256 amount)`
Approves the contract to spend tokens on behalf of the user.

#### `transferFrom(address from, address to, uint256 amount)`
Transfers tokens from the payer to the contract.

### ERC4337 Functions
#### `executeERC4337(address to, uint256 value, bytes calldata data)`
Allows ERC4337 wallets to perform custom operations.

---

## Testing

### Minting Logistics NFTs with Metadata
```bash
npx hardhat console --network localhost
const contract = await ethers.getContractAt("LogisticsItemsNFT", "<Contract_Address>");
await contract.mint("0xRecipientAddress", 1, 10, "ipfs://<Metadata_CID>");
```

### Metadata Retrieval
Use a public IPFS gateway to view metadata:
```
https://ipfs.io/ipfs/<Metadata_CID>
```

---

## Enhancements

### Advanced Features
1. **Batch Metadata Upload**: Automate batch metadata uploads for multiple logistics items.
2. **IPFS Pinning**: Implement automated re-pinning to prevent metadata unavailability.
3. **Dynamic Metadata**: Enable updating metadata dynamically for changing item details (e.g., status or location).

### Security Measures
- Validate ERC20 token payments to prevent underpayment.
- Restrict unauthorized access to minting and transfer functions.

---

