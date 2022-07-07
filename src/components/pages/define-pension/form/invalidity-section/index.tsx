import React from 'react'
import s from '@/components/pages/define-pension/index.module.scss'
import FieldBlock from '@/components/ui/field-block'
import Button from '@/components/ui/button'
import {FieldErrors} from 'react-hook-form'
import {IClientData} from '@/core/types'


interface IProps {
  recognizeText: Function
  register: Function
  errors: FieldErrors<IClientData>
  loadStatus: string | undefined
}

const InvaliditySection = React.memo(React.forwardRef<HTMLInputElement, IProps>(({
                                                                                   recognizeText,
                                                                                   register,
                                                                                   errors,
                                                                                   loadStatus
                                                                                 }, ref) => {
  return <>
    <h2 className={s.title}>Данные об инвалидности</h2>
    <div className={s.flexBetween}>
      <FieldBlock className={s.fieldBlock}
                  title="Группа инвалидности"
                  error={errors.invalidityGroup?.message}
      >
        <select {...register('invalidityGroup')} defaultValue="Первая">
          <option value="Первая">Первая</option>
          <option value="Вторая/Третья">Вторая/Третья</option>
        </select>
      </FieldBlock>

      <FieldBlock className={s.fieldBlock}
                  title="Возраст получения"
                  error={errors.invalidityAge?.message}
      >
        <input
          type="number"
          {...register('invalidityAge', {valueAsNumber: true})}
        />
      </FieldBlock>
    </div>

    <FieldBlock className={s.fieldBlock} title="Справка о инвалидности" error={errors.invalidityCertificateText?.message}>
      <div className={s.fileUploadSection}>
        <div className={s.fileUploadSectionControlls}>
          <label className={s.fileUploadInput}>
            <input type="file" ref={ref}/>
            Выбрать документ
          </label>

          <Button
            onClick={() => recognizeText()}
            type="button"
            id="start"
          >
            Начать обработку
          </Button>
          <div className={s.loadProgress}>
            {loadStatus}
          </div>
        </div>
        <textarea {...register('invalidityCertificateText')} placeholder={'Текстовые данные со справки'}/>
      </div>
    </FieldBlock>
  </>
}))

InvaliditySection.displayName = 'InvaliditySection'
export default InvaliditySection