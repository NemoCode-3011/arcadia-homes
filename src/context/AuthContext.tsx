import { createContext, useContext, useState } from "react"

interface User {
  email: string
  role: "super_admin" | "agent"
  name: string
}

interface AuthContextType {
  user: User | null
  isAdminAuthenticated: boolean
  adminLogin: (user: User) => void
  adminLogout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // check localStorage on first load
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user")
    return stored ? JSON.parse(stored) : null
  })

  const isAdminAuthenticated = !!user

  const adminLogin = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData)
  }

  const adminLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isAdminAuthenticated, adminLogin, adminLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}