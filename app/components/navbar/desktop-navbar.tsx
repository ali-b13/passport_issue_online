import { navLinks } from "@/utils/placeholder-data"
import OutlineButton from "../buttons/outlineButton"
import PlatForm from "../goverment-copyright/agdam"
import Link from "next/link"
import { signOut } from "next-auth/react"

const Desktop_NavBar = () => {
  
  return (
  <div className="hidden md:flex justify-between items-center ">
   <OutlineButton onClick={()=>signOut()} label="تسجيل خروج"/>
      <ul className="text-white flex gap-4 ">
   {
     navLinks.map((link)=>{
        return <Link key={link.href} href={link.href}  >{link.name}</Link>
    })
   }
    </ul>
    <PlatForm/>
  </div>
  )
}

export default Desktop_NavBar