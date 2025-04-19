const hre = require("hardhat");

async function main() {
  console.log("Deploying SupplyChain contract...");
  
  // Get the Contract Factory
  const SupplyChain = await hre.ethers.getContractFactory("SupplyChain");
  
  // Deploy the contract
  const supplyChain = await SupplyChain.deploy();
  
  // Wait for deployment to finish
  await supplyChain.waitForDeployment();
  
  // Get the deployed contract address
  const supplyChainAddress = await supplyChain.getAddress();
  
  console.log(`SupplyChain deployed to: ${supplyChainAddress}`);
  console.log("Deployment complete!");
}

// Execute the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });