import { expect } from 'chai';
// import { Contract } from 'ethers';
import { MockProvider } from 'ethereum-waffle';
import { Task, Quest } from "../../src/types"
import { join } from 'path'
import  fs  from 'fs'

/*************************************
//  verifyScore in utils/verify.ts
*************************************/
export async function verifyScore(task: Task, address?: string | null) {
  if (!address) return false

  if (!Array.isArray(task.verifier)) {
    const module = await import(`../../src/verifiers/${task.verifier.id}`)
    const result: boolean | number = await module.verify(task, task.verifier, address)

    return result
  }

  const results = await Promise.all(task.verifier.map(async i => {
    const module = await import(`../../src/verifiers/${i.id}`)
    const result: boolean | number = await module.verify(task, i, address)

    return typeof result === 'number' ? result > 0 : result
  }))

  return results.some(i => i)
}


const filename = 'testquest.json'
const fullPath = join(__dirname, filename)

const content = fs.readFileSync(fullPath, 'utf8')
if (!content) {
    console.log('File has no content..', filename)
}

let quest = JSON.parse(content) as Quest 
quest.id = filename.replace('.json', '')

describe('verifier - has-ETH', () => {
  // const [wallet, walletTo] = new MockProvider().getWallets();
  // let token: Contract;

//   beforeEach(async () => {
//     token = await deployContract(wallet, BasicToken, [1000]);
//   });

  it('should return true', async () => {
    const address = '0xF0DA8606a337fe16bd1F8845CeE85079AC702300'
    expect(await verifyScore(quest.tasks[0],address)).to.be.true;
    expect(await verifyScore(quest.tasks[1],address)).to.be.true;
    expect(await verifyScore(quest.tasks[2],address)).to.be.true;
    expect(await verifyScore(quest.tasks[3],address)).to.be.true;

  });

  it('should return false', async () => {
    const address = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
    expect(await verifyScore(quest.tasks[0],address)).to.be.false;
    expect(await verifyScore(quest.tasks[1],address)).to.be.false;
    expect(await verifyScore(quest.tasks[2],address)).to.be.false;
    expect(await verifyScore(quest.tasks[3],address)).to.be.false;

  });

});

//Error: Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; 
// if returning a Promise, ensure it resolves. 
//(/Users/fangjun/python/proof-of-competence/test/has-ETh/has-ETH.test.ts)

//    "test": "env TS_NODE_COMPILER_OPTIONS='{\"module\": \"commonjs\" }' mocha --timeout 10000"
