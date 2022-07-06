import {IDefinePensionData, TInvalidityGroup} from '@/pages/define-pension'

export interface IAvailablePensions {
  age?: true
  invalidity?: true
  experience?: true
  breadwinnerLoss?: true
}

export function definePensionTypes(data: IDefinePensionData): any {

  const result: IAvailablePensions = {}

  const {
    gender,
    age,
    workExperience,
    isInvalidity,
    isLossOfBreadwinner
  } = data

  // 4
  if (isLossOfBreadwinner && age <= 23 && workExperience === 0) {
    const {
      breadwinnerGender,
      breadwinnerAge,
      breadwinnerWorkExperience
    } = data as Required<IDefinePensionData>

    if (breadwinnerWorkExperience >= 15) {
      if (breadwinnerGender === 'М' && breadwinnerAge >= 60) {
        result.breadwinnerLoss = true
      }
      if (breadwinnerGender === 'Ж' && breadwinnerAge >= 55) {
        result.breadwinnerLoss = true
      }
    }

    return result
  }

  //1
  if (workExperience >= 15) {
    if (gender === 'М' && age >= 60) {
      result.age = true
    }
    if (gender === 'Ж' && age >= 55) {
      result.age = true
    }
  }

  //2
  if (isInvalidity) {

    const {
      invalidityGroup,
      invalidityAge
    } = data as Required<IDefinePensionData>

    if (isValidInvalidity(invalidityGroup, invalidityAge, workExperience)) {
      result.invalidity = true
    }
  }

  //3
  if (workExperience >= 25 && (data.isTeacher ||
    data.isHealthWorker ||
    data.isCulturalWorker ||
    data.isSocialWorker)) {
    result.experience = true
  }

  return result
}

export function isValidInvalidity(invalidityGroup: TInvalidityGroup, age: number, experience: number) {
  if (invalidityGroup === 'Первая') {
    switch (experience) {
      case 1:
        return age <= 25
      case 2:
        return age <= 28
      case 3:
        return age <= 31
      case 4:
        return age <= 34
      case 5:
        return age <= 37
      case 6:
        return age <= 40
      case 7:
        return age <= 43
      case 8:
        return age <= 48
      case 9:
        return age <= 53
      case 10:
        return age <= 59
    }
    return experience >= 10
  }
  switch (experience) {
    case 1:
      return age <= 23
    case 2:
      return age <= 26
    case 3:
      return age <= 28
    case 4:
      return age <= 31
    case 5:
      return age <= 33
    case 6:
      return age <= 35
    case 7:
      return age <= 37
    case 8:
      return age <= 39
    case 9:
      return age <= 42
    case 10:
      return age <= 45
    case 11:
      return age <= 48
    case 12:
      return age <= 51
    case 13:
      return age <= 55
    case 14:
      return age <= 59
  }
  return experience >= 14
}