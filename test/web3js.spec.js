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
    it("should get the account object when valid eth private key is provided", async function() {
        const account = web3.eth.accounts.privateKeyToAccount(process.env.ETH_PRIVATE_KEY);
        expect(Object.keys(account).length).to.equal(5);
        expect(account.address).to.equal('0xC2A3C271e2D133ea12ea2BC747fA0780da134136');
        expect(account.privateKey).to.equal(process.env.ETH_PRIVATE_KEY);
    })
});