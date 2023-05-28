// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract FamilyFund {
    uint private share;
    uint8 private round;
    uint8 private membersCount;
    bool private isFundActive;
    address private owner;
    address payable[] private members; //changed
    address payable[] private remains;
    mapping(address => mapping(uint8 => bool)) private paidShares; //each user in each round
    mapping(address => uint8) private winners; //map each address to round of win

    constructor(uint8 _membersCount, uint _share) {
        require(_membersCount>1, "Fund must at least 2 member!");
        membersCount = _membersCount;
        share = _share;
        owner = msg.sender;
        isFundActive = true;
        round = 1;
    }

    function addMember(address payable _newMember) public OwnerOnly {
        require(isFundActive == true, "Fund is closed!");
        require(findMember(_newMember) == false, "Already added!");
        require(members.length < membersCount, "No empty space!");
        members.push(_newMember);
    }

    function payShare() payable public {
        require(findMember(msg.sender) == true, "Not a member!");
        require(
            paidShares[msg.sender][round - 1] == false,
            "Already paid in this round"
        );
        require(msg.value == share, "Payment value is not valid!");
        paidShares[msg.sender][round - 1] = true;
    }

    function chooseWinner() public OwnerOnly {
        require(isFundActive == true, "Fund is closed!");
        require(members.length == membersCount, "Some members not added yet!");
        require(isAllPaidInRound() == true, "All members must paid in round!");

        delete remains;
        for (uint8 i = 0; i < members.length; i++)
            if (winners[members[i]] == 0)
                remains.push(members[i]);

        if (remains.length == 1) {
            // this is the last winner
            weHaveAWinner(remains[0]);
            isFundActive = false;
        } else if (remains.length > 1) {
            //we need more round
            uint winnerIndex = chooseRandom(remains.length);
            weHaveAWinner(members[winnerIndex]);
            round++;
        } else revert("Something bad is happened!");
    }

    modifier OwnerOnly() {
        require(msg.sender == owner, "Sender not authorized");
        _;
    }

    function findMember(address _address) private view returns (bool) {
        for (uint8 i = 0; i < members.length; i++) {
            if (members[i] == _address) {
                return true;
            }
        }
        return false;
    }

    function isAllPaidInRound() private view returns (bool) {
        for (uint8 i = 0; i < members.length; i++)
            if (paidShares[members[i]][round - 1] == false) return false;
        return true;
    }

    function chooseRandom(uint _count) private view returns (uint) {
        return uint((block.prevrandao + block.timestamp) % _count);
    }

    function weHaveAWinner(address payable _winner) private {
        winners[_winner] = round;
        payable(_winner).transfer(address(this).balance);
    }
}