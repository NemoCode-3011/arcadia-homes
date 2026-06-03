import { Menu } from "lucide-react"
import { useAuth } from "../../context/AuthContext"

interface TopbarProps {
  onMenuClick: () => void
}

const Topbar = ({ onMenuClick }: TopbarProps) => {
  const { user } = useAuth()  // ← was missing () — useAuth is a function

  return (
    <header className="h-16 flex items-center justify-between px-4 lg:px-6 border-b bg-arcadia-stone border-arcadia-bark">

      {/* Hamburger for mobile */}
      <button
        onClick={onMenuClick}
        className="lg:hidden text-arcadia-cream">
        <Menu size={22} />
      </button>
      {/* Welcome message */}
      <h1 className="text-sm lg:text-base font-medium text-arcadia-cream">
        Welcome back, {user?.name}
      </h1>

      {/* Initials Avatar */}
      <div className="w-10 h-10 rounded-full flex items-center justify-center text-md font-bold text-arcadia-sand bg-arcadia-moss">
        {user?.name?.charAt(0)}
      </div>

    </header>
  )
}

export default Topbar