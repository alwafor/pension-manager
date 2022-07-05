import Link from 'next/link'
import s from './index.module.scss'

export default function Navbar() {
  return (
    <div className={s.navbar}>
      <Link href='/'>
        <a className={s.navbarItem}>Главная страница</a>
      </Link>
      <Link href='/define-pension'>
        <a className={s.navbarItem}>Определить тип пенсии</a>
      </Link>
      <Link href='/calculate-surcharges'>
        <a className={s.navbarItem}>Высчитать надбавки</a>
      </Link>
      <Link href='/view-clients'>
        <a className={s.navbarItem}>Просмотреть клиентов</a>
      </Link>
    </div>
  )
}