App = {
    web3: null,
    contracts: {},
    //development
    url:'http://127.0.0.1:7545',
    network_id:5777,
    supervisor:null,
    current_account:null,
    value:1000000000000000000,
    index:0,
    margin:10,
    left:15,
    init: function() {
      return App.initWeb3();
    },
  
    initWeb3: function() {         
      if (typeof web3 !== 'undefined') {
        App.web3 = new Web3(Web3.givenProvider);
      } else {
        App.web3 = new Web3(App.url);
      }
      ethereum.enable();      
      return App.initContract();
        
    },
  
    initContract: function() {
      // Get a copy of the contract
      $.getJSON('ArtChain.json', function(data) {
        var ArtChainArtifact = data;
        App.contracts.ArtChain = new App.web3.eth.Contract(ArtChainArtifact.abi);
  
        // Set the provider for our contract
        App.contracts.ArtChain.setProvider(App.web3.currentProvider);
  
        // Listen for events
        App.listenForEvents();
  
        return App.render();
      });
    },
  
    // Listen for events
    listenForEvents: function() {
      App.contracts.ArtChain.events.NFTCreated({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).on('data', function(event) {
        console.log('new NFT created', event);
        App.render();
      });
    },
  
    render: function() {
      var artChainInstance;
  
      App.web3.eth.getAccounts(function(error, accounts) {
        if (error) {
          console.log(error);
        }
  
        App.currentAccount = accounts[0];
  
        App.contracts.ArtChain.deployed().then(function(instance) {
          artChainInstance = instance;
  
          // Do something with the contract instance
        });
      });
    },
  
    createNFT: function() {
      App.contracts.ArtChain.deployed().then(function(instance) {
        return instance.createNFT(App.currentAccount, { from: App.currentAccount });
      }).then(function(result) {
        console.log('NFT created!', result);
      }).catch(function(err) {
        console.error(err);
      });
    },
  
    transferOwnership: function(to, tokenId) {
      App.contracts.ArtChain.deployed().then(function(instance) {
        return instance.transferOwnership(to, tokenId, { from: App.currentAccount });
      }).then(function(result) {
        console.log('Ownership transferred!', result);
      }).catch(function(err) {
        console.error(err);
      });
    },
  
    payCommission: function(tokenId, buyer) {
      App.contracts.ArtChain.deployed().then(function(instance) {
        return instance.payCommission(tokenId, buyer, { from: App.currentAccount });
      }).then(function(result) {
        console.log('Commission paid!', result);
      }).catch(function(err) {
        console.error(err);
      });
    },
  
    addAffiliate: function(affiliate) {
      App.contracts.ArtChain.deployed().then(function(instance) {
        return instance.addAffiliate(affiliate, { from: App.currentAccount });
      }).then(function(result) {
        console.log('Affiliate added!', result);
      }).catch(function(err) {
        console.error(err);
      });
    },
  
    removeAffiliate: function(affiliate) {
      App.contracts.ArtChain.deployed().then(function(instance) {
        return instance.removeAffiliate(affiliate, { from: App.currentAccount });
      }).then(function(result) {
        console.log('Affiliate removed!', result);
      }).catch(function(err) {
        console.error(err);
      });
    },

    changeArtist: function(newArtist, tokenId) {
        App.contracts.ArtChain.deployed().then(function(instance) {
          return instance.changeArtist(newArtist, tokenId, { from: App.currentAccount });
        }).then(function(result) {
          console.log('Artist changed!', result);
        }).catch(function(err) {
          console.error(err);
        });
      }
    };
    
    $(function() {
      $(window).load(function() {
        App.init();
      });
    });
    

    