const { utils, ethers } = require("ethers");
const MyContract = require("./build/contracts/SampleNFT.json");
const dotenv = require("dotenv");
dotenv.config();

const main = async () => {
  const contractAddress = process.env.ERC721_ADDRESS;
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.JSON_RPC_RELAY_URL
  );
  const signer = new ethers.Wallet(process.env.ETH_PRIVATE_KEY, provider);
  console.log("Address", signer.address);
  const balance = await provider.getBalance(signer.address);
  console.log("Account balance", ethers.utils.formatEther(balance), "Hbar");

  const contract = new ethers.Contract(contractAddress, MyContract.abi, signer);

  let value = await contract.name();
  console.log("Name", value.toString());

  value = await contract.balanceOf(signer.address);
  console.log("balanceOf", value.toString());

  //   value = await contract.ownerOf(1);
  //   console.log("ownerOf", value.toString());

  const result = await contract.awardItem(contractAddress, "URL");
  const response = await result.wait();
  console.log(response);
  console.log("Gas Used", response.gasUsed.toString());
  console.log("Transaction hash", response.transactionHash);
  console.log(
    "Block number",
    "https://testnet.mirrornode.hedera.com/api/v1/blocks/" +
      response.blockNumber
  );

  value = await contract.balanceOf(contractAddress);
  console.log("balanceOf", value.toString());
  //   value = await contract.getData();
  //   console.log("GetData", value.toString());
};

main();
