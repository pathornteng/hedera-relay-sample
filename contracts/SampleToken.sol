// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract SampleToken is ERC20 {
    string data = "test";

    constructor() ERC20("Gold", "GLD") {
        _mint(msg.sender, 100000000000000000000); //mint 100 GLD
    }

    function transfer2(
        address to,
        uint256 amount,
        string memory myString
    ) public virtual returns (bool) {
        data = myString;
        return transfer(to, amount);
    }
}
