// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Interface for ERC4337 (Account Abstraction)
interface IERC4337 {
    function execute(address to, uint256 value, bytes calldata data) external;
}

contract LogisticsItemsNFT is ERC1155, Ownable(msg.sender) {
    // Mapping from item ID to item name
    mapping(uint256 => string) public itemNames;
    
    // Mapping from item ID to item price
    mapping(uint256 => uint256) public itemPrices;

    // ERC20 token for payments
    IERC20 public paymentToken;

    // ERC4337 Wallet contract
    IERC4337 public walletContract;

    // Event for ownership transfer
    event OwnershipTransferred(address indexed from, address indexed to, uint256 itemId, uint256 amount);

    // Constructor to initialize contract
    constructor(
        string memory _uri,  // Metadata URI
        address _paymentToken,  // Address of the ERC20 token (e.g., DAI, USDT)
        address _walletContract  // Address of the ERC4337 wallet contract
    ) ERC1155(_uri) {
        // Initialize the ERC20 and wallet contract
        paymentToken = IERC20(_paymentToken);
        walletContract = IERC4337(_walletContract);
    }

    // Ownership transfer function: Transfers ownership of logistics items
    function transferItemOwnership(
        address from,
        address to,
        uint256 itemId,
        uint256 amount
    ) internal {
        require(balanceOf(from, itemId) >= amount, "Insufficient balance");
        _safeTransferFrom(from, to, itemId, amount, "");
        emit OwnershipTransferred(from, to, itemId, amount);
    }

    // Minting function: Allows owner to mint new logistics items
    function mint(
        address to, 
        uint256 itemId, 
        uint256 amount, 
        string memory itemName, 
        uint256 itemPrice
    ) external onlyOwner {
        _mint(to, itemId, amount, "");
        itemNames[itemId] = itemName;
        itemPrices[itemId] = itemPrice;
    }

    // Transfer logistics item with payment: Transfers ownership and requires ERC20 payment
    function transferWithPayment(
        address from,
        address to,
        uint256 itemId,
        uint256 amount
    ) external {
        uint256 totalPrice = itemPrices[itemId] * amount;
        require(paymentToken.transferFrom(from, address(this), totalPrice), "Payment failed");
        // Use the custom transferItemOwnership function for item transfer
        transferItemOwnership(from, to, itemId, amount);
    }

    // Execute a transaction via ERC4337 wallet contract
    function executeERC4337(
        address to, 
        uint256 value, 
        bytes calldata data
    ) external {
        walletContract.execute(to, value, data);
    }
}