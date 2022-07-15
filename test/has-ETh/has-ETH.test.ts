import  fs  from 'fs'
import { join } from 'path'
import { expect } from 'chai'
import { Task, Quest } from "../../src/types"
import { verifyScore } from '../utils/verifyScore'

const filename = 'testquest.json'
const fullPath = join(__dirname, filename)
const content = fs.readFileSync(fullPath, 'utf8')
const quest = JSON.parse(content) as Quest 


// ****************************** Note ******************************
// 1.  Prepare address with ETH in respective chains
// 2.  verifier will call chains through Alchemy
// ******************************************************************

describe('verifier - has-ETH', () => {
  
  it('should return true', async () => {
    const address = '0xF0DA8606a337fe16bd1F8845CeE85079AC702300'
    expect(await verifyScore(quest.tasks[0],address)).to.be.true
    expect(await verifyScore(quest.tasks[1],address)).to.be.true
    expect(await verifyScore(quest.tasks[2],address)).to.be.true
    expect(await verifyScore(quest.tasks[3],address)).to.be.true
  })

  it('should return false', async () => {
    const address = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
    expect(await verifyScore(quest.tasks[0],address)).to.be.false
    expect(await verifyScore(quest.tasks[1],address)).to.be.false
    expect(await verifyScore(quest.tasks[2],address)).to.be.false
    expect(await verifyScore(quest.tasks[3],address)).to.be.false
  })

})

//Error: Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; 
// if returning a Promise, ensure it resolves. 
//(/Users/fangjun/python/proof-of-competence/test/has-ETh/has-ETH.test.ts)
