import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import s from '@/components/pages/define-pension/index.module.scss'
import z from 'zod'
import FieldBlock from '@/components/ui/field-block'
import Button from '@/components/ui/button'

interface IForm {
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
  isLossOfBreadwinner: z.boolean()
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

  const isInvalidity = watch('isInvalidity')
  const isLossOfBreadwinner = watch('isLossOfBreadwinner')

  const defineBooleanButtonStyle = (bool: boolean) => {
    if (bool) return s.buttonActive
    return s.buttonUnactive
  }

  const onLoadImageButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

  }

  const onSubmit = (data: IForm) => {
    console.log(data)
  }

  // todo add custom image behaviour
  const imgOldMan = `https://avatars.mds.yandex.net/i?id=2f2d0179fbf1ae2244b37d7543a6b66e-5887733-images-thumbs&n=13`

  return (
    <div className={s.definePensionPage}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Форма заполнения</h2>
        <div className={s.bigRow}>
          <div className={s.bigRowColWide}>
            <FieldBlock title="Фамилия" error={errors.surname?.message}>
              <input type="text" {...register('surname')} />
            </FieldBlock>

            <FieldBlock title="Имя" error={errors.name?.message}>
              <input type="text" {...register('name')} />
            </FieldBlock>

            <FieldBlock title="Отчество" error={errors.patronymic?.message}>
              <input type="text" {...register('patronymic')} />
            </FieldBlock>

            <div className={s.row3}>
              <FieldBlock title="Возраст" error={errors.age?.message}>
                <input
                  type="number"
                  {...register('age', {valueAsNumber: true})}
                />
              </FieldBlock>

              <FieldBlock
                title="Стаж работы"
                error={errors.workExperience?.message}
              >
                <input
                  type="number"
                  {...register('workExperience', {valueAsNumber: true})}
                />
              </FieldBlock>

              <FieldBlock title="Пол" error={errors.gender?.message}>
                <select {...register('gender')} defaultValue="М">
                  <option value="М">Мужской</option>
                  <option value="Ж">Женский</option>
                </select>
              </FieldBlock>
            </div>

            <div className={s.row2}>
              <FieldBlock title={'Инвалидность'} className={s.textAlignCenter}>
                <div className={s.flexEvenly}>
                  <Button className={defineBooleanButtonStyle(isInvalidity)}
                          onClick={() => setValue('isInvalidity', true)}>Да</Button>
                  <Button className={defineBooleanButtonStyle(!isInvalidity)}
                          onClick={() => setValue('isInvalidity', false)}>Нет</Button>
                </div>
              </FieldBlock>
              <FieldBlock title={'По потере кормильца'} className={s.textAlignCenter}>
                <div className={s.flexEvenly}>
                  <Button className={defineBooleanButtonStyle(isLossOfBreadwinner)}
                          onClick={() => setValue('isLossOfBreadwinner', true)}
                  >
                    Да
                  </Button>
                  <Button className={defineBooleanButtonStyle(!isLossOfBreadwinner)}
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
            <Button className={s.buttonImageUpload} onClick={onLoadImageButtonClick}>Загрузить фотографию</Button>
          </div>
        </div>


        <Button>Обработать</Button>
      </form>
    </div>
  )
}
