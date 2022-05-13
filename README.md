# User Guide

## Background
This graphql server exposes an endpoint for users to query if an `EOA` has approved the `TransferManagerERC721` contract for the [**Otherdeed**](https://looksrare.org/collections/0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258?queryID=aded01fce8f6c29a1b3281b3dc8bc291&queryIndex=prod_tokens) collection.



## Starting the GraphQL Server
1. At the root of the repository, install all dependencies:
```
npm install
```
2. Start the server with the following command:
```
npm run dev
```
3. Upon successfully starting the server, it can be accessed via the following URL:
```
http://localhost:4000/graphql
```

## Running Unit tests
Unit tests have been written for the several important functions and can be run via the following command:
```
npm run test
```

# Sample Mutation and Response

1. The query takes in a list of `EOA` and returns a corresponding boolean value for each input address.
2. Mutation will return an error so as there's at least one invalid address.
3. Mutation supports ENS domains as well.

### Example Query
```json
mutation {
  verifyCollectionApproval(userAddressList: [
    "dingaling.eth",
    "0x54BE3a794282C030b15E43aE2bB182E14c409C5e",
    "0x09AdFab2635dcb681FADA41CeB0bfa6f52EFfd97"
  ]){
    userAddr,
    isApproved
  }
}
```
### Example Response
```json
{
  "data": {
    "verifyCollectionApproval": [
      {
        "userAddr": "dingaling.eth",
        "isApproved": false
      },
      {
        "userAddr": "0x54BE3a794282C030b15E43aE2bB182E14c409C5e",
        "isApproved": false
      },
      {
        "userAddr": "0x09AdFab2635dcb681FADA41CeB0bfa6f52EFfd97",
        "isApproved": true
      }
    ]
  }
}
```
