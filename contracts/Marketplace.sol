// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ConcertTicket.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract Marketplace is IERC721Receiver, Ownable {
    ConcertTicket public concertTicket;
    uint256 public platformFeePercentage;

    event TicketSold(uint256 indexed tokenId, address indexed buyer, uint256 price);

    constructor(address concertTicketAddress) {
        concertTicket = ConcertTicket(concertTicketAddress);
        platformFeePercentage = 300; // 3% in basis points (10000 basis points = 100%)
    }

    function buyTicket(uint256 tokenId) public payable {
        uint256 ticketPrice = concertTicket.ticketPrices(tokenId);
        uint256 platformFee = (ticketPrice * platformFeePercentage) / 10000; // Calculate the platform fee
        uint256 sellerProceeds = ticketPrice - platformFee;

        require(msg.value >= ticketPrice, "Insufficient payment.");

        address ticketOwner = concertTicket.ownerOf(tokenId);
        concertTicket.safeTransferFrom(ticketOwner, msg.sender, tokenId);

        // Transfer the platform fee to the owner of the contract (platform owner)
        payable(owner()).transfer(platformFee);
        // Transfer the remaining amount to the seller
        payable(ticketOwner).transfer(sellerProceeds);

        // Decrease the number of available tickets
       concertTicket.decreaseAvailableTickets(tokenId);

        emit TicketSold(tokenId, msg.sender, ticketPrice);
    }

    function onERC721Received(address, address, uint256, bytes calldata) public pure override returns (bytes4) {
        return this.onERC721Received.selector;
    }
}

