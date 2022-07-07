import {NextApiRequest, NextApiResponse} from 'next'
import {definePensionDataValidationSchema} from '@/core/validation/define-pension'
import {IClientData, ResultServerResponse} from '@/core/types'
import {prismaClient} from '@/core/backend/prisma'

export default async function createOneClient(req: NextApiRequest, res: NextApiResponse<ResultServerResponse>) {

  const userData = req.body as IClientData
  const validationData = definePensionDataValidationSchema.safeParse(userData)

  if (!validationData.success) {
    console.log(validationData.error)
    return res.status(400).json({
      message: `Была получена не верная информация о клиенте! Текст ошибки: ${validationData.error}`,
      isError: true
    })
  }

  const client = await prismaClient.client.create({
    data: {
      ...userData
    }
  })


  return res.status(200).json({message: 'Клиент успешно добавлен в базу данных!'})
}