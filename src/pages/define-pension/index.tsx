import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import s from '@/components/pages/define-pension/index.module.scss'
import z from 'zod'
import FieldBlock from '@/components/ui/field-block'

interface IForm {
  surname: string
  name: string
  patronymic: string

  gender: 'М' | 'Ж'
  age: number
  workExperience: number

  invalidity: boolean

  isTeacher: boolean
  isHealthWorker: boolean
  isCulturalWorker: boolean
  isSocialWorker: boolean
}

const validationSchema = z.object({
  surname: z
    .string()
    .min(2, { message: 'Фамилия должна быть больше 2х символов' }),

  name: z.string().min(2, { message: 'Имя должно быть больше 2х символов' }),

  patronymic: z
    .string()
    .min(2, { message: 'Отчество должно быть больше 2х символов' }),

  gender: z.string(),

  age: z
    .number()
    .min(16, { message: 'Минимальный возраст 16' })
    .max(144, { message: 'Максимальный возраст 144' }),
  workExperience: z.number(),
})

export default function DefinePensionPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
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
    },
  })

  const onSubmit = (data: IForm) => {
    console.log(data)
  }

  return (
    <div className={s.definePensionPage}>
      Define pension page
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className={s.section}>
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
                {...register('age', { valueAsNumber: true })}
              />
            </FieldBlock>

            <FieldBlock
              title="Стаж работы"
              error={errors.workExperience?.message}
            >
              <input
                type="number"
                {...register('workExperience', { valueAsNumber: true })}
              />
            </FieldBlock>

            <FieldBlock title="Пол" error={errors.gender?.message}>
              <select {...register('gender')} defaultValue="М">
                <option value="М">Мужской</option>
                <option value="Ж">Женский</option>
              </select>
            </FieldBlock>
          </div>
        </section>

        <button>Обработать</button>
      </form>
    </div>
  )
}
