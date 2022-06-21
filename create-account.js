const {
  Client,
  PrivateKey,
  Hbar,
  TransferTransaction,
} = require("@hashgraph/sdk");
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  //Grab your Hedera testnet account ID and private key from your .env file
  const myAccountId = process.env.OPERATOR_ID;
  const myPrivateKey = process.env.OPERATOR_KEY;

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

  //Create new keys
  const newAccountPrivateKey = await PrivateKey.generateECDSA();
  const publicKey = newAccountPrivateKey.publicKey;

  // Assuming that the target shard and realm are known.
  // For now they are virtually always 0 and 0.
  const aliasAccountId = publicKey.toAccountId(0, 0);
  console.log("account alias", aliasAccountId.toString());

  const sendHbar = await new TransferTransaction()
    .addHbarTransfer(myAccountId, Hbar.from(-1000)) //Sending account
    .addHbarTransfer(aliasAccountId, Hbar.from(1000)) //Receiving account
    .execute(client);
  const transactionReceipt = await sendHbar.getReceipt(client);

  console.log(
    "The transfer transaction from my account to the new account was: " +
      transactionReceipt.status.toString()
  );

  console.log(
    "new account private key(raw)",
    newAccountPrivateKey.toStringRaw()
  );
  console.log("new account private key", newAccountPrivateKey.toString());
  console.log(
    "new account public key",
    newAccountPrivateKey.publicKey.toStringRaw()
  );
}
main();
