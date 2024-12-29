import { ethers } from 'ethers';
import { config } from 'dotenv';

// Load environment variables from .env file
config();


// Create a wallet instance
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);

// Get the wallet address
console.log("Wallet Address:", wallet.address);
