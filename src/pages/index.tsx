import s from '@/components/pages/home/index.module.scss'
import Link from 'next/link'
import {sectionsRoutesWithoutMain} from '@/core/routes'

export default function HomePage() {
  return <div className={s.homePage}>
    <h1 className={s.title}>Пенсионный фонд</h1>
      {sectionsRoutesWithoutMain.map(routeData =>
        <Link key={routeData.href} href={routeData.href}>
          <a className={s.link}>{routeData.text}</a>
        </Link>
      )}
  </div>
}