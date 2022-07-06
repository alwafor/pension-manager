import React from 'react'
import {MainFormpartReuse} from '@/components/pages/define-pension/form/main-formpart-reusable'
import MainImagepartReusable from '@/components/pages/define-pension/form/main-imagepart-reusable'
import s from '@/components/pages/define-pension/index.module.scss'
import FieldBlock from '@/components/ui/field-block'
import Button from '@/components/ui/button'

interface IProps {
  register: Function
  errors: any
  loadStatus: string | undefined,
  recognizeText: Function
}

const BreadwinnerSection = React.forwardRef<HTMLInputElement, IProps>(({errors, register, loadStatus, recognizeText}, ref) => {
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

        {/*todo make reusable later*/}
        <FieldBlock className={s.fieldBlock} title="Документ о смерти кормильца">
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
            <textarea {...register('breadwinnerCertificateText')} placeholder={'Текстовые данные с документа'}/>
          </div>
        </FieldBlock>


      </div>

      <div className={s.bigRowColNarrow}>
        <MainImagepartReusable/>
      </div>
    </div>
  </>
})

BreadwinnerSection.displayName = 'BreadwinnerSection'
export default BreadwinnerSection