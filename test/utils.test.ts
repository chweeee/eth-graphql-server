import { assert } from 'chai';
import 'mocha';
import {THE_OTHERSIDE_CONTRACT_ADDR, TRANSFER_MANAGER_ERC721_CONTRACT_ADDR} from "../src/constants";
import {isApprovedForUser, isOperatorApprovedByUsersForCollection} from "../src/utils";

describe('test multicall', function() {

  it('1 valid input (non-ENS)', async function(done) {
    this.timeout(10000);
    setTimeout(done, 10000);

    const ownerAddrList = [
      "dingaling.eth"
    ];

    isOperatorApprovedByUsersForCollection(
      THE_OTHERSIDE_CONTRACT_ADDR,
      TRANSFER_MANAGER_ERC721_CONTRACT_ADDR,
      ownerAddrList
    ).then(function (res) {
      const expected: isApprovedForUser[] = [{
        userAddr: "0x54BE3a794282C030b15E43aE2bB182E14c409C5e",
        isApproved: false
      }];

      assert.deepEqual(res, expected);
    });

    done();
  });

  it('1 valid input (ENS)', async function(done) {
    this.timeout(10000);
    setTimeout(done, 10000);

    const ownerAddrList = [
      "dingaling.eth"
    ];

    isOperatorApprovedByUsersForCollection(
      THE_OTHERSIDE_CONTRACT_ADDR,
      TRANSFER_MANAGER_ERC721_CONTRACT_ADDR,
      ownerAddrList
    ).then(function (res) {
      const expected: isApprovedForUser[] = [{
        userAddr: "dingaling.eth",
        isApproved: false
      }];

      assert.deepEqual(res, expected);
    });

    done();
  });

  it('3 valid input (ENS + non-ENS)', async function(done) {
    this.timeout(10000);
    setTimeout(done, 10000);

    const ownerAddrList = [
      "dingaling.eth",
      "0x54BE3a794282C030b15E43aE2bB182E14c409C5e",
      "0x09AdFab2635dcb681FADA41CeB0bfa6f52EFfd97"
    ];

    isOperatorApprovedByUsersForCollection(
      THE_OTHERSIDE_CONTRACT_ADDR,
      TRANSFER_MANAGER_ERC721_CONTRACT_ADDR,
      ownerAddrList
    ).then(function (res) {
      const expected: isApprovedForUser[] = [
        {
          userAddr: "dingaling.eth",
          isApproved: false
        },
        {
          userAddr: "0x54BE3a794282C030b15E43aE2bB182E14c409C5e",
          isApproved: false
        },
        {
          userAddr: "0x09AdFab2635dcb681FADA41CeB0bfa6f52EFfd97",
          isApproved: true
        },
      ];

      assert.deepEqual(res, expected);
    });

    done();
  });

  it('1 invalid input', async function(done) {
    this.timeout(10000);
    setTimeout(done, 10000);

    const ownerAddrList = [
      "0x54BE3a794282C030b15E43aE2bB182E14c409C5e",
      "dingalingggg.eth",
      "0x09AdFab2635dcb681FADA41CeB0bfa6f52EFfd97"
    ];

    isOperatorApprovedByUsersForCollection(
      THE_OTHERSIDE_CONTRACT_ADDR,
      TRANSFER_MANAGER_ERC721_CONTRACT_ADDR,
      ownerAddrList
    ).then(function (res) {
      assert.equal(res, Error(`Invalid owner address: ${ownerAddrList[1]}`));
    });

    done();
  });

});
