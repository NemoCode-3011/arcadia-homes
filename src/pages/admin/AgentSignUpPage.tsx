import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import logo from "../../assets/logo-img-2.png"

const AgentSignUpPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // these come from the invite link the Super Admin sends
  // e.g. /admin/agent-signup?email=vivian@arcadia.com&name=Vivian%20A.&token=abc123
  const prefillEmail = searchParams.get("email") || ""
  const prefillName = searchParams.get("name") || ""

  const [formData, setFormData] = useState({
    name: prefillName,
    email: prefillEmail,
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError("")
  }

  // ─── TODO: Replace with API call ──────────────────
  // const handleSubmit = async () => {
  //   setLoading(true)
  //   try {
  //     const response = await fetch("/api/auth/agent/setup", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         name: formData.name,
  //         email: formData.email,
  //         password: formData.password,
  //         token: searchParams.get("token"), // validates the invite
  //       })
  //     })
  //     const data = await response.json()
  //     if (!response.ok) throw new Error(data.message)
  //     navigate("/admin/signin")
  //   } catch (err: any) {
  //     setError(err.message || "Something went wrong")
  //   } finally {
  //     setLoading(false)
  //   }
  // }
  // ───────────────────────────────────────────────────

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields.")
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.")
      return
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.")
      return
    }

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      navigate("/admin/signin")
    }, 800)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit()
  }

  return (
    <div className="min-h-screen bg-arcadia-charcoal flex items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8">

        {/* Logo */}
        <div className="flex flex-col items-center">
          <img src={logo} alt="Arcadia" className="h-20 w-auto object-contain" />
          <p className="text-xs tracking-widest text-arcadia-sand mt-1">
            MODERN NATURE RESIDENCES
          </p>
        </div>

        {/* Heading */}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-arcadia-cream">
            Set up your account
          </h1>
          <p className="text-arcadia-sand text-sm">
            You've been invited to join Arcadia as an agent. Create your password to get started.
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

          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-arcadia-sand">Full Name</label>
            <input
              name="name"
              type="text"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              // prefilled from invite link — agent can correct if needed
              className="w-full h-11 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-arcadia-sand">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              // prefilled and read-only if email came from the invite link
              readOnly={!!prefillEmail}
              className={`w-full h-11 px-4 border border-arcadia-bark rounded-lg text-arcadia-cream focus:outline-none focus:border-arcadia-moss ${
                prefillEmail
                  ? "bg-arcadia-bark/30 cursor-not-allowed"
                  : "bg-transparent"
              }`}
            />
            {prefillEmail && (
              <p className="text-xs text-arcadia-sand/60">
                This email was set by your administrator
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-arcadia-sand">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
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

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-arcadia-sand">Confirm Password</label>
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="Repeat your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-full h-11 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-arcadia-sand hover:text-arcadia-cream"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
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
                Setting up account...
              </>
            ) : (
              "Create Account"
            )}
          </button>

          <p className="text-center text-arcadia-sand text-sm">
            Already set up?{" "}
            <button
              onClick={() => navigate("/admin/signin")}
              className="text-arcadia-moss hover:text-arcadia-leaf transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AgentSignUpPage