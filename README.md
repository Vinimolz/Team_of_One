Blockchain Supply Chain Tracking System
A decentralized application (DApp) demonstrating how blockchain technology can enhance transparency and traceability in supply chain operations.
Overview
This project implements a blockchain-based supply chain tracking system that allows different participants (manufacturer, distributor, retailer, and inspector) to create, transfer, and track products throughout the supply chain. The system provides an immutable record of each product's journey, enhancing transparency and trust among all stakeholders.
Features

Product creation by authorized manufacturers
Ownership transfer between supply chain participants
Real-time tracking of product location and status
Complete audit trail of product history
Role-based interactions (manufacturer, distributor, retailer, inspector)
MetaMask integration for participant authentication

Technology Stack

Smart Contract: Solidity
Local Blockchain: Hardhat
Frontend: HTML, CSS, JavaScript
Web3 Integration: Ethers.js
Wallet: MetaMask

Getting Started
Prerequisites

Node.js and npm
MetaMask browser extension

Installation

Clone the repository:
git clone https://github.com/yourusername/blockchain-supply-chain.git
cd blockchain-supply-chain

Install dependencies:
npm install

Start the local Hardhat network:
npx hardhat node

Deploy the smart contract:
npx hardhat run scripts/test.js --network localhost

Open the frontend application and connect to the deployed contract address.

Usage

Connect to MetaMask and select the appropriate account for the role you want to simulate.
Enter the deployed contract address in the application.
Create products as the manufacturer.
Transfer ownership and update status as products move through the supply chain.
View the complete history of any product to verify its journey.

Project Structure

contracts/SupplyChain.sol: Smart contract for product tracking
scripts/test.js: Deployment script for Hardhat
frontend/: Web interface for interacting with the blockchain

Demo Workflow

Manufacturer creates a new product
Manufacturer transfers ownership to Distributor
Distributor updates location and status
Inspector verifies product information
Distributor transfers to Retailer
Consumer verifies complete product history

Academic Context
This project was developed for CECS 574 - Distributed Computing to demonstrate the application of blockchain technology in supply chain management.
License
MIT
Acknowledgments

OpenZeppelin for the Ownable contract implementation
Hardhat development environment
Ethers.js for blockchain interaction
