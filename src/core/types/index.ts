export type TInvalidityGroup = 'Первая' | 'Вторая/Третья'

// todo provide id here
export interface IShortClientData {
  surname: string
  name: string
  patronymic: string

  gender: 'М' | 'Ж'
  age: number
  workExperience: number

  isInvalidity: boolean
  isLossOfBreadwinner: boolean
}

export interface IShortClientDataWithId extends IShortClientData{
  id: number
}

export interface IClientData extends IShortClientData {
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

export interface IClientDataWithId extends IClientData{
  id: number
}

export interface IAvailablePensions {
  age?: true
  invalidity?: true
  experience?: true
  breadwinnerLoss?: true
}

//todo add I letter later
export interface ResultServerResponse {
  message: string
  isError?: true
}