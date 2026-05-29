import houseimage from "/react/arcadia-homes/src/assets/house-4.jpg"
import logoimage from "/react/arcadia-homes/src/assets/logo-img-4.png"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
const SignInPage = () => {

    const navigate = useNavigate()
      
      const [formData, setFormData] = useState({
        email: "",
        password: ""
      })
    
      const [showPassword, setShowPassword] = useState(false)
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
      }
    
      const handleSubmit = () => {
        navigate("/")
      }
  return (
     <div className="flex h-screen bg-arcadia-charcoal">
      {/* Left side — image */}
      <div className="hidden lg:block basis-1/2">
        <img 
          src={houseimage} 
          alt="Arcadia Property" 
          className="w-full h-full object-cover"/>
      </div>
      {/* Right side — form */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">

          {/* Logo */}
          <div className="flex flex-col items-center">
            <img src={logoimage} alt="Arcadia" className="h-30 w-auto object-contain" />
            <p className="text-xs tracking-widest text-arcadia-sand mt-1">
              MODERN NATURE RESIDENCES
            </p>
          </div>
          {/* Heading */}
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-arcadia-cream">
              Welcome back
            </h1>
            <p className="text-arcadia-sand text-sm">
              Sign in to your account
            </p>
          </div>
          {/* Form */}
          <div className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-arcadia-sand">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-11 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss"
              />
            </div>
            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-arcadia-sand">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full h-11 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss pr-12"/>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-arcadia-sand hover:text-arcadia-cream">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {/* Forgot Password */}
            <div className="flex justify-end">
              <button className="text-sm text-arcadia-moss hover:text-arcadia-leaf transition-colors">
                Forgot password?
              </button>
            </div>
            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-3 rounded-lg bg-arcadia-moss text-arcadia-cream font-medium hover:bg-arcadia-leaf transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInPage