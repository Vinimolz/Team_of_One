# Blockchain Supply Chain Tracking System 🛠️

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Solidity](https://img.shields.io/badge/Solidity-%5E0.8.0-363636.svg)](https://soliditylang.org/)

A decentralized application (DApp) demonstrating how blockchain technology enhances transparency and traceability in supply chain operations.

## 📑 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Demo Workflow](#demo-workflow)
- [Academic Context](#academic-context)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## 🌟 Overview
This project implements a blockchain-based supply chain tracking system. It enables participants (manufacturers, distributors, retailers, and inspectors) to create, transfer, and track products across the supply chain. The system ensures an immutable record of each product's journey, fostering transparency and trust among stakeholders.

## 🚀 Features
- 🏭 **Product Creation**: Authorized manufacturers can create products.
- 🔄 **Ownership Transfer**: Seamless transfer between supply chain participants.
- 📍 **Real-Time Tracking**: Monitor product location and status.
- 📜 **Audit Trail**: Access a complete history of product movements.
- 👤 **Role-Based Interactions**: Supports manufacturer, distributor, retailer, and inspector roles.
- 🔐 **MetaMask Integration**: Secure participant authentication.

## 🛠️ Technology Stack
| Component           | Technology         |
|--------------------|--------------------|
| Smart Contract     | Solidity (^0.8.0)  |
| Local Blockchain   | Hardhat            |
| Frontend           | HTML, CSS, JavaScript |
| Web3 Integration   | Ethers.js          |
| Wallet             | MetaMask           |

## 🏁 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) and npm
- [MetaMask](https://metamask.io/) browser extension

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/blockchain-supply-chain.git
   cd blockchain-supply-chain
   npm install
   npx hardhat node
   npx hardhat run scripts/test.js --network localhost
2. Open application and MetaMask wallet browser extension.
4. Connect to hardhat local network
5. Create four users using the keys provided by hardhat
6. have fun
7. Connect front end to deployed smart contract with given address

## 📖 Usage
Connect MetaMask and select the appropriate account for your role (e.g., manufacturer, distributor).
Enter the deployed contract address in the frontend application.
As a manufacturer, create products.
Transfer ownership and update status as products move through the supply chain.
View the complete history of any product to verify its journey.
## 📂 Project Structure
contracts/SupplyChain.sol: Smart contract for product tracking.
scripts/test.js: Deployment script for Hardhat.
frontend/: Web interface for blockchain interaction.
## 🎥 Demo Workflow
Manufacturer creates a new product.
Manufacturer transfers ownership to Distributor.
Distributor updates location and status.
Inspector verifies product information.
Distributor transfers to Retailer.
Consumer verifies the complete product history.
## 🎓 Academic Context
This project was developed for CECS 574 - Distributed Computing to demonstrate blockchain technology's application in supply chain management.
