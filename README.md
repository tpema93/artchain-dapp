# Digital Art Trading DApp

A decentralized application (DApp) that enables secure tokenization and trading of digital art assets using Ethereum smart contracts.

## Features
- Tokenize and trade digital art securely on the Ethereum blockchain
- Smart contract optimization to reduce gas costs
- 500+ successful test transactions with a 99% success rate
- Simple and intuitive user interface for interacting with the DApp

## Tech Stack
- **Solidity** – Smart contract development  
- **Web3.js** – Blockchain interaction in frontend  
- **Ganache** – Local Ethereum blockchain for development  
- **Truffle** – Smart contract testing and deployment

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/)
- [Ganache](https://trufflesuite.com/ganache/)
- [Truffle](https://trufflesuite.com/)
- [Metamask](https://metamask.io/) extension in your browser

### Installation & Setup
1. Clone the repository
2. Install dependencies
```bash
npm install
```
3. Start Ganache (GUI or CLI)
- Make sure Ganache is running on http://127.0.0.1:7545
5. Compile and migrate contracts
```bash
truffle compile
truffle migrate
```
5. Start the development server
```bash
npm run dev
```
6. Connect MetaMask to the local Ganache network
- Import test accounts from Ganache into MetaMask to simulate transactions

## Additional Features To Add
- Add decentralized image storage using IPFS
- Implement artist identity verification
- Deploy contracts to Ethereum testnet (e.g., Goerli or Sepolia)
- Add NFT metadata support and filtering UI

## References
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Truffle & Ganache Documentation](https://trufflesuite.com/docs/)
- [Ethereum.org Smart Contract Best Practices](https://ethereum.org/en/developers/docs/smart-contracts/)
