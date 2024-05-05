import { adminExisted } from "@/app/actions/admin/queries"
import FormLogin from "../ui/form-login"
import HalfScreenContent from "../ui/half-screen-content"
import FormAdmin from "../ui/admin-register"

const login = async() => {
  const isAdminExisted=await adminExisted()
  console.log("is admin",isAdminExisted)
  return (
    <main className="w-full flex gap-4 ">
      <div className="w-full  md:w-6/6 lg:w-3/6  ">
        {
          isAdminExisted?
           <FormLogin/>
           :
          <FormAdmin/>
         
        }
     
      </div>
     <div className="hidden md:flex">
     <HalfScreenContent isLogin/>
     </div>
    
    </main>
  )
}

export default login