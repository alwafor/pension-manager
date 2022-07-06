import React from 'react'
import {FieldErrors} from 'react-hook-form'
import {IForm} from '@/pages/define-pension'
import s from '@/components/pages/define-pension/index.module.scss'
import FieldBlock from '@/components/ui/field-block'
import classNames from 'classnames'
import Button from '@/components/ui/button'
import {MainFormpartReuse} from '@/components/pages/define-pension/form/main-formpart-reusable'

interface IProps {
  register: Function
  errors: FieldErrors<IForm>
  defineBooleanButtonStyle: Function,
  setValue: Function,

  isInvalidity: boolean
  isLossOfBreadwinner: boolean
  setImgInvalidityLoadProgress: Function
}

export const MainSection: React.FC<IProps> = ({
                                                register,
                                                setValue,
                                                errors,
                                                defineBooleanButtonStyle,
                                                setImgInvalidityLoadProgress,
                                                isInvalidity,
                                                isLossOfBreadwinner
                                              }) => {

  const setInvalidityFalse = () => {
    setValue('isInvalidity', false)
    // reset invalidity values
    setValue('invalidityAge', undefined)
    setValue('invalidityGroup', undefined)
    setValue('invalidityCertificateText', undefined)
    setImgInvalidityLoadProgress(false)
  }

  // todo implement later
  const onLoadImageButtonClick = () => {
    console.log('clicked!')
  }

  const imgOldMan = `https://avatars.mds.yandex.net/i?id=2f2d0179fbf1ae2244b37d7543a6b66e-5887733-images-thumbs&n=13`

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
              onClick={() => setValue('isInvalidity', true)}
            >
              Да
            </Button>
            <Button
              className={defineBooleanButtonStyle(!isInvalidity)}
              onClick={setInvalidityFalse}
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
              onClick={() => setValue('isLossOfBreadwinner', true)}
            >
              Да
            </Button>
            <Button
              className={defineBooleanButtonStyle(!isLossOfBreadwinner)}
              onClick={() => setValue('isLossOfBreadwinner', false)}
            >
              Нет
            </Button>
          </div>
        </FieldBlock>
      </div>
    </div>

    <div className={s.bigRowColNarrow}>
      <div className={s.imageWrapper}>
        <img src={imgOldMan} alt="photo"/>
      </div>
      <Button
        className={s.buttonImageUpload}
        onClick={onLoadImageButtonClick}
      >
        Загрузить фотографию
      </Button>
    </div>
  </div>
}