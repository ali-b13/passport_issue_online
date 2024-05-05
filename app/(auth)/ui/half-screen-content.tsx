import SvgImageLogin from '@/app/components/goverment-copyright/login-svg'
import SvgImageRegister from '@/app/components/goverment-copyright/register-svg'
import React from 'react'
type PropsHalf={
  isLogin?:boolean
}
const HalfScreenContent:React.FC<PropsHalf> = ({isLogin}) => {
  return (
    <section className='w-full h-[100vh] bg-gradient-to-br from-green-50 to-neutral-100'>
   
     {
      isLogin?<SvgImageLogin/>:<SvgImageRegister/>
     }
    </section>
  )
}

export default HalfScreenContent