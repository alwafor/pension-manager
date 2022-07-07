export type TInvalidityGroup = 'Первая' | 'Вторая/Третья'

export interface IDefinePensionData {
  surname: string
  name: string
  patronymic: string

  gender: 'М' | 'Ж'
  age: number
  workExperience: number

  isInvalidity: boolean
  isLossOfBreadwinner: boolean

  isTeacher: boolean
  isHealthWorker: boolean
  isCulturalWorker: boolean
  isSocialWorker: boolean

  invalidityGroup?: TInvalidityGroup
  invalidityAge?: number
  invalidityCertificateText?: string

  breadwinnerSurname?: string
  breadwinnerName?: string
  breadwinnerPatronymic?: string

  breadwinnerGender?: 'М' | 'Ж'
  breadwinnerAge?: number
  breadwinnerWorkExperience?: number

  breadwinnerCertificateText?: string
}

export interface IAvailablePensions {
  age?: true
  invalidity?: true
  experience?: true
  breadwinnerLoss?: true
}