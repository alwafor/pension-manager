import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';

import s from '@/components/pages/define-pension/index.module.scss'
import z from 'zod'

interface IForm {
  name: string
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
  name: z.string().min(2),
  age: z.number().min(16).max(144),
  workExperience: z.number(),
  
})

export default function DefinePensionPage() {
  const { register, handleSubmit, formState: {errors} } = useForm<IForm>({
    resolver: zodResolver(validationSchema)
  })

  const onSubmit = (data: IForm) => {
    console.log(data)
  }

  return (
    <div className={s.definePensionPage}>
      Define pension page
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className={s.section}>
         
          <input type="text" {...register('name')} />
          <select {...register('gender')} defaultValue="М">
            <option value="М">Мужской</option>
            <option value="Ж">Женский</option>
          </select>
          <input type="number" {...register('age')} />
          <input type="number" {...register('workExperience')} />
        </section>

        <button>Обработать</button>
      </form>
    </div>
  )
}