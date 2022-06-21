// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MyContract {
    uint256 data;

    constructor() {
        data = 10;
    }

    function getData() external view returns (uint256) {
        return data;
    }

    function setData(uint256 _data) external {
        data = _data;
    }

    function setDataPrivate(uint256 _data) private {
        data = _data + 10;
    }
}
