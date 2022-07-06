import React from 'react'
import s from '@/components/pages/define-pension/index.module.scss'
import Button from '@/components/ui/button'

const MainImagepartReusable = () => {

  const imgOldMan = `https://avatars.mds.yandex.net/i?id=2f2d0179fbf1ae2244b37d7543a6b66e-5887733-images-thumbs&n=13`

  const onLoadImageButtonClick = () => {
    console.log('clicked!')
  }

  return <>
    <div className={s.imageWrapper}>
      <img src={imgOldMan} alt="photo"/>
    </div>
    <Button
      className={s.buttonImageUpload}
      onClick={onLoadImageButtonClick}
    >
      Загрузить фотографию
    </Button>
  </>
}

export default MainImagepartReusable