// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

// Import ERC-721 token standard
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract ArtChain is ERC721 {
    address payable public artist;
    uint public royaltyPercentage;
    uint public secondaryRoyaltyPercentage;
    mapping (address => bool) public affiliates; //mapping to keep track of approved affiliates
    mapping (uint => address) public tokenBuyer; //mapping to keep track of token buyers
    uint256 private _currentTokenId = 0; //counter to keep track of current token ID
    
    // Events
    event NFTCreated(uint tokenId, address to); //when a new NFT is created
    event OwnershipTransferred(uint tokenId, address from, address to, uint royaltyAmount); //when ownership of a NFT is transferred
    event CommissionPaid(uint tokenId, address affiliate, uint commissionAmount); //when a commission is paid
    
    // Constructor function that sets the name, symbol, artist, and royalty percentage of the NFT
    constructor(string memory _name, string memory _symbol, address payable _artist, uint _royaltyPercentage, uint _secondaryRoyaltyPercentage) ERC721(_name, _symbol) {
        artist = _artist;
        royaltyPercentage = _royaltyPercentage;
        secondaryRoyaltyPercentage = _secondaryRoyaltyPercentage;
    }
    
    // Function to create a new NFT which can only be called by the artist
    function createNFT(address _to) public {
        require(msg.sender == artist, "Only artist can create NFT");
        _currentTokenId += 1;
        _mint(_to, _currentTokenId);
        emit NFTCreated(_currentTokenId, _to);
    }

    // Function to transfer ownership of a NFT which can only be called by the owner or an approved address
    function transferOwnership(address _to, uint _tokenId) public payable {
        require(_isApprovedOrOwner(msg.sender, _tokenId), "Only owner or approved address can transfer ownership");
        safeTransferFrom(msg.sender, _to, _tokenId);

        // Calculate and distribute royalty to the artist
        uint royaltyAmount = (msg.value * secondaryRoyaltyPercentage) / 100;
        artist.transfer(royaltyAmount);
        emit OwnershipTransferred(_tokenId, msg.sender, _to, royaltyAmount);
    }

    // Function to pay commission to affiliates
    function payCommission(uint _tokenId, address _buyer) public payable {
        require(affiliates[msg.sender], "Only affiliates can earn commission");
        require(ownerOf(_tokenId) != msg.sender, "Cannot self-refer");
        uint commissionAmount = (msg.value * royaltyPercentage) / 100;

        // Convert msg.sender to an address payable
        address payable recipient = payable(address(uint160(msg.sender)));

        recipient.transfer(commissionAmount);
        uint royaltyAmount = msg.value - commissionAmount;
        artist.transfer(royaltyAmount); // Send remaining value to the artist
        transferFrom(ownerOf(_tokenId), _buyer, _tokenId);
        tokenBuyer[_tokenId] = _buyer; // Update buyer mapping
        emit CommissionPaid(_tokenId, msg.sender, commissionAmount);
    }



    // Function to add an affiliate which can only be called by the artist
    function addAffiliate(address _affiliate) public {
        require(msg.sender == artist, "Only artist can add affiliates");
        affiliates[_affiliate] = true;
    }
    
    // Function to remove an affiliate which can only be called by the artist
    function removeAffiliate(address _affiliate) public {
        require(msg.sender == artist, "Only artist can remove affiliates");
        affiliates[_affiliate] = false;
    }
    
    // Function to return the buyer of a specific token
    function getBuyerOfToken(uint _tokenId) public view returns(address) {
        return tokenBuyer[_tokenId];
    }

    // Function to change the artist
    function changeArtist(address payable newArtist) public {
        require(msg.sender == artist, "Only artist can change artist");
        artist = newArtist;
    }
}
