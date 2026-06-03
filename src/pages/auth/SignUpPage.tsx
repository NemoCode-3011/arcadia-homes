import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { UserRound, Mail, Eye, EyeOff, Loader2 } from "lucide-react"
import houseimage from "../../assets/house-11.jpg"
import logoimage from "../../assets/logo-img-4.png"

interface FormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}


const SignUpPage = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [agreed, setAgreed] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError("")
  }

  // I will also Replace this with API call 
  // const handleSubmit = async () => {
  //   setLoading(true)
  //   try {
  //     const response = await fetch("/api/auth/signup", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         name: formData.name,
  //         email: formData.email,
  //         password: formData.password,
  //       })
  //     })
  //     const data = await response.json()
  //     if (!response.ok) throw new Error(data.message)
  //     navigate("/signin")
  //   } catch (err: any) {
  //     setError(err.message || "Something went wrong")
  //   } finally {
  //     setLoading(false)
  //   }
  // }
  

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields.")
      return
    }

    // if (formData.password !== formData.confirmPassword) {
    //   setError("Passwords do not match.")
    //   return
    // }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }

    if (!agreed) {
      setError("Please agree to the Terms & Conditions.")
      return
    }

    setLoading(true)
    setError("")

    // simulate network delay — remove when API is ready
    setTimeout(() => {
      setLoading(false)
      navigate("/signin")
    }, 800)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit()
  }

  return (
    <div className="flex h-screen bg-arcadia-charcoal">
      {/* Left — image */}
      <div className="hidden lg:block basis-1/2 relative overflow-hidden">
        <img
          src={houseimage}
          alt="Arcadia Property"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-arcadia-charcoal/40 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10">
          <p className="text-arcadia-cream/80 text-lg font-light italic leading-relaxed">
            "Find your perfect sanctuary in nature."
          </p>
          <p className="text-arcadia-sand/50 text-sm mt-2 tracking-widest">
            — ARCADIA HOMES
          </p>
        </div>
      </div>

      {/* form cont */}
      <div className="flex flex-1 items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
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
          {/* Error */}
          {error && (
            <div className="px-4 py-3 rounded-lg bg-red-900/30 border border-red-800 text-red-400 text-sm">
              {error}
            </div>
          )}
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
                  onKeyDown={handleKeyDown}
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
                  onKeyDown={handleKeyDown}
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
                  onKeyDown={handleKeyDown}
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
                  onKeyDown={handleKeyDown}
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
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
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
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 rounded-lg bg-arcadia-moss text-arcadia-cream font-medium hover:bg-arcadia-leaf transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creating account...
                </>
              ) : (
                "Sign Up"
              )}
            </button>

            {/* Sign in link */}
            <p className="text-center text-sm text-arcadia-sand">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-arcadia-cream underline underline-offset-2 hover:text-arcadia-leaf transition-colors">
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