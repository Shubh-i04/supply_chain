// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    address public owner;
    uint public productCount = 0;

    struct Product {
        uint id;
        string name;
        uint price;
        address payable owner;
        bool isSold;
    }

    mapping(uint => Product) public products;

    event ProductCreated(uint id, string name, uint price, address owner, bool isSold);
    event ProductPurchased(uint id, address newOwner);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this operation");
        _;
    }

    function createProduct(string memory _name, uint _price) public onlyOwner {
        productCount++;
        products[productCount] = Product(productCount, _name, _price, payable(msg.sender), false);
        emit ProductCreated(productCount, _name, _price, msg.sender, false);
    }

    function purchaseProduct(uint _productId) public payable {
        Product storage product = products[_productId];
        require(product.id > 0 && !product.isSold, "Product does not exist or is already sold");
        require(msg.value >= product.price, "Insufficient funds sent");

        product.owner.transfer(product.price);
        product.owner = payable(msg.sender);
        product.isSold = true;
        emit ProductPurchased(_productId, msg.sender);
    }
}