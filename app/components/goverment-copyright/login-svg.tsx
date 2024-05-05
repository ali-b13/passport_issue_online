import Image from 'next/image'
import React from 'react'
import registerImageSvg from '@/public/assets/login-svg.svg'
const ImageSvg = () => {
  return (
 
        <Image className='rounded-lg h-full' src={registerImageSvg} alt='national image'/>
  )
}

export default ImageSvg