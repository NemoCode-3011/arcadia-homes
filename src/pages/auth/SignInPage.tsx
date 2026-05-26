import houseimage from "/react/arcadia-homes/src/assets/house-4.jpg"
import { Mail } from "lucide-react"
import { Lock } from "lucide-react"
import logoimage from "/react/arcadia-homes/src/assets/logo-img-2.png"
import { useNavigate } from "react-router-dom"
const SignInPage = () => {

    const navigate = useNavigate()
  return (
    <div className="bg-cover bg-center min-h-screen w-full"
      style={{
        backgroundImage: `url(${houseimage})`
      }}>
      <div className="w-full">
        <div className="flex items-center justify-center">
          <img src={logoimage} alt="" className="w-70  md:w-52  mt-5 " />
        </div>
        <div className="text-center space-y-2 mt-5">
          <h1 className="text-arcadia-sand font-semibold text-2xl">Sign In</h1>
          <p className="text-arcadia-cream">Welcome back! Please sign in to continue.</p>
        </div>
        <div>
          <div className="flex items-center justify-center mt-5 px-4 ">
            <form action="" className="space-y-3.5 w-full max-w-sm">
              <div className="relative">
                <Mail size={20} color="white" className="absolute right-3  top-1/2 -translate-y-1/2 cursor-pointer" />
                <input type="email" placeholder="Email Address" className="text-white py-1 px-4 border border-arcadia-moss rounded-sm w-full h-10 bg-transparent" />
              </div>
              <div className="relative">
                <Lock size={20} color="white" className="absolute right-3  top-1/2 -translate-y-1/2 cursor-pointer " />
                <input type="password" placeholder="Password" className="text-white py-1 px-4 border border-arcadia-moss rounded-sm w-full h-10 bg-transparent" />
              </div>
              <div className="flex gap-5 items-center justify-between ">
                <div className="flex gap-2">
                  <input type="checkbox" className="size-4 mt-1" />
                  <h1 className="text-arcadia-cream">Remember me</h1>
                </div>
                <a className="text-arcadia-sand" href="">Forgot Password?</a>
              </div>
              <div className="flex justify-center items-center">
                <button onClick={()=> navigate("/dashboard")} className="bg-arcadia-bark text-arcadia-cream px-5 py-2 rounded-2xl ">Sign In</button>
              </div>
              <div className=" flex items-center justify-center mt-5   gap-2  ">
                <h1 className="text-arcadia-cream">Don't have an account?</h1>
                <a className="text-arcadia-sand" href="/signup">Sign Up</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInPage