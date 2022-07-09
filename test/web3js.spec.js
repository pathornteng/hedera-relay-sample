var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

const Web3 = require("web3");
const web3 = new Web3(process.env.JSON_RPC_RELAY_URL);

const MyContract = require("../build/contracts/MyContract.json");
const dotenv = require("dotenv");
dotenv.config();



describe("Web3js", function () {
    it("should reject if contract is called without setting an account", function() {
        expect(() => web3.eth.getBalance()).throws(/Provided address undefined is invalid/);
    });
    it("should get the account object when valid eth private key is provided", function () {
        const account = web3.eth.accounts.privateKeyToAccount(process.env.ETH_PRIVATE_KEY);
        expect(Object.keys(account).length).to.equal(5);
        expect(account.address).to.equal('0xC2A3C271e2D133ea12ea2BC747fA0780da134136');
        expect(account.privateKey).to.equal(process.env.ETH_PRIVATE_KEY);
    });
    it("should get the contract object if valid contract address is provided", function () {
        const contract = new web3.eth.Contract(MyContract.abi, process.env.CONTRACT_ADDRESS);
        expect(Object.keys(contract.methods).length).to.equal(6);
        expect(typeof contract.methods.getData).to.equal('function');
        expect(typeof contract.methods.setData).to.equal('function');
    });
    it("should reject if contract function is called without setting a provider", async function () {
        const account = web3.eth.accounts.privateKeyToAccount(process.env.ETH_PRIVATE_KEY);
        await expect(web3.eth.getBalance(account.address)).rejectedWith(/Provider not set or invalid/);
    });
});