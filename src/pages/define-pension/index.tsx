import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import s from '@/components/pages/define-pension/index.module.scss'
import z from 'zod'
import Button from '@/components/ui/button'
import {RefObject, useMemo, useRef, useState} from 'react'
import Tesseract from 'tesseract.js'
import InvaliditySection from '@/components/pages/define-pension/form/invalidity-section'
import {MainSection} from '@/components/pages/define-pension/form/main-section'
import BreadwinnerSection from '@/components/pages/define-pension/form/breadwinner-section'

export interface IForm {
  surname: string
  name: string
  patronymic: string

  gender: 'М' | 'Ж'
  age: number
  workExperience: number

  isInvalidity: boolean
  isLossOfBreadwinner: boolean

  isTeacher: boolean
  isHealthWorker: boolean
  isCulturalWorker: boolean
  isSocialWorker: boolean

  invalidityGroup: 'Первая' | 'Вторая/Третья' | undefined
  invalidityAge: number | undefined
  invalidityCertificateText: string | undefined

  breadwinnerSurname: string
  breadwinnerName: string
  breadwinnerPatronymic: string

  breadwinnerGender: 'М' | 'Ж'
  breadwinnerAge: number
  breadwinnerWorkExperience: number

}

const validationSchema = z.object({
  surname: z
    .string()
    .min(2, {message: 'Фамилия должна быть больше 2х символов'}),

  name: z.string().min(2, {message: 'Имя должно быть больше 2х символов'}),

  patronymic: z
    .string()
    .min(2, {message: 'Отчество должно быть больше 2х символов'}),

  gender: z.string(),

  age: z
    .number()
    .min(16, {message: 'Минимальный возраст 16'})
    .max(144, {message: 'Максимальный возраст 144'}),
  workExperience: z.number(),

  isInvalidity: z.boolean(),
  isLossOfBreadwinner: z.boolean(),

  invalidityGroup: z.optional(z.string()),
  invalidityAge: z.optional(
    z
      .number()
      .min(16, {message: 'Минимальный возраст 16'})
      .max(144, {message: 'Максимальный возраст 144'})
  ),
  invalidityCertificateText: z.optional(z.string())
})

export default function DefinePensionPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {errors}
  } = useForm<IForm>({
    resolver: zodResolver(validationSchema),
    // todo remove later
    defaultValues: {
      surname: 'Зубенко',
      name: 'Михаил',
      patronymic: 'Петрович',

      gender: 'М',
      age: 25,
      workExperience: 2
    }
  })

  const [imgInvalidityLoadProgress, setImgInvalidityLoadProgress] = useState(0)

  const isInvalidity = watch('isInvalidity')
  const isLossOfBreadwinner = watch('isLossOfBreadwinner')

  const defineBooleanButtonStyle = (bool: boolean) => {
    if (bool) return s.buttonActive
    return s.buttonUnactive
  }
  
  const onSubmit = (data: IForm) => {
    console.log(data)
  }

  const recognizeTextGenerator = (fileInputRef: RefObject<HTMLInputElement>, successCb: (text: string) => any, loggerCb?: any) => {
    return function () {
      if (!fileInputRef.current || !fileInputRef.current.files?.length) {
        return
      }

      const file = fileInputRef.current.files[0]

      Tesseract.recognize(file, 'rus', {
        logger: loggerCb
      }).then(({data: {text}}) => {
        successCb(text)
      })
    }
  }

  const fileInputRef = useRef<HTMLInputElement>(null)

  const loadStatusInvalidity = useMemo(() => {
    if (imgInvalidityLoadProgress > 0 && imgInvalidityLoadProgress !== 100) {
      return imgInvalidityLoadProgress + '%'
    } else if (imgInvalidityLoadProgress === 100) {
      return 'Загрузка успешна!'
    }
  }, [imgInvalidityLoadProgress])

  return (
    <div className={s.definePensionPage}>
      <form onSubmit={(e) => e.preventDefault()}>
        <h1 className={s.title}>Форма заполнения</h1>

        <MainSection setImgInvalidityLoadProgress={setImgInvalidityLoadProgress} isInvalidity={isInvalidity}
                     isLossOfBreadwinner={isLossOfBreadwinner} setValue={setValue} register={register} errors={errors}
                     defineBooleanButtonStyle={defineBooleanButtonStyle}
        />

        {isInvalidity &&
          <InvaliditySection register={register} ref={fileInputRef} errors={errors}
                             recognizeText={
                               recognizeTextGenerator(fileInputRef,
                                 (value: string) => setValue('invalidityCertificateText', value),
                                 (m: any) => {
                                   setImgInvalidityLoadProgress(Math.floor(m.progress * 100))
                                 })
                             }
                             loadStatus={loadStatusInvalidity}
          />}

        {isLossOfBreadwinner && <BreadwinnerSection errors={errors} register={register}/>}

        <Button className={s.buttonSubmit} onClick={handleSubmit(onSubmit)}>
          Подтвердить
        </Button>
      </form>
    </div>
  )
}
