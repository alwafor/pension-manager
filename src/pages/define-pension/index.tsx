import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import s from '@/components/pages/define-pension/index.module.scss'
import z from 'zod'
import Button from '@/components/ui/button'
import {RefObject, useCallback, useMemo, useRef, useState} from 'react'
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

  breadwinnerSurname: string | undefined
  breadwinnerName: string | undefined
  breadwinnerPatronymic: string | undefined

  breadwinnerGender: 'М' | 'Ж' | undefined
  breadwinnerAge: number | undefined
  breadwinnerWorkExperience: number | undefined

  breadwinnerCertificateText: string | undefined

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
  invalidityCertificateText: z.optional(z.string().min(10, 'Как минимум 50 символов!')),

  breadwinnerSurname: z.optional(z
    .string()
    .min(2, {message: 'Фамилия должна быть больше 2х символов'})),

  breadwinnerName: z.optional(z.string().min(2, {message: 'Имя должно быть больше 2х символов'})),

  breadwinnerPatronymic: z.optional(z
    .string()
    .min(2, {message: 'Отчество должно быть больше 2х символов'})),

  breadwinnerGender: z.optional(z.string()),

  breadwinnerAge: z.optional(z
    .number()
    .min(16, {message: 'Минимальный возраст 16'})
    .max(144, {message: 'Максимальный возраст 144'})),
  breadwinnerWorkExperience: z.optional(z.number()),

  breadwinnerCertificateText: z.optional(z.string().min(10, 'Как минимум 50 символов!')),
})

export default function DefinePensionPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {errors},
    getValues
  } = useForm<IForm>({
    resolver: zodResolver(validationSchema),
    // todo remove later
    defaultValues: {
      surname: 'Зубенко',
      name: 'Михаил',
      patronymic: 'Петрович',

      gender: 'М',
      age: 25,
      workExperience: 2,

      isInvalidity: false,
      isLossOfBreadwinner: false,

      invalidityGroup: undefined,
      invalidityAge: undefined,
      invalidityCertificateText: undefined,

      breadwinnerSurname: undefined,
      breadwinnerName: undefined,
      breadwinnerPatronymic: undefined,
      breadwinnerGender: undefined,
      breadwinnerAge: undefined,
      breadwinnerWorkExperience: undefined,
      breadwinnerCertificateText: undefined
    }
  })

  const [imgInvalidityLoadProgress, setImgInvalidityLoadProgress] = useState(0)
  const [imgBreadwinnerLoadProgress, setImgBreadwinnerLoadProgress] = useState(0)

  const isInvalidity = watch('isInvalidity')
  const isLossOfBreadwinner = watch('isLossOfBreadwinner')

  const defineBooleanButtonStyle = (bool: boolean) => {
    if (bool) return s.buttonActive
    return s.buttonUnactive
  }

  const onSubmit = (data: IForm) =>{
    console.log('there')
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

  const fileImgInvalidityInputRef = useRef<HTMLInputElement>(null)
  const fileImgBreadwinnerInputRef = useRef<HTMLInputElement>(null)

  const generateImageLoadStatus = useCallback((progress: number) => {
    if (progress > 0 && progress !== 100) {
      return progress + '%'
    } else if (progress === 100) {
      return 'Загрузка успешна!'
    }
  }, [])

  const loadStatusInvalidity = useMemo(() => generateImageLoadStatus(imgInvalidityLoadProgress), [imgInvalidityLoadProgress])
  const loadStatusBreadwinner = useMemo(() => generateImageLoadStatus(imgBreadwinnerLoadProgress), [imgBreadwinnerLoadProgress])
  console.log(getValues())
  return (
    <div className={s.definePensionPage}>
      <form onSubmit={(e) => e.preventDefault()}>
        <h1 className={s.title}>Форма заполнения</h1>

        <MainSection setImgInvalidityLoadProgress={setImgInvalidityLoadProgress} isInvalidity={isInvalidity}
                     setImgBreadwinnerLoadProgress={setImgBreadwinnerLoadProgress}
                     isLossOfBreadwinner={isLossOfBreadwinner} setValue={setValue} register={register} errors={errors}
                     defineBooleanButtonStyle={defineBooleanButtonStyle}
        />

        {isInvalidity &&
          <InvaliditySection register={register} ref={fileImgInvalidityInputRef} errors={errors}
                             recognizeText={
                               recognizeTextGenerator(fileImgInvalidityInputRef,
                                 (value: string) => setValue('invalidityCertificateText', value),
                                 (m: any) => {
                                   setImgInvalidityLoadProgress(Math.floor(m.progress * 100))
                                 })
                             }
                             loadStatus={loadStatusInvalidity}
          />}

        {isLossOfBreadwinner && <BreadwinnerSection ref={fileImgBreadwinnerInputRef} loadStatus={loadStatusBreadwinner}  recognizeText={
          recognizeTextGenerator(fileImgBreadwinnerInputRef,
            (value: string) => setValue('breadwinnerCertificateText', value),
            (m: any) => {
              setImgBreadwinnerLoadProgress(Math.floor(m.progress * 100))
            })
        } errors={errors} register={register}/>}

        <Button className={s.buttonSubmit} onClick={handleSubmit(onSubmit)}>
          Подтвердить
        </Button>
      </form>
    </div>
  )
}
