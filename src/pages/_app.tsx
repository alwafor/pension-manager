import type { AppProps } from 'next/app'
import '@/assets/styles/styles.scss'
import Navbar from '@/components/layout/navbar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='container'>
      <Navbar />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
