export interface IRouteData {
  href: string
  text: string
  phone?:{}
}

// todo change link appropriately  
export const mainPageRoutes: IRouteData[] = [
  { href: '/', text: 'Ссылка на законы' },
  { href: '/', text: 'Помощь' },
  { href: '/', text: 'О нас' }
]

export const sectionsRoutes: IRouteData[] = [
  { href: '/', text: 'Главная страница' },
  { href: '/define-pension', text: 'Определить тип пенсии' },
  { href: '/calculate-surcharges', text: 'Высчитать надбавки' },
  { href: '/view-clients', text: 'Просмотреть клиентов' }
]

export const sectionsRoutesWithoutMain = sectionsRoutes.slice(1)