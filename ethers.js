const { ethers } = require("ethers");
const MyContract = require("./build/contracts/MyContract.json");
const dotenv = require("dotenv");
dotenv.config();

const main = async () => {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.JSON_RPC_RELAY_URL
  );
  const signer = new ethers.Wallet(process.env.ETH_PRIVATE_KEY, provider);
  console.log("Address", signer.address);
  const balance = await provider.getBalance(signer.address);
  console.log("Account balance", ethers.utils.formatEther(balance), "Hbar");
  const contract = new ethers.Contract(contractAddress, MyContract.abi, signer);
  let value = await contract.getData();
  console.log("GetData", value.toString());
  let randomNumber = Math.round(Math.random() * 100);
  console.log("SetData", randomNumber);
  const result = await contract.setData(randomNumber, {
    gasPrice: ethers.utils.parseUnits("1300", "gwei"),
    gasLimit: 1000000,
  });
  const response = await result.wait();
  console.log("Transaction hash", response.transactionHash);
  console.log(
    "Block number",
    "https://testnet.mirrornode.hedera.com/api/v1/blocks/" +
      response.blockNumber
  );
  value = await contract.getData();
  console.log("GetData", value.toString());
};

main();
