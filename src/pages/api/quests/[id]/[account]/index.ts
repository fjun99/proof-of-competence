import type { NextApiRequest, NextApiResponse } from 'next'
import { getQuests } from 'services/quests'
import { ApiResponseData, Quest,  Task } from 'types'
import { tryGetValidAddress } from 'utils/web3'
import { verifyScore } from "utils/verify"

type ResponseData = {
  address: string
  score: number
  maxScore: number
  quest: Quest
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponseData<ResponseData>>) {
  const id = req.query.id as string
  if (!id) {
    res.status(405).json({ code: 405, message: 'quest id not provided.' })
    return
  }
  
  const account = req.query.account as string
  if (!account) {
    res.status(405).json({ code: 405, message: 'account not provided.' })
    return
  }

  const address = await tryGetValidAddress(account)
  if (!address) {
    res.status(400).json({ code: 400, message: 'account not valid.' })
    return
  }

  const quest = getQuests().find(i => i.id.toLowerCase() === id.toLowerCase())
  if (!quest) {
    res.status(404).json({ code: 404, message: `quest ${id} not found.` })
    return
  }

  const maxScore = quest.tasks.map(i => i.points).reduce((acc, i) => acc + i, 0)
  // const score = await verifyQuestScore(quest, address)

  let scoresum = 0
  await Promise.all(quest.tasks.map(async (task: Task) => {
    const result = await verifyScore(task, address)
    task.result =  result

    if (result && typeof result === 'boolean') {
      scoresum += task.points
    }
    if (result && typeof result === 'number') {
      scoresum += result
    }
  }))

  const score = scoresum

  // console.log(quest)

  if (quest) {
    res.status(200).json({
      code: 200,
      message: '',
      data: {
        address,
        score,
        maxScore,
        quest
      }
    })
  }
}
