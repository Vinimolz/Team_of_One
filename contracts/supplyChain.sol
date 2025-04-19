// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SupplyChain is Ownable {
    // Structure to store product details
    struct Product {
        uint id;
        string name;
        string currentLocation;
        address currentOwner;
        string status;
        string[] history;
    }

    // Mapping to store products
    mapping(uint => Product) public products;
    uint public productCount;

    // Events for tracking
    event ProductCreated(uint id, string name, address owner);
    event ProductUpdated(uint id, string location, string status, address newOwner);

    constructor() Ownable(msg.sender) {
        productCount = 0;
    }

    // Create a new product
    function createProduct(string memory _name, string memory _initialLocation) public onlyOwner {
        productCount++;
        
        // Create a new array with initial capacity of 1
        string[] memory initialHistory = new string[](1);
        initialHistory[0] = string(abi.encodePacked("Created at ", _initialLocation));
        
        products[productCount] = Product({
            id: productCount,
            name: _name,
            currentLocation: _initialLocation,
            currentOwner: msg.sender,
            status: "Manufactured",
            history: initialHistory
        });

        emit ProductCreated(productCount, _name, msg.sender);
    }

    // Update product status and location
    function updateProduct(
        uint _id,
        string memory _newLocation,
        string memory _newStatus,
        address _newOwner
    ) public {
        require(_id > 0 && _id <= productCount, "Product does not exist");
        require(products[_id].currentOwner == msg.sender, "Not authorized");

        Product storage product = products[_id];
        product.currentLocation = _newLocation;
        product.status = _newStatus;
        product.currentOwner = _newOwner;

        string memory historyEntry = string(
            abi.encodePacked(
                "Moved to ",
                _newLocation,
                ", Status: ",
                _newStatus,
                ", Owner: ",
                addressToString(_newOwner)
            )
        );
        product.history.push(historyEntry);

        emit ProductUpdated(_id, _newLocation, _newStatus, _newOwner);
    }

    // Helper function to convert address to string
    function addressToString(address _addr) private pure returns (string memory) {
        bytes32 value = bytes32(uint256(uint160(_addr)));
        bytes memory alphabet = "0123456789abcdef";
        bytes memory str = new bytes(42);
        str[0] = "0";
        str[1] = "x";
        for (uint i = 0; i < 20; i++) {
            str[2 + i * 2] = alphabet[uint8(value[i + 12] >> 4)];
            str[3 + i * 2] = alphabet[uint8(value[i + 12] & 0x0f)];
        }
        return string(str);
    }

    // Get product details
    function getProduct(uint _id) public view returns (
        uint id,
        string memory name,
        string memory currentLocation,
        address currentOwner,
        string memory status,
        string[] memory history
    ) {
        require(_id > 0 && _id <= productCount, "Product does not exist");
        Product memory product = products[_id];
        return (
            product.id,
            product.name,
            product.currentLocation,
            product.currentOwner,
            product.status,
            product.history
        );
    }
}