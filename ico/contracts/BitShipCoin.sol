pragma solidity ^0.4.19;

import 'zeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

contract BitShipCoin is MintableToken {
    string public name = "BitShipCoin";
    string public symbol = "BSC";
    uint8 public decimals = 18;
}
