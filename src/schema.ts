import {gql} from "apollo-server-express";
import {isOperatorApprovedByUsersForCollection} from "./utils";
import {THE_OTHERSIDE_CONTRACT_ADDR, TRANSFER_MANAGER_ERC721_CONTRACT_ADDR} from "./constants";

// Construct a schema, using GraphQL schema language
export const typeDefs = gql`
  type UsersApproval {
    userAddr: String,
    isApproved: Boolean
  }

  type Query {
    hello: String,
  }

  type Mutation {
    verifyCollectionApproval(userAddressList: [String!]): [UsersApproval]
  }`
;

export const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
  Mutation: {
    verifyCollectionApproval: (_, args) => {
      return isOperatorApprovedByUsersForCollection(
        THE_OTHERSIDE_CONTRACT_ADDR,
        TRANSFER_MANAGER_ERC721_CONTRACT_ADDR,
        args.userAddressList
      )
    },
  }
};
