import React, {useEffect} from 'react'
import {useRouter} from 'next/router'
import {IClientData} from '@/core/types'
import useFetch from '@/core/hooks/useFetch'

export default function ClientPage() {

  const router = useRouter()
  const {id} = router.query

  const {error, isLoading, data, run: runFetchClientData} = useFetch<IClientData>({
    url: `/api/client/get-one?id=${id}`,
    runInitial: false,
    method: 'GET'
  })

  useEffect(() => {
    if(router.isReady) {
      runFetchClientData()
    }
  }, [router.isReady])

  if (error) {
    return <div>Произошла ошибка загрузки.</div>
  }

  if (isLoading || !data) {
    return <div>Загрузка...</div>
  }

  return <div>
    <h1>{`${data.surname} + `}</h1>
    {data.toString()}
  </div>
}