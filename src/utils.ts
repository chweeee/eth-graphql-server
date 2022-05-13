import 'dotenv/config'

import {rpc_url, THE_OTHERSIDE_CONTRACT_ADDR, TRANSFER_MANAGER_ERC721_CONTRACT_ADDR} from './constants';
import {ethers} from "ethers";
import {Call, Contract, Provider} from 'ethcall';
import {getContractABI, validateAddress} from "./helpers";

export interface isApprovedForUser {
  userAddr: string
  isApproved: boolean
}

/**
 *
 * @param ownerAddrList
 * @param approvalList
 *
 */
const formatResult = (
  ownerAddrList: string[],
  approvalList: boolean[]
) : isApprovedForUser[] => {
  const returnVal: isApprovedForUser[] = ownerAddrList.map((ownerAddr, i) => {
    const temp: isApprovedForUser = {
      userAddr: ownerAddr,
      isApproved: approvalList[i]
    }
    return temp;
  });

  return returnVal;
}

/**
 *
 * @param collectionAddr
 * @param operatorAddr
 * @param ownerAddrList
 *
 * For each user in <ownerAddrList>, check if has approved <operatorAddr> for <collectionAddr>
 */
export const isOperatorApprovedByUsersForCollection = async (
  collectionAddr: string,
  operatorAddr: string,
  ownerAddrList: string[]
) : Promise<isApprovedForUser[]|Error>=> {
  const jsonRpcProvider = new ethers.providers.JsonRpcProvider(rpc_url);
  const ethcallProvider = new Provider();
  await ethcallProvider.init(jsonRpcProvider);

  // 1. validate input addresses
  if (await validateAddress(jsonRpcProvider, collectionAddr) == false) {
    return Error(`Invalid collection address: ${collectionAddr}`);
  }

  if (await validateAddress(jsonRpcProvider, operatorAddr) == false) {
    return Error(`Invalid operator address: ${operatorAddr}`);
  }

  ownerAddrList.map(async (ownerAddr) => {
    if (await validateAddress(jsonRpcProvider, ownerAddr) == false) {
      return Error(`Invalid owner address: ${ownerAddr}`);
    }
  })

  // 2. perform contract calls
  const collectionContractABI = await getContractABI(collectionAddr)
  if (collectionContractABI instanceof Error) {
    return collectionContractABI
  } else {
    const collectionContractConn = new Contract(
      collectionAddr,
      collectionContractABI,
    );

    const callsUnresolved = ownerAddrList.map(async (ownerAddr) => {
      const ownerAddrResolved = await jsonRpcProvider.resolveName(ownerAddr);
      return collectionContractConn.isApprovedForAll(
        ownerAddrResolved,
        operatorAddr
      )
    });
    const callsResolved: Call[] = await Promise.all(callsUnresolved);

    const approvalList: boolean[] = await ethcallProvider.tryAll(callsResolved);

    return formatResult(
      ownerAddrList,
      approvalList
    );
  }
}
