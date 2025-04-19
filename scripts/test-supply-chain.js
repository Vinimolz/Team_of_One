const hre = require("hardhat");
const fs = require("fs");

async function main() {
  console.log("\n===== BLOCKCHAIN SUPPLY CHAIN DEMO =====");
  console.log("Demonstrating distributed consensus across supply chain nodes\n");

  // Deploy the contract for demo purposes
  console.log("STEP 1: Deploying Smart Contract (shared ledger)...");
  const SupplyChain = await hre.ethers.getContractFactory("SupplyChain");
  const supplyChain = await SupplyChain.deploy();
  await supplyChain.waitForDeployment();
  const contractAddress = await supplyChain.getAddress();
  console.log(`Contract deployed to: ${contractAddress}`);
  console.log("This address is visible to all participants on the network\n");

  // Get accounts to simulate different supply chain participants
  const [manufacturer, distributor, retailer, inspector] = await hre.ethers.getSigners();
  
  console.log("STEP 2: Supply Chain Participants (network nodes)");
  console.log(`Manufacturer: ${manufacturer.address.substring(0, 10)}...`);
  console.log(`Distributor:  ${distributor.address.substring(0, 10)}...`);
  console.log(`Retailer:     ${retailer.address.substring(0, 10)}...`);
  console.log(`Inspector:    ${inspector.address.substring(0, 10)}...\n`);

  // Record all events for analysis
  let demoLog = [];
  
  // STEP 3: Create products
  console.log("STEP 3: Manufacturer creates products (writing to blockchain)");
  const products = [
    { name: "Laptop Model X", location: "Factory Shanghai" },
    { name: "Smartphone Pro", location: "Factory Shenzhen" }
  ];
  
  for (let i = 0; i < products.length; i++) {
    const tx = await supplyChain.connect(manufacturer).createProduct(
      products[i].name, 
      products[i].location
    );
    await tx.wait();
    console.log(`Product ${i+1} created: ${products[i].name}`);
    
    demoLog.push({
      action: "Product Created",
      productId: i+1,
      actor: "Manufacturer",
      timestamp: new Date().toISOString()
    });
  }
  console.log();
  
  // STEP 4: Verify consensus - all participants can see the same data
  console.log("STEP 4: Demonstrating Consensus - All participants view the same product");
  const participants = [
    { name: "Manufacturer", signer: manufacturer },
    { name: "Distributor", signer: distributor },
    { name: "Retailer", signer: retailer },
    { name: "Inspector", signer: inspector }
  ];
  
  // Check product 1 from all participants
  for (const participant of participants) {
    console.log(`\n${participant.name} querying Product 1...`);
    const product = await supplyChain.connect(participant.signer).getProduct(1);
    console.log(`- Name: ${product[1]}`);
    console.log(`- Location: ${product[2]}`);
    console.log(`- Status: ${product[4]}`);
    console.log(`- History: ${product[5][0]}`);
  }
  
  // STEP 5: Move product through supply chain
  console.log("\nSTEP 5: Moving product through supply chain");
  
  // Manufacturer → Distributor
  console.log("\nManufacturer shipping to distributor...");
  let tx = await supplyChain
    .connect(manufacturer)
    .updateProduct(1, "Distribution Center", "In Transit", distributor.address);
  await tx.wait();
  
  demoLog.push({
    action: "Product Transferred",
    productId: 1,
    actor: "Manufacturer",
    recipient: "Distributor",
    timestamp: new Date().toISOString()
  });
  
  // Quality check by inspector
  console.log("Inspector verifying product quality...");
  const product = await supplyChain.connect(inspector).getProduct(1);
  console.log(`Inspector sees product at: ${product[2]}`);
  console.log(`Current status: ${product[4]}`);
  
  // Distributor → Retailer
  console.log("\nDistributor shipping to retailer...");
  tx = await supplyChain
    .connect(distributor)
    .updateProduct(1, "Retail Store", "Ready for Sale", retailer.address);
  await tx.wait();
  
  demoLog.push({
    action: "Product Transferred",
    productId: 1,
    actor: "Distributor",
    recipient: "Retailer",
    timestamp: new Date().toISOString()
  });

  // STEP 6: Final state - view full history
  console.log("\nSTEP 6: Viewing complete product history from blockchain");
  const finalProduct = await supplyChain.connect(retailer).getProduct(1);
  
  console.log(`\nProduct ID: ${finalProduct[0]}`);
  console.log(`Name: ${finalProduct[1]}`);
  console.log(`Current Location: ${finalProduct[2]}`);
  console.log(`Current Owner: ${finalProduct[3]}`);
  console.log(`Status: ${finalProduct[4]}`);
  console.log("\nComplete History Trail:");
  
  finalProduct[5].forEach((entry, i) => {
    console.log(`${i+1}. ${entry}`);
  });
  
  // STEP 7: Demonstrate immutability and trustworthiness
  console.log("\nSTEP 7: Demonstrating blockchain immutability");
  console.log("Attempt by non-owner to manipulate product details...");
  
  try {
    await supplyChain
      .connect(manufacturer)
      .updateProduct(1, "Fake Location", "Counterfeit", manufacturer.address);
    console.log("WARNING: Manipulation successful!");
  } catch (error) {
    console.log("✓ Transaction rejected - Only current owner can update product");
    console.log("✓ Blockchain integrity maintained");
  }
  
  // Save demo activity log
  fs.writeFileSync('demo-log.json', JSON.stringify(demoLog, null, 2));
  console.log("\nDemo log saved to demo-log.json");
  
  console.log("\n===== DEMO COMPLETE =====");
  console.log("Key blockchain benefits demonstrated:");
  console.log("1. Distributed consensus - all participants see the same data");
  console.log("2. Immutable history - complete audit trail preserved");
  console.log("3. Permissioned access - only authorized updates allowed");
  console.log("4. Transparency - full visibility across supply chain");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

/**const hre = require("hardhat");

async function main() {
  // Replace with your deployed contract address
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  // Get two accounts to simulate different nodes/users
  const [manufacturer, distributor] = await hre.ethers.getSigners();
  console.log("Manufacturer address:", manufacturer.address);
  console.log("Distributor address:", distributor.address);

  // Connect to the deployed contract
  const SupplyChain = await hre.ethers.getContractFactory("SupplyChain");
  const supplyChain = SupplyChain.attach(contractAddress);

  // Step 1: Manufacturer creates a product
  console.log("\nCreating product...");
  const createTx = await supplyChain.connect(manufacturer).createProduct("Laptop", "Factory A");
  await createTx.wait(); // Wait for transaction to be mined
  console.log("Product created with ID 1");

  // Step 2: Manufacturer queries the product
  console.log("\nManufacturer querying product ID 1...");
  let product = await supplyChain.connect(manufacturer).getProduct(1);
  console.log("From Manufacturer:");
  console.log(`ID: ${product[0]}`);
  console.log(`Name: ${product[1]}`);
  console.log(`Location: ${product[2]}`);
  console.log(`Status: ${product[4]}`);
  console.log(`Owner: ${product[3]}`);
  console.log(`History: ${product[5].join(", ")}`);

  // Step 3: Distributor queries the same product
  console.log("\nDistributor querying product ID 1...");
  product = await supplyChain.connect(distributor).getProduct(1);
  console.log("From Distributor:");
  console.log(`ID: ${product[0]}`);
  console.log(`Name: ${product[1]}`);
  console.log(`Location: ${product[2]}`);
  console.log(`Status: ${product[4]}`);
  console.log(`Owner: ${product[3]}`);
  console.log(`History: ${product[5].join(", ")}`);

  // Step 4: Manufacturer updates the product
  console.log("\nManufacturer updating product ID 1...");
  const updateTx = await supplyChain
    .connect(manufacturer)
    .updateProduct(1, "Warehouse B", "Shipped", distributor.address);
  await updateTx.wait(); // Wait for transaction to be mined
  console.log("Product updated");

  // Step 5: Manufacturer queries the updated product
  console.log("\nManufacturer querying updated product ID 1...");
  product = await supplyChain.connect(manufacturer).getProduct(1);
  console.log("From Manufacturer (after update):");
  console.log(`ID: ${product[0]}`);
  console.log(`Name: ${product[1]}`);
  console.log(`Location: ${product[2]}`);
  console.log(`Status: ${product[4]}`);
  console.log(`Owner: ${product[3]}`);
  console.log(`History: ${product[5].join(", ")}`);

  // Step 6: Distributor queries the updated product
  console.log("\nDistributor querying updated product ID 1...");
  product = await supplyChain.connect(distributor).getProduct(1);
  console.log("From Distributor (after update):");
  console.log(`ID: ${product[0]}`);
  console.log(`Name: ${product[1]}`);
  console.log(`Location: ${product[2]}`);
  console.log(`Status: ${product[4]}`);
  console.log(`Owner: ${product[3]}`);
  console.log(`History: ${product[5].join(", ")}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
  **/