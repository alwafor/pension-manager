import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import Tesseract from 'tesseract.js'

import {RefObject, useCallback, useMemo, useRef, useState} from 'react'
import Button from '@/components/ui/button'
import InvaliditySection from '@/components/pages/define-pension/form/invalidity-section'
import {MainSection} from '@/components/pages/define-pension/form/main-section'
import BreadwinnerSection from '@/components/pages/define-pension/form/breadwinner-section'

import {IDefinePensionData} from '@/core/types'

import {formValidationSchema} from '@/components/pages/define-pension/form/formValidationSchema'
import {formDefaultValues} from '@/components/pages/define-pension/form/formDefaultValues'

import s from '@/components/pages/define-pension/index.module.scss'

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
  } = useForm<IDefinePensionData>({
    resolver: zodResolver(formValidationSchema),
    // todo remove later
    defaultValues: formDefaultValues
  })

  const [imgInvalidityLoadProgress, setImgInvalidityLoadProgress] = useState(0)
  const [imgBreadwinnerLoadProgress, setImgBreadwinnerLoadProgress] = useState(0)

  const isInvalidity = watch('isInvalidity')
  const isLossOfBreadwinner = watch('isLossOfBreadwinner')

  const defineBooleanButtonStyle = (bool: boolean) => {
    if (bool) return s.buttonActive
    return s.buttonUnactive
  }

  const onSubmit = (data: IDefinePensionData) =>{
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
