import classNames from 'classnames'
import s from './index.module.scss'

interface IProps {
  children: React.ReactElement
  title: string
  className?: string
  error?: string
}

export default function FieldBlock({children, title, className, error}: IProps) {
  return (
    <label className={classNames(s.fieldBlock, className)}>
      <div className={s.title}>
        {title}
      </div>
      {children}
      {error && <div className={s.error}>{error}</div>}
    </label>
  )
}