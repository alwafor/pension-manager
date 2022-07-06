import React from 'react'
import s from './index.module.scss'
import classNames from 'classnames'

interface IProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {

}

export const Button: React.FC<IProps> = ({className, children, ...props}) => {
  return <button className={classNames(s.button, className)} {...props}>
    {children}
  </button>
}

export default Button