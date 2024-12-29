// server.js
import express from 'express';        
import bodyParser from 'body-parser';  
import { ethers } from 'ethers';      
import { config } from 'dotenv'; 
config();

// Load values from environment variables
const providerUrl = process.env.PROVIDER_URL;
const privateKey = process.env.PRIVATE_KEY;
const logisticsNFTAddress = process.env.LOGISTICS_NFT_CONTRACT_ADDRESS;
const tokenAddress = process.env.ERC20_TOKEN_CONTRACT_ADDRESS;

// Define the provider and wallet
const provider = new ethers.JsonRpcProvider(providerUrl);
const wallet = new ethers.Wallet(privateKey, provider);

// Define ABI for interacting with contracts
const logisticsNFTABI = [
  //"function mint(address to, uint256 tokenId) external",
  "function mint( address to, uint256 itemId, uint256 amount, string memory itemName, uint256 itemPrice) external",
  "function transfer(address to, uint256 tokenId) external",
  "function safeTransferFrom(address from, address to, uint256 id, uint256 value, bytes memory data) external",
  "function balanceOf(address account, uint256 id) view returns (uint256)"
];

const erc20ABI = [
  "function balanceOf(address account) public view returns (uint256)",
  "function transfer(address recipient, uint256 amount) public returns (bool)",
];

// Create contract instances
const logisticsNFT = new ethers.Contract(logisticsNFTAddress, logisticsNFTABI, wallet);
const erc20 = new ethers.Contract(tokenAddress, erc20ABI, wallet);

// Set up Express server
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Route to mint a new logistics item (NFT)
app.post('/mint', async (req, res) => {
  const { userAddress, tokenId ,} = req.body;

  try {
    // const code = await provider.getCode(logisticsNFTAddress)
    // console.log(code)
    //const balance  =  await logisticsNFT.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", 1)
    //console.log(balance)
    const tx = await logisticsNFT.mint(userAddress, tokenId, 1, "test", 1);
    await tx.wait(); // Wait for transaction confirmation
    res.status(200).json({ message: 'Logistics item minted successfully', txHash: tx.hash });
  } catch (error) {
    console.error("Error minting logistics item:", error);
    res.status(500).json({ error: 'Failed to mint logistics item' });
  }
});

// Route to transfer a logistics item (NFT)
app.post('/transfer', async (req, res) => {
  const { fromAddress ,toAddress, tokenId, value } = req.body;

  try {
    const tx = await logisticsNFT.safeTransferFrom(fromAddress, toAddress, tokenId,value, "0x");
    await tx.wait(); // Wait for transaction confirmation
    res.status(200).json({ message: 'Logistics item transferred successfully', txHash: tx.hash });
  } catch (error) {
    console.error("Error transferring logistics item:", error);
    res.status(500).json({ error: 'Failed to transfer logistics item' });
  }
});



// Route to check the balance of ERC20 tokens for a user (POST request)
app.get('/balance', async (req, res) => {
  const { address } = req.query; // Extracting address from the request params
  const { tokenId } = req.query; // Extracting address from the request params
  console.log(address);
  try {
    const balance =  await logisticsNFT.balanceOf(address, tokenId)
    console.log(balance)
    res.status(200).json({ balance: parseInt(balance) });
  } catch (error) {
    console.error("Error checking balance:", error);
    res.status(500).json({ error: 'Failed to check balance' });
  }
});

// Route to check the balance of ERC20 tokens for a user
app.get('/balanceERC20', async (req, res) => {
  const { address } = req.query;
  //console.log(address)
  //const address2 = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"

  try {
    //console.log(await provider.getCode(erc20.target))
    const balance = await erc20.balanceOf(address);
    res.status(200).json({ balance: ethers.formatUnits(balance, 18) });
  } catch (error) {
    console.error("Error checking balance:", error);
    res.status(500).json({ error: 'Failed to check balance' });
  }
});


// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
