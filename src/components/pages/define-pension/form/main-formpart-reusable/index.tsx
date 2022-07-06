import React from 'react'
import FieldBlock from '@/components/ui/field-block'
import s from '@/components/pages/define-pension/index.module.scss'

interface IMainFormpartReuseFields {
  surname: string
  name: string
  patronymic: string

  gender: string
  age: string
  workExperience: string
}

interface IProps {
  register: Function
  errors: any
  fieldsData: IMainFormpartReuseFields
}

export const MainFormpartReuse: React.FC<IProps> = ({register, errors, fieldsData}) => {
  return <>
    <FieldBlock className={s.fieldBlock} title="Фамилия" error={errors[fieldsData.surname]?.message}>
      <input type="text" {...register(fieldsData.surname)} />
    </FieldBlock>

    <FieldBlock className={s.fieldBlock} title="Имя" error={errors[fieldsData.name]?.message}>
      <input type="text" {...register(fieldsData.name)} />
    </FieldBlock>

    <FieldBlock className={s.fieldBlock} title="Отчество" error={errors[fieldsData.patronymic]?.message}>
      <input type="text" {...register(fieldsData.patronymic)} />
    </FieldBlock>

    <div className={s.row3}>
      <FieldBlock className={s.fieldBlock} title="Возраст" error={errors[fieldsData.gender]?.message}>
        <input
          type="number"
          {...register(fieldsData.gender, {valueAsNumber: true})}
        />
      </FieldBlock>

      <FieldBlock className={s.fieldBlock}
                  title="Стаж работы"
                  error={errors[fieldsData.age]?.message}
      >
        <input
          type="number"
          {...register(fieldsData.age, {valueAsNumber: true})}
        />
      </FieldBlock>

      <FieldBlock className={s.fieldBlock} title="Пол" error={errors[fieldsData.workExperience]?.message}>
        <select {...register(fieldsData.workExperience)} defaultValue="М">
          <option value="М">Мужской</option>
          <option value="Ж">Женский</option>
        </select>
      </FieldBlock>
    </div>
  </>
}