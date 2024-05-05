import Image from "next/image"
import flag from '@/public/assets/yemen-flag.jpg'
const Logo = () => {
  return (
    <Image  className="rounded-lg " src={flag} alt="logo" width={70} height={70}/>
  )
}

export default Logo