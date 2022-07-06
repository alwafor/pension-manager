import React from 'react'
import {FieldErrors} from 'react-hook-form'
import {IDefinePensionData} from '@/pages/define-pension'
import s from '@/components/pages/define-pension/index.module.scss'
import FieldBlock from '@/components/ui/field-block'
import classNames from 'classnames'
import Button from '@/components/ui/button'
import {MainFormpartReuse} from '@/components/pages/define-pension/form/main-formpart-reusable'
import MainImagepartReusable from '@/components/pages/define-pension/form/main-imagepart-reusable'

interface IProps {
  register: Function
  errors: FieldErrors<IDefinePensionData>
  defineBooleanButtonStyle: Function,
  setValue: Function,

  isInvalidity: boolean
  isLossOfBreadwinner: boolean
  setImgInvalidityLoadProgress: Function,
  setImgBreadwinnerLoadProgress: Function
}

export const MainSection: React.FC<IProps> = ({
                                                register,
                                                setValue,
                                                errors,
                                                defineBooleanButtonStyle,
                                                setImgInvalidityLoadProgress,
                                                setImgBreadwinnerLoadProgress,
                                                isInvalidity,
                                                isLossOfBreadwinner
                                              }) => {

  const setDefaultsToInvalidity = () => {
    setValue('isInvalidity', true)

    setValue('invalidityAge', 16)
    setValue('invalidityGroup', 'Первая')
    setValue('invalidityCertificateText', '')
    setImgInvalidityLoadProgress(false)
  }

  const invalidateInvalidityFields = () => {
    setValue('isInvalidity', false)
    // invalidate invalidity fields
    setValue('invalidityAge', undefined)
    setValue('invalidityGroup', undefined)
    setValue('invalidityCertificateText', undefined)
    setImgInvalidityLoadProgress(undefined)
  }

  const setDefaultsToBreadwinner = () => {
    setValue('isLossOfBreadwinner', true)

    setValue('breadwinnerSurname', '')
    setValue('breadwinnerName', '')
    setValue('breadwinnerPatronymic', '')
    setValue('breadwinnerGender', 'М')
    setValue('breadwinnerAge', 0)
    setValue('breadwinnerWorkExperience', 0)
  }

  const invalidateBreadwinnerFields = () => {
    setValue('isLossOfBreadwinner', false)
    // invalidate breadwinner fields
    setValue('breadwinnerSurname', undefined)
    setValue('breadwinnerName', undefined)
    setValue('breadwinnerPatronymic', undefined)
    setValue('breadwinnerGender', undefined)
    setValue('breadwinnerAge', undefined)
    setValue('breadwinnerWorkExperience', undefined)

    setImgBreadwinnerLoadProgress(undefined)
  }

  return <div className={s.bigRow}>
    <div className={s.bigRowColWide}>

      <MainFormpartReuse errors={errors} register={register} fieldsData={{
        surname: 'surname',
        name: 'name',
        patronymic: 'patronymic',
        gender: 'gender',
        age: 'age',
        workExperience: 'workExperience',
      }}/>

      <div className={s.row2}>
        <FieldBlock className={classNames(s.fieldBlock, s.textAlignCenter)} title={'Инвалидность'}>
          <div className={s.flexEvenly}>
            <Button
              className={defineBooleanButtonStyle(isInvalidity)}
              onClick={setDefaultsToInvalidity}
            >
              Да
            </Button>
            <Button
              className={defineBooleanButtonStyle(!isInvalidity)}
              onClick={invalidateInvalidityFields}
            >
              Нет
            </Button>
          </div>
        </FieldBlock>
        <FieldBlock
          title={'По потере кормильца'}
          className={classNames(s.fieldBlock, s.textAlignCenter)}
        >
          <div className={s.flexEvenly}>
            <Button
              className={defineBooleanButtonStyle(isLossOfBreadwinner)}
              onClick={setDefaultsToBreadwinner}
            >
              Да
            </Button>
            <Button
              className={defineBooleanButtonStyle(!isLossOfBreadwinner)}
              onClick={invalidateBreadwinnerFields}
            >
              Нет
            </Button>
          </div>
        </FieldBlock>
      </div>
    </div>
    <div className={s.bigRowColNarrow}>
      <MainImagepartReusable/>
    </div>
  </div>
}