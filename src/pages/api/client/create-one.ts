import {NextApiRequest, NextApiResponse} from 'next'
import {definePensionDataValidationSchema} from '@/core/validation/define-pension'
import {IClientData} from '@/core/types'

export default function createOneClient (req: NextApiRequest, res: NextApiResponse) {
  const userData = req.body as IClientData
  const validationData = definePensionDataValidationSchema.safeParse(userData)

  if(!validationData.success) {
    console.log(validationData.error)
    return res.status(400).json({error: `Wrong user info was sent! Error message: ${validationData.error}`})
  }



  return res.status(200).json({message: 'Success!'})
}