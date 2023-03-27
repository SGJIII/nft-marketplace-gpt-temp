// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ConcertTicket is ERC721, IERC2981, Ownable {
    uint256 private nextTokenId;
    uint256 private maxCommission = 1000; // 10% in basis points (10000 basis points = 100%)
    address public marketplaceAddress;
    string private _customBaseURI;

    mapping(uint256 => uint256) public ticketPrices;
    mapping(uint256 => string) public ticketNames;
    mapping(uint256 => uint256) public ticketCommissions; // in basis points
    mapping(uint256 => address) public royaltyReceivers;
    mapping(uint256 => uint256) public numOfTickets;

    event TicketMinted(uint256 indexed tokenId, address indexed owner, string name, uint256 price, uint256 commission);
    

   constructor(address _marketplaceAddress) ERC721("ConcertTicket", "CTK") {
    marketplaceAddress = _marketplaceAddress;
   }

    function setMarketplaceAddress(address _marketplaceAddress) public onlyOwner {
    marketplaceAddress = _marketplaceAddress;
    }

    function setBaseURI(string memory newBaseURI) public onlyOwner {
    _customBaseURI = newBaseURI;
}

    function _baseURI() internal view virtual override returns (string memory) {
    return bytes(_customBaseURI).length > 0 ? _customBaseURI : "https://api.example.com/tickets/";
}

    function mintTickets(string memory name, uint256 price, uint256 commission, uint256 numberOfTokens) public {
    require(commission <= maxCommission, "Commission must be 10% or less.");

    for (uint256 i = 0; i < numberOfTokens; i++) {
        uint256 tokenId = nextTokenId++;
        _mint(msg.sender, tokenId);
        ticketPrices[tokenId] = price;
        ticketNames[tokenId] = name;
        ticketCommissions[tokenId] = commission;
        royaltyReceivers[tokenId] = msg.sender;
        numOfTickets[tokenId] = numberOfTokens;
        emit TicketMinted(tokenId, msg.sender, name, price, commission);
       }
    }

    function decreaseAvailableTickets(uint256 tokenId) public {
    require(msg.sender == marketplaceAddress, "Only the marketplace can decrease available tickets.");
    require(numOfTickets[tokenId] > 0, "All tickets have been sold.");
    numOfTickets[tokenId]--;
    }

    function getNextTokenId() public view returns (uint256) {
    return nextTokenId;
    }

    function setTicketPrice(uint256 tokenId, uint256 price) public onlyOwner {
        ticketPrices[tokenId] = price;
    }

    function setTicketName(uint256 tokenId, string memory name) public onlyOwner {
        ticketNames[tokenId] = name;
    }

    function setTicketCommission(uint256 tokenId, uint256 commission) public onlyOwner {
        require(commission <= maxCommission, "Commission must be 10% or less.");
        ticketCommissions[tokenId] = commission;
    }

    function royaltyInfo(uint256 tokenId, uint256 salePrice) external view override returns (address receiver, uint256 royaltyAmount) {
        require(_exists(tokenId), "Token does not exist.");

        receiver = royaltyReceivers[tokenId];
        uint256 commission = ticketCommissions[tokenId];
        royaltyAmount = (salePrice * commission) / 10000; // Calculate the royalty amount as a percentage of the sale price
    }

    
}
