import {IShortClientData, ResultServerResponse} from '@/core/types'
import {prismaClient} from '@/core/backend/prisma'
import s from '@/components/pages/view-clients/index.module.scss'

interface IProps {
  response?: ResultServerResponse
  clients?: IShortClientData[]
}

export default function ViewClientsPage({response, clients}: IProps) {

  if(response) return <div className={s.viewClientsPage}>
    <h2 className={s.title}>Произошла ошибка на сервере! Невозможно получить клиентов!</h2>
  </div>

  return (
    <div className={s.viewClientsPage}>
      <h2 className={s.title}>Список клиентов</h2>
      <div className={s.clientsWrapper}>
        {clients?.map(c => <div key={c.name} className={s.client}>
          <div>ФИО: {`${c.surname} ${c.name} ${c.patronymic}`}</div>
          <div>Возраст: {c.age}</div>
          <div>Пол: {c.gender}</div>
          <div>Стаж: {c.workExperience}</div>
          <div>Инвалидность {c.isInvalidity ? ' присутствует' : ' отсутствует'}</div>
          <div>Потеря кормильца: {c.isLossOfBreadwinner ? ' да' : ' нет'}</div>
        </div>)}
      </div>

    </div>
  )
}

export async function getServerSideProps() {
  let clientsData
  let props: IProps = {}

  try {
    clientsData = await prismaClient.client.findMany({
      select: {
        surname: true,
        name: true,
        patronymic: true,

        gender: true,
        age: true,
        workExperience: true,

        isInvalidity: true,
        isLossOfBreadwinner: true
      }
    })

  } catch (e) {
    props.response = {
      message: 'Произошла серверная ошибка! Невозможно получить пользователей!',
      isError: true
    }
    return {props}
  }

  props.clients = clientsData as IShortClientData[]
  return {props}
}