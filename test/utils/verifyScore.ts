import { Task } from "../../src/types"

/***********************************************************
//  same as verifyScore in utils/verify.ts
************************************************************/
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
