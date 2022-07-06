import React from 'react'
import {MainFormpartReuse} from '@/components/pages/define-pension/form/main-formpart-reusable'

interface IProps {
  register: Function
  errors: any
}

const BreadwinnerSection: React.FC<IProps> = ({errors, register}) => {
  return <div>
    <MainFormpartReuse errors={errors} register={register} fieldsData={{
      surname: 'breadwinnerSurname',
      name: 'breadwinnerName',
      patronymic: 'breadwinnerPatronymic',
      gender: 'breadwinnerGender',
      age: 'breadwinnerAge',
      workExperience: 'breadwinnerWorkExperience',
    }}/>
  </div>
};

export default BreadwinnerSection