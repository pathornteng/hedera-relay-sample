const { ContractCreateFlow, Client } = require("@hashgraph/sdk");
const dotenv = require("dotenv");
const MyContract = require("./build/contracts/MyContract.json");
dotenv.config();

const main = async () => {
  //Grab your Hedera testnet account ID and private key from your .env file
  const myAccountId = process.env.OPERATOR_ID;
  const myPrivateKey = process.env.OPERATOR_KEY;

  const bytecode = MyContract.bytecode.replace("0x", "");

  // If we weren't able to grab it, we should throw a new error
  if (myAccountId == null || myPrivateKey == null) {
    throw new Error(
      "Environment variables myAccountId and myPrivateKey must be present"
    );
  }

  // Create our connection to the Hedera network
  // The Hedera JS SDK makes this really easy!
  const client = Client.forTestnet();

  client.setOperator(myAccountId, myPrivateKey);
  console.log("Deploying a smart contract to Hedera Network");
  const contractCreate = new ContractCreateFlow()
    .setGas(4000000)
    .setBytecode(bytecode);

  //Sign the transaction with the client operator key and submit to a Hedera network
  const txResponse = contractCreate.execute(client);
  //Get the receipt of the transaction
  const receipt = (await txResponse).getReceipt(client);
  //Get the new contract ID
  const newContractId = (await receipt).contractId;
  console.log("The new contract ID is " + newContractId);
  console.log(
    "The new contract address",
    "0x" + newContractId.toSolidityAddress()
  );
};

main();
