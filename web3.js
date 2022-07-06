const Web3 = require("web3");
const MyContract = require("./build/contracts/MyContract.json");
const dotenv = require("dotenv");
dotenv.config();

const main = async () => {
  const web3 = new Web3(process.env.JSON_RPC_RELAY_URL);
  const account = web3.eth.accounts.privateKeyToAccount(
    process.env.ETH_PRIVATE_KEY
  );
  web3.eth.defaultAccount = account.address;
  const contract = new web3.eth.Contract(
    MyContract.abi,
    process.env.CONTRACT_ADDRESS
  );
  web3.eth.accounts.wallet.add(account);
  console.log("Address", account.address);
  const balance = await web3.eth.getBalance(account.address);
  console.log(
    "Account balance",
    Web3.utils.fromWei(balance.toString()),
    "Hbar"
  );

  let result = await contract.methods.getData().call();
  console.log("GetData", result);

  const randomNumber = Math.round(Math.random() * 100);
  console.log("SetData", randomNumber);
  contract.methods
    .setData(randomNumber)
    .send({
      from: account.address,
      gas: 4000000,
    })
    .on("receipt", (receipt) => {
      console.log("Transaction hash", receipt.transactionHash);
      console.log(
        "Block number",
        "https://testnet.mirrornode.hedera.com/api/v1/blocks/" +
          receipt.blockNumber
      );

      contract.methods
        .getData()
        .call()
        .then((result) => {
          console.log("GetData", result);
        });
    })
    .on("error", (err) => {
      console.log(err);
    });
};

main();
