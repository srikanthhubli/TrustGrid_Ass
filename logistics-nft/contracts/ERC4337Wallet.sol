// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/utils/Create2.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract MyERC4337Wallet is Initializable {
    address public entryPoint;
    address public owner;

    event Executed(address indexed target, uint256 value, bytes data);

    constructor(address _entryPoint, address _owner) {
        initialize(_entryPoint, _owner);
    }

    function initialize(address _entryPoint, address _owner) public initializer {
        require(_entryPoint != address(0), "Invalid entry point");
        require(_owner != address(0), "Invalid owner");
        entryPoint = _entryPoint;
        owner = _owner;
    }

    function execute(address target, uint256 value, bytes calldata data) external {
        require(msg.sender == entryPoint || msg.sender == owner, "Not authorized");
        (bool success, bytes memory result) = target.call{value: value}(data);
        if (!success) {
            assembly {
                revert(add(result, 32), mload(result))
            }
        }
        emit Executed(target, value, data);
    }

    receive() external payable {}
}