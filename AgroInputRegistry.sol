//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AgroInputRegistry {
    // Struct to represent an agricultural input
    struct AgroInput {
        address owner;
        string name;
        string description;
        uint256 quantity;
        bool isRegistered;
        string authenticityProof; // Proof of authenticity
    }

    // Mapping to store agro inputs by their identifiers
    mapping(bytes32 => AgroInput) public agroInputs;

    // Event to log agro input registration
    event AgroInputRegistered(bytes32 indexed id, address indexed owner, string name, string description, uint256 quantity);

    // Modifier to restrict access to the owner of an agro input
    modifier onlyOwner(bytes32 id) {
        require(agroInputs[id].owner == msg.sender, "Only owner can perform this action");
        _;
    }

    // Function to register a new agro input
    function registerAgroInput(bytes32 id, string memory name, string memory description, uint256 quantity, string memory authenticityProof) external {
        require(!agroInputs[id].isRegistered, "Agro input already registered");
        agroInputs[id] = AgroInput(msg.sender, name, description, quantity, true, authenticityProof);
        emit AgroInputRegistered(id, msg.sender, name, description, quantity);
    }

    // Function to transfer ownership of an agro input
    function transferAgroInput(bytes32 id, address newOwner) external onlyOwner(id) {
        agroInputs[id].owner = newOwner;
    }

    // Function to verify the authenticity of an agro input
    function verifyAgroInputAuthenticity(bytes32 id, string memory providedProof) external view returns (bool) {
        return keccak256(abi.encodePacked(agroInputs[id].authenticityProof)) == keccak256(abi.encodePacked(providedProof));
    }
}
