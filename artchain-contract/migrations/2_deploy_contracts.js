var ArtChain = artifacts.require("ArtChain");

module.exports = function(deployer, network, accounts) {
    // Parameters for the constructor of ArtChain contract
    const _name = "ArtChain Token";
    const _symbol = "ACT";
    const _artist = accounts[0]; //first account from Ganache is the artist
    const _royaltyPercentage = 20; //20% royalty
    const _secondaryRoyaltyPercentage = 10; // 10% royalty for secondary sales
    deployer.deploy(ArtChain, _name, _symbol, _artist, _royaltyPercentage, _secondaryRoyaltyPercentage);
};

  