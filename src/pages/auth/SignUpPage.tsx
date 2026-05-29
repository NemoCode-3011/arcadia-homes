import houseimage from "/react/arcadia-homes/src/assets/house-11.jpg"
import logoimage from "/react/arcadia-homes/src/assets/logo-img-4.png"
import { UserRound, Mail, Eye, EyeOff } from 'lucide-react'
import { useState } from "react"
import { Link } from "react-router-dom"

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="flex h-screen bg-arcadia-charcoal">
      {/* Left side — image */}
      <div className="hidden lg:block basis-1/2 relative overflow-hidden">
        <img
          src={houseimage}
          alt="Arcadia Property"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-arcadia-charcoal/40 to-transparent" />
        {/* Quote */}
        <div className="absolute bottom-10 left-10 right-10">
          <p className="text-arcadia-cream/80 text-lg font-light italic leading-relaxed">
            "Find your perfect sanctuary in nature."
          </p>
          <p className="text-arcadia-sand/50 text-sm mt-2 tracking-widest">
            — ARCADIA HOMES
          </p>
        </div>
      </div>

      {/* Right side — form */}
      <div className="flex flex-1 items-center justify-center p-8 overflow-y-auto ">
        <div className="w-full max-w-md space-y-8 mt-50">

          {/* Logo */}
          <div className="flex flex-col items-center">
            <img
              src={logoimage}
              alt="Arcadia"
              className="w-40 md:w-52 object-contain"
            />
            <p className="text-xs tracking-widest text-arcadia-sand mt-1">
              MODERN NATURE RESIDENCES
            </p>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-arcadia-cream">
              Create an account
            </h1>
            <p className="text-arcadia-sand text-sm">
              Sign up to get started with Arcadia Homes
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">

            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-arcadia-sand">
                Full Name
              </label>
              <div className="relative">
                <input
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-11 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss transition-colors pr-12"
                />
                <UserRound size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-arcadia-sand/40" />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-arcadia-sand">
                Email
              </label>
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-11 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss transition-colors pr-12"
                />
                <Mail size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-arcadia-sand/40" />
              </div>
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
                  className="w-full h-11 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-arcadia-sand hover:text-arcadia-cream transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-arcadia-sand">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full h-11 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-arcadia-sand hover:text-arcadia-cream transition-colors"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-1 size-4 accent-arcadia-moss cursor-pointer"
              />
              <p className="text-sm text-arcadia-sand">
                I agree to the{" "}
                <span className="text-arcadia-cream underline underline-offset-2 cursor-pointer">
                  Terms & Conditions
                </span>
              </p>
            </div>

            {/* Submit */}
            <button
              type="button"
              className="w-full py-3 rounded-lg bg-arcadia-moss text-arcadia-cream font-medium hover:bg-arcadia-leaf transition-colors"
            >
              Sign Up
            </button>

            {/* Sign in link */}
            <p className="text-center text-sm text-arcadia-sand">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-arcadia-cream underline underline-offset-2 hover:text-arcadia-leaf transition-colors"
              >
                Sign In
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage