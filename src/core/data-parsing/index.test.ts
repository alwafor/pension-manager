import {IDefinePensionData} from '@/pages/define-pension'
import {definePensionTypes, IAvailablePensions, isValidInvalidity} from './index'

const pensionDataForInvalidityAndExperience: IDefinePensionData = {
    surname: 'Зубенко',
    name: 'Михаил',
    patronymic: 'Петрович',

    gender: 'М',
    age: 50,
    workExperience: 30,

    isInvalidity: true,
    isLossOfBreadwinner: false,

    isTeacher: true,
    isHealthWorker: false,
    isCulturalWorker: false,
    isSocialWorker: false,

    invalidityGroup: 'Первая',
    invalidityAge: 10,
    invalidityCertificateText: 'eiwj foijew ioffjewoi fjewiofj opiaewwjfp oiewajfopiaewj fpoieaaw',

    breadwinnerSurname:undefined,
    breadwinnerName:undefined,
    breadwinnerPatronymic:undefined,

    breadwinnerGender: undefined,
    breadwinnerAge:undefined,
    breadwinnerWorkExperience:undefined,

    breadwinnerCertificateText:undefined,
}

const pensionDataBreadwinnerLoss: IDefinePensionData = {
  surname: 'Зубенко',
  name: 'Михайла',
  patronymic: 'Петровна',

  gender: 'Ж',
  age: 22,
  workExperience: 0,

  isInvalidity: false,
  isLossOfBreadwinner: true,

  isTeacher: false,
  isHealthWorker: false,
  isCulturalWorker: false,
  isSocialWorker: false,

  invalidityGroup: undefined,
  invalidityAge: undefined,
  invalidityCertificateText: undefined,

  breadwinnerSurname: 'Петров',
  breadwinnerName: 'Валерий',
  breadwinnerPatronymic: 'Валерьевич',

  breadwinnerGender: 'М',
  breadwinnerAge: 70,
  breadwinnerWorkExperience: 40,

  breadwinnerCertificateText: 'jweoijrewoitjaeowpittjewpaoi iowaejtoi ejwatoi jewaopi  tjeawoi  j',
}

const pensionDataAge: IDefinePensionData = {
  surname: 'Зубенко',
  name: 'Михайла',
  patronymic: 'Петровна',

  gender: 'М',
  age: 61,
  workExperience: 16,

  isInvalidity: false,
  isLossOfBreadwinner: false,

  isTeacher: false,
  isHealthWorker: false,
  isCulturalWorker: false,
  isSocialWorker: false,

  invalidityGroup: undefined,
  invalidityAge: undefined,
  invalidityCertificateText: undefined,

  breadwinnerSurname: 'Петров',
  breadwinnerName: 'Валерий',
  breadwinnerPatronymic: 'Валерьевич',

  breadwinnerGender: 'М',
  breadwinnerAge: 70,
  breadwinnerWorkExperience: 40,

  breadwinnerCertificateText: 'jweoijrewoitjaeowpittjewpaoi iowaejtoi ejwatoi jewaopi  tjeawoi  j',
}

const noPensionData1: IDefinePensionData = {
  surname: 'Зубенко',
  name: 'Михайла',
  patronymic: 'Петровна',

  gender: 'М',
  age: 50,
  workExperience: 8,

  isInvalidity: true,
  isLossOfBreadwinner: true,

  isTeacher: false,
  isHealthWorker: false,
  isCulturalWorker: false,
  isSocialWorker: false,

  invalidityGroup: 'Первая',
  invalidityAge: 50,
  invalidityCertificateText: undefined,

  breadwinnerSurname: 'Петров',
  breadwinnerName: 'Валерий',
  breadwinnerPatronymic: 'Валерьевич',

  breadwinnerGender: 'Ж',
  breadwinnerAge: 70,
  breadwinnerWorkExperience: 12,

  breadwinnerCertificateText: 'jweoijrewoitjaeowpittjewpaoi iowaejtoi ejwatoi jewaopi  tjeawoi  j',
}

const invalidityAndExperienceAvailabled: IAvailablePensions = {
  invalidity: true,
  experience: true
}

const breadwinnerLossAvailabled: IAvailablePensions = {
  breadwinnerLoss: true
}

const ageAvailabled: IAvailablePensions = {
  age: true
}

describe('define pension correct', () => {
  it('should work for multiple pensions', function () {
    expect(definePensionTypes(pensionDataForInvalidityAndExperience)).toEqual(invalidityAndExperienceAvailabled)
  })

  it('should work for breadwinner loss', function () {
    expect(definePensionTypes(pensionDataBreadwinnerLoss)).toEqual(breadwinnerLossAvailabled)
  })

  it('should work for age pension', function () {
    expect(definePensionTypes(pensionDataAge)).toEqual(ageAvailabled)
  })

  it('should not work bad data', function () {
    expect(definePensionTypes(noPensionData1)).toEqual({})
  })
})

describe('age and expe with invalidity correct', () => {
  it('should be true', function () {
    expect(isValidInvalidity('Первая', 54, 10)).toEqual(true)
    expect(isValidInvalidity('Вторая/Третья', 41, 18)).toEqual(true)
    expect(isValidInvalidity('Вторая/Третья', 23, 1)).toEqual(true)
  })

  it('should be false', function () {
    expect(isValidInvalidity('Первая', 22, 0)).toEqual(false)
    expect(isValidInvalidity('Вторая/Третья', 39, 7)).toEqual(false)
    expect(isValidInvalidity('Вторая/Третья', 57, 13)).toEqual(false)
  })
})