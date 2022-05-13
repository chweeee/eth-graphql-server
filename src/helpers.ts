import 'dotenv/config'
import axios from "axios";
import {ethers} from "ethers";

/**
 *
 * @param contractAddr
 *
 * returns the ABI of ${contractAddr} via the etherscan API
 */
export const getContractABI = async (
  contractAddr: string
) : Promise<Object[]|Error> => {
  const apiKey = process.env.ETHERSCAN_API_KEY;
  const baseUrl = "http://api.etherscan.io";
  const endpointPath = `/api?module=contract&action=getabi&address=${contractAddr}&apikey=${apiKey}`;
  const queryUrl = `${baseUrl}${endpointPath}`;
  // console.log(queryUrl);

  try {
    const resp = await axios.get(queryUrl);
    if(resp.data.status != 1 ) {
      return Error(`invalid status code ${resp.data.status} returned`);
    }

    const contractABI = JSON.parse(resp.data.result);
    if (!(contractABI instanceof Array)){
      return Error(`invalid ABI returned`);
    } else {
      return contractABI;
    }
  } catch (err) {
    return Error(err);
  }
}

/**
 *
 * @param jsonRpcProvider
 * @param userInput
 *
 * returns true if input is a valid address or ENS name, else false
 */
export const validateAddress = async (
  jsonRpcProvider: ethers.providers.JsonRpcProvider,
  userInput: string
) : Promise<boolean> => {
  try {
    const userInputResolved = await jsonRpcProvider.resolveName(userInput);
    if (userInputResolved == null) {
      //console.log(`Failed to resolve userInput: ${userInput}`);
      return false;
    } else {
      return true;
    }
  } catch (err) {
    //console.log(`userInput is not a valid address: ${userInput}`)
    return false;
  }
}
