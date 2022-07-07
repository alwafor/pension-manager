import {NextApiRequest, NextApiResponse} from 'next'
import {IClientData, ResultServerResponse} from '@/core/types'
import {prismaClient} from '@/core/backend/prisma'

export default async function getOneClient(req: NextApiRequest, res: NextApiResponse<ResultServerResponse | IClientData>) {
  const {id} = req.query

  if(!id) {
    return res.status(400).json({isError: true, message: `Id клиента не был предоставлен!`})
  }

  const user = await prismaClient.client.findFirst({where: {id: +id}})
  if(!user) {
    return res.status(400).json({isError: true, message: 'Пользователя с заданным id не существует!'})
  }

  return res.status(200).json(user as IClientData)
}