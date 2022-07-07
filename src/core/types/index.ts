export type TInvalidityGroup = 'Первая' | 'Вторая/Третья'

export interface IClientData {
  surname: string
  name: string
  patronymic: string

  gender: 'М' | 'Ж'
  age: number
  workExperience: number

  isInvalidity: boolean
  isLossOfBreadwinner: boolean

  profession: 'none' | 'teacher' | 'healthWorker' | 'culturalWorker' | 'socialWorker'

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