import {
  IRouteData,
  mainPageRoutes,
  sectionsRoutes,
} from '@/core/routes'
import Link from 'next/link'
import s from './index.module.scss'

import imgTelephoneIcon from '@/assets/images/icons/icon-telephone.png'
import {useRouter} from 'next/router'
import {useCallback, useMemo} from 'react'

const telephoneElement = (
  <div className={s.elementWithImage}>
    <img src={imgTelephoneIcon.src} alt={'telephone'}/>
    <span>+380-71-777-77-77</span>
  </div>
)

export default function Navbar() {

  const router = useRouter()

  const routeDataToElement = useCallback((routeData: IRouteData) => {
    return (
      <Link href={routeData.href}>
        <a className={s.navbarLink}>{routeData.text}</a>
      </Link>
    )
  }, [])

  const routesWithTelephoneComponent = [
    ...mainPageRoutes.slice(0, 2).map(routeDataToElement),
    telephoneElement,
    routeDataToElement(mainPageRoutes[mainPageRoutes.length - 1]),
  ]

  const sectionsRoutesElements = sectionsRoutes.map(routeDataToElement)

  const elementsToRender = useMemo(() => router.pathname === '/' ? routesWithTelephoneComponent : sectionsRoutesElements,[router.pathname])

  return (
    <div className={s.navbar}>
      {elementsToRender}
    </div>
  )
}
