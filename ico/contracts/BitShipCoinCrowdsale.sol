pragma solidity ^0.4.19;

import 'zeppelin-solidity/contracts/crowdsale/price/IncreasingPriceCrowdsale.sol';
import 'zeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol';
import './BitShipCoin.sol';

contract BitShipCoinCrowdsale is IncreasingPriceCrowdsale, MintedCrowdsale {
    function BitShipCoinCrowdsale(
        uint256 _openingTime,
        uint256 _closingTime,
        uint256 _initialRate,
        uint256 _finalRate,
        address _wallet,
        MintableToken _token
    ) public
        Crowdsale(_initialRate, _wallet, _token)
        TimedCrowdsale(_openingTime, _closingTime)
        IncreasingPriceCrowdsale(_initialRate, _finalRate)
    {

    }
}
