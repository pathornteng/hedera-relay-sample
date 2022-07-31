// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MyContract {
    uint256 data;
    event SetData(uint256 _value);

    constructor() {
        data = 10;
    }

    function getData() external view returns (uint256) {
        return data;
    }

    function setData(uint256 _data) external {
        data = _data;
        emit SetData(_data);
    }

    function setDataPrivate(uint256 _data) private {
        data = _data + 10;
    }

    event Deployed(address addr, uint256 salt);

    function deploy(bytes memory code, uint256 salt) public {
        address addr;
        assembly {
            addr := create2(0, add(code, 0x20), mload(code), salt)
            if iszero(extcodesize(addr)) {
                revert(0, 0)
            }
        }

        emit Deployed(addr, salt);
    }
}
