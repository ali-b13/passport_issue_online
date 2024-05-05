
import HalfScreenContent from "../ui/half-screen-content"
import RegisterForm from "../ui/register-form"

const register = () => {
  return (
    <main className="w-full flex gap-4">
     <div className="w-full md:w-6/6 lg:w-3/6"> <RegisterForm/></div>
     <div className="hidden md:flex">
     <HalfScreenContent/>
     </div>
    
    </main>
  )
}

export default register