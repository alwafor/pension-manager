import {IDefinePensionData} from '@/core/types'

export const formDefaultValues: Partial<IDefinePensionData> = {
  surname: 'Зубенко',
  name: 'Михаил',
  patronymic: 'Петрович',

  gender: 'М',
  age: 25,
  workExperience: 2,

  isInvalidity: false,
  isLossOfBreadwinner: false,

  invalidityGroup: undefined,
  invalidityAge: undefined,
  invalidityCertificateText: undefined,

  breadwinnerSurname: undefined,
  breadwinnerName: undefined,
  breadwinnerPatronymic: undefined,
  breadwinnerGender: undefined,
  breadwinnerAge: undefined,
  breadwinnerWorkExperience: undefined,
  breadwinnerCertificateText: undefined
}