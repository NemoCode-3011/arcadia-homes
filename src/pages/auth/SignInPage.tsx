import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import houseimage from "../../assets/house-4.jpg"
import logoimage from "../../assets/logo-img-5.png"

interface FormData {
  email: string
  password: string
}

// Using Fake-hardcoded users, I will replace with API call later
const fakeUsers = [
  {
    email: "user@arcadia.com",
    password: "user123",
    role: "user" as const,
    name: "John Doe",
  },
]

const SignInPage = () => {
  const { userLogin } = useAuth()
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
    if (error) setError("") // clear error when user types
  }

  // i will Replace this block with API call
  // const handleSubmit = async () => {
  //   setLoading(true)
  //   try {
  //     const response = await fetch("/api/auth/signin", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData)
  //     })
  //     const data = await response.json()
  //     if (!response.ok) throw new Error(data.message)
  //     userLogin(data.user)
  //     navigate("/listings")
  //   } catch (err: any) {
  //     setError(err.message || "Something went wrong")
  //   } finally {
  //     setLoading(false)
  //   }
  // }
  // ─────────────────────────────────────────────────

  const handleSubmit = () => {
    // validation
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.")
      return
    }

    setLoading(true)
    setError("")

    // simulate network delay
    setTimeout(() => {
      const match = fakeUsers.find(
        (u) =>
          u.email === formData.email.toLowerCase().trim() &&
          u.password === formData.password
      )

      if (!match) {
        setError("Invalid email or password.")
        setLoading(false)  // ← was missing
        return
      }

      userLogin({ email: match.email, role: match.role, name: match.name })
      setLoading(false)
      navigate("/")
    }, 800)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit()
  }

  return (
    <div className="flex h-screen bg-arcadia-charcoal">

      {/* Left — image */}
      <div className="hidden lg:block basis-1/2">
        <img
          src={houseimage}
          alt="Arcadia Property"
          className="w-full h-full object-cover"
        />
      </div>

      {/* form cont*/}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex flex-col items-center">
            <img
              src={logoimage}
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
              Sign in to your account
            </p>
          </div>

          {/* Error message */}
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
                  onKeyDown={handleKeyDown}
                  className="w-full h-11 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-arcadia-sand hover:text-arcadia-cream"
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
            {/* Sign up link */}
            <p className="text-center text-arcadia-sand text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-arcadia-moss hover:text-arcadia-leaf transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInPage