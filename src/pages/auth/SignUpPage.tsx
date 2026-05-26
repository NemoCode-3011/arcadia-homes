import houseimage from "/react/arcadia-homes/src/assets/house-3.jpg"
import logoimage from "/react/arcadia-homes/src/assets/logo-img-2.png"
import { UserRound } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Lock } from 'lucide-react';
import { useState } from "react";
import { Link } from "react-router-dom";
const SignUpPage = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
   });

  return (

    // background image
    <div className="bg-cover  bg-center min-h-screen w-full"
      style={{
        backgroundImage: `url(${houseimage})`
      }}>
      <div className=" w-full">
        {/* logo */}
        <div className="flex items-center justify-center">
          <img src={logoimage} alt="" className="w-70  md:w-52   mt-10 " />
        </div>
        <div className="text-center space-y-2 mt-7.5">
          <h1 className="text-arcadia-sand font-semibold text-2xl">Sign Up</h1>
          <p className="text-arcadia-cream">Create your account to get started</p>
        </div>
        <div>
          {/* signup form */}
          <div className="flex items-center justify-center mt-5 ">
            <form action="" className="space-y-3.5">
              <div className="relative">
                <UserRound size={20} color="white" className="absolute right-3  top-1/2 -translate-y-1/2 cursor-pointer " />
                <input type="text" placeholder="Full Name" className="text-white py-1 px-4 border border-arcadia-moss rounded-sm w-70 h-10" />
              </div>
              <div className="relative">
                <Mail size={20} color="white" className="absolute right-3  top-1/2 -translate-y-1/2 cursor-pointer" />
                <input type="email" placeholder="Email Address" className="text-white py-1 px-4 border border-arcadia-moss rounded-sm w-70 h-10" />
              </div>
              <div className="relative">
                <Lock size={20} color="white" className="absolute right-3  top-1/2 -translate-y-1/2 cursor-pointer " />
                <input type="password" placeholder="Password" className="text-white py-1 px-4 border border-arcadia-moss rounded-sm w-70 h-10" />
              </div>
              <div className="relative">
                <Lock size={20} color="white" className="absolute right-3  top-1/2 -translate-y-1/2 cursor-pointer " />
                <input type="password" placeholder="Confirm Password" className="text-white py-1 px-4 border border-arcadia-moss rounded-sm w-70 h-10" />
              </div>
              <div className="flex gap-2 items-center justify-center ">
                <input type="checkbox" className="size-4 mt-1" />
                <h1 className="text-gray-300">I agree to the <span className="text-white"> Terms & Conditions</span></h1>
              </div>
              <div className="flex justify-center items-center">
                <button className="bg-arcadia-bark text-arcadia-cream px-5 py-2 rounded-2xl ">Sign Up</button>
              </div>
              <div className="text-center flex mt-5 space-y-5 gap-2">
                <h1 className="text-arcadia-cream">Already have an account?</h1>
                <Link to={"/signin"} className="text-arcadia-sand">Sign In</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage