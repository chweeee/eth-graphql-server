import { assert } from 'chai';
import 'mocha';
import {validateAddress} from "../src/helpers";
import {ethers} from "ethers";
import {rpc_url} from "../src/constants";

describe('test address validation', function () {

  it('valid ENS address', async function(done) {
    this.timeout(10000);
    setTimeout(done, 10000);

    const userInput = "dingaling.eth";
    validateAddress(
      new ethers.providers.JsonRpcProvider(rpc_url) ,
      userInput,
    ).then(function (res) {
      assert.equal(res, true);
    });
    done();
  });

  it('invalid ENS address', async function(done) {
    this.timeout(10000);
    setTimeout(done, 10000);

    const userInput = "someRandomString";
    validateAddress(
      new ethers.providers.JsonRpcProvider(rpc_url) ,
      userInput,
    ).then(function (res) {
      assert.equal(res, false);
    });
    done();
  });

  it('invalid number of characters', async function(done) {
    this.timeout(10000);
    setTimeout(done, 10000);

    const userInput = "0x54BE3a794282C030b15E43aE2bB182E14c409C5eA";
    validateAddress(
      new ethers.providers.JsonRpcProvider(rpc_url) ,
      userInput,
    ).then(function (res) {
      assert.equal(res, false);
    });
    done();
  });

  it('invalid casing', async function(done) {
    this.timeout(10000);
    setTimeout(done, 10000);

    const userInput = "0x54BE3a794282C030b15E43aE2bB182E14c409C5E";
    validateAddress(
      new ethers.providers.JsonRpcProvider(rpc_url) ,
      userInput,
    ).then(function (res) {
      assert.equal(res, false);
    });
    done();
  });
});
