// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

/*

    Account - > balance for user

    deposit() 
        - deposit money to contract
        - add balance to user's addr

    withdraw()
        - check if balance exists in msg.sender's balance
        - send amt to msg.sender
        - subtract amount from user's addr's balance

    transfer()
        - check if balance exists in msg.sender's balance
        - send amt to _to
        - subtract amount from user's addr's balance

    getBalance()
        - return balance of msg.sender
*/

contract OpenBank {

    // address -> balance
    mapping(address => uint256) balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
        console.log("%s deposited %s", msg.sender, msg.value);
    }

    function withdraw(uint _amount) public {
        require(_amount <= balances[msg.sender], "insufficient funds");
        (bool success, ) = msg.sender.call{value: _amount}("");
        console.log("%s withdrew: %s", msg.sender, _amount);
        require(success, "failed to send ether");
    }

    function transfer(address payable _to, uint _amount) public {
        require(_amount <= balances[msg.sender], "insufficient funds");
        (bool success, ) = _to.call{value: _amount}("");
        balances[msg.sender] -= _amount;
        console.log("%s sent %s to %s", msg.sender, _amount, _to);
        require(success, "failed to send ether");
    }

    function getBalance() view public returns (uint256) {
        return balances[msg.sender];
    }
}
