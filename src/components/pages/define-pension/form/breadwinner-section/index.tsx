import React from 'react'
import {MainFormpartReuse} from '@/components/pages/define-pension/form/main-formpart-reusable'
import MainImagepartReusable from '@/components/pages/define-pension/form/main-imagepart-reusable'
import s from '@/components/pages/define-pension/index.module.scss'

interface IProps {
  register: Function
  errors: any
}

const BreadwinnerSection: React.FC<IProps> = ({errors, register}) => {
  return <>
    <h2 className={s.title}>Данные кормильца</h2>
    <div className={s.bigRow}>
      <div className={s.bigRowColWide}>
        <MainFormpartReuse errors={errors} register={register} fieldsData={{
          surname: 'breadwinnerSurname',
          name: 'breadwinnerName',
          patronymic: 'breadwinnerPatronymic',
          gender: 'breadwinnerGender',
          age: 'breadwinnerAge',
          workExperience: 'breadwinnerWorkExperience',
        }}/>
      </div>

      <div className={s.bigRowColNarrow}>
        <MainImagepartReusable/>
      </div>
    </div>
  </>

};

export default BreadwinnerSection