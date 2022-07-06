import React from 'react'
import {FieldErrors} from 'react-hook-form'
import {IForm} from '@/pages/define-pension'
import s from '@/components/pages/define-pension/index.module.scss'
import FieldBlock from '@/components/ui/field-block'
import classNames from 'classnames'
import Button from '@/components/ui/button'

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
      <FieldBlock className={s.fieldBlock} title="Фамилия" error={errors.surname?.message}>
        <input type="text" {...register('surname')} />
      </FieldBlock>

      <FieldBlock className={s.fieldBlock} title="Имя" error={errors.name?.message}>
        <input type="text" {...register('name')} />
      </FieldBlock>

      <FieldBlock className={s.fieldBlock} title="Отчество" error={errors.patronymic?.message}>
        <input type="text" {...register('patronymic')} />
      </FieldBlock>

      <div className={s.row3}>
        <FieldBlock className={s.fieldBlock} title="Возраст" error={errors.age?.message}>
          <input
            type="number"
            {...register('age', {valueAsNumber: true})}
          />
        </FieldBlock>

        <FieldBlock className={s.fieldBlock}
                    title="Стаж работы"
                    error={errors.workExperience?.message}
        >
          <input
            type="number"
            {...register('workExperience', {valueAsNumber: true})}
          />
        </FieldBlock>

        <FieldBlock className={s.fieldBlock} title="Пол" error={errors.gender?.message}>
          <select {...register('gender')} defaultValue="М">
            <option value="М">Мужской</option>
            <option value="Ж">Женский</option>
          </select>
        </FieldBlock>
      </div>

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