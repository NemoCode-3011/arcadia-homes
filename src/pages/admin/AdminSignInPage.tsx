import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import logo from "../../assets/logo-img-2.png"
import house6  from "../../assets/house21.jpg"

interface FormData {
  email: string
  password: string
}

//  Fake users fn, replace with API call later 
const fakeAdminUsers = [
  
  {
    id: "super1",
    email: "superadmin@arcadia.com",
    password: "admin123",
    role: "super_admin" as const,
    name: "Temilade A.",
  },

  { id: "1",
    email: "agent@arcadia.com",
    password: "agent123",
    role: "agent" as const,
    name: "Vivian A.",
  },
]


const AdminSignInPage = () => {
  const { adminLogin } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError("")
  }

  //Replace with the API call 
  // const handleSubmit = async () => {
  //   setLoading(true)
  //   try {
  //     const response = await fetch("/api/auth/admin/signin", {
  //     body: JSON.stringify(formData)
  //     })
  //     const data = await response.json()
  //     if (!response.ok) throw new Error(data.message)
  //     adminLogin(data.user)
  //     navigate("/dashboard")
  //   } catch (err: any) {
  //     setError(err.message || "Something went wrong")
  //   } finally {
  //     setLoading(false)
  //   }
  // }


  const handleSubmit = () => {
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.")
      return
    }

    setLoading(true)
    setError("")

    setTimeout(() => {
      const match = fakeAdminUsers.find(
        (u) =>
          u.email === formData.email.toLowerCase().trim() &&
          u.password === formData.password
      )

      if (!match) {
        setError("Invalid email or password.")
        setLoading(false)
        return
      }

      adminLogin({id: match.id, email: match.email, role: match.role, name: match.name })
      setLoading(false)
      navigate("/dashboard")
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
          src={house6}
          alt="Arcadia Property"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-arcadia-charcoal/40 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10">
          <p className="text-arcadia-cream/80 text-lg font-light italic leading-relaxed">
            "Where modern living meets the serenity of nature."
          </p>
          <p className="text-arcadia-sand/50 text-sm mt-2 tracking-widest">
            — ARCADIA HOMES
          </p>
        </div>
      </div>

      {/*  form cont */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">

          {/* Logo */}
          <div className="flex flex-col items-center">
            <img
              src={logo}
              alt="Arcadia"
              className="h-20 w-auto object-contain"
            />
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
              Sign in to your admin account
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
                onKeyDown={handleKeyDown}
                className="w-full h-11 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss transition-colors"
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
              disabled={loading}
              className="w-full py-3 rounded-lg bg-arcadia-moss text-arcadia-cream font-medium hover:bg-arcadia-leaf transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSignInPage