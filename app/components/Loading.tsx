import Image from 'next/image'
import React from 'react'
import loaderImg from '@/public/assets/loading.svg'
const Loading = () => {
  return (
    <Image src={loaderImg} alt='loading' width={120} />
  )
}

export default Loading