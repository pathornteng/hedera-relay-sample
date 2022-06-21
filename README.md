# Hedera-relay-sample

This repositorhy contains a set of sample code that uses various type of libraries such as hashgraph sdk, web3, ethersjs, truffle, etc to interact with JSON RPC relay server of Hedera Network.

## Setup & Install

```bash
git clone git@github.com:pathornteng/hedera-relay-sample.git
cd hedera-relay-sample
npm install
```

## Configuration

To run the sample code, there are a few environment variables that need to be configured

```bash
OPERATOR_KEY < the private key of an account on Hedera TestNet
OPERATOR_ID < The account id on Hedera TestNet

ETH_PRIVATE_KEY < the private key (ECDSA) of an account on TestNet (this account needs to have alias)
CONTRACT_ADDRESS < EVM address of a smart contract
JSON_RPC_RELAY_URL < JSON RPC relay url
```

## Create an ECDSA account with alias

Hedera JSON RPC relay requires an ECDSA account with an alias. This type of account must be created through Hedera SDK at the moment. To create an account, run the following command

```bash
node create-accoount.js
```

## Contract Deployment

There are two ways to deploy a Solidity smart contract to Hedera Network.

1. Use Hashgraph SDK to deploy a Solidity smart contract

```bash
node deploy.js
```

2. Use TruffleJS to deploy a Solidity smart contract

```bash
truffle migrate
```

## Interact with JSON RPC relay

Two popular libraies that can be used to interact with a smart contract are web3js and ethersjs. This repo contains code demonstrating how to use these libraries to interact with smart contract.

```bash
node web3.js
node ethers.js
```
