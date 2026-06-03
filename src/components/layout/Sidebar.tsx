import { NavLink, useNavigate } from "react-router-dom"
import logoimage from "../../assets/logo-img-5.png"
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react"

interface SideBarProp {
  onClose: () => void
}

const Sidebar = ({ onClose }: SideBarProp) => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  const navItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
      roles: ["super_admin", "agent"],
    },
    {
      title: "Properties",
      path: "/properties",
      icon: Building2,
      roles: ["super_admin", "agent"],
    },
    {
      title: "Messages",
      path: "/messages",
      icon: MessageSquare,
      roles: ["super_admin", "agent"],
    },
    {
      title: "Manage Agents",
      path: "/agents",
      icon: Users,
      roles: ["super_admin"],
    },
    {
      title: "Settings",
      path: "/settings",
      icon: Settings,
      roles: ["super_admin", "agent"],
    },
  ]

  const handleLogout = () => {
    localStorage.removeItem("user")
    onClose()
    navigate("/admin/signin")
  }

  const filteredItems = navItems.filter((item) =>
    item.roles.includes(user?.role)
  )

  const displayName = user?.name || (user?.role === "super_admin" ? "Super Admin" : "Agent")
  const displayRole = user?.role === "super_admin" ? "Super Admin" : "Agent"
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <aside className="w-64 h-screen flex flex-col border-r border-arcadia-sand/20 bg-arcadia-stone relative overflow-hidden">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, #8faa7c 0%, transparent 60%), radial-gradient(circle at 80% 80%, #5c4a3a 0%, transparent 60%)`,
        }}
      />
      {/* Logo */}
      <div className="relative px-6 pt-6 pb-4 border-b border-arcadia-sand/20">
        <img
          src={logoimage}
          alt="Arcadia Homes"
          className="w-40 scale-70 object-contain md:w-52"
          style={{ margin: "-40px -20px -10px -10px" }}
        />
        <p className="text-[10px] tracking-[0.25em] -mt-5 text-arcadia-sand/60 font-light">
          MODERN NATURE RESIDENCES
        </p>
      </div>
      {/* Role badge */}
      <div className="relative px-4 pt-4 pb-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-arcadia-moss/10 border border-arcadia-moss/20 w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-arcadia-moss animate-pulse" />
          <span className="text-[11px] text-arcadia-moss tracking-wide font-medium">
            {displayRole}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative flex flex-col gap-0.5 px-3 mt-2 flex-1">
        {filteredItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                  ? "bg-arcadia-moss text-arcadia-cream shadow-sm shadow-arcadia-moss/30"
                  : "text-arcadia-sand/70 hover:text-arcadia-cream hover:bg-arcadia-bark/40"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={17}
                    className={`shrink-0 transition-transform duration-200 ${isActive
                      ? "text-arcadia-cream"
                      : "text-arcadia-sand/50 group-hover:text-arcadia-cream group-hover:scale-110"
                      }`}
                  />
                  <span className="flex-1">{item.title}</span>
                  {isActive && (
                    <ChevronRight size={13} className="text-arcadia-cream/60" />
                  )}
                </>
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* Bottom User Section */}
      <div className="relative p-4 border-t border-arcadia-sand/20">
        {/* User card */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-arcadia-bark/40 mb-3">
          {/* Avatar */}
          <div className="w-9 h-9 rounded-lg bg-arcadia-moss/30 border border-arcadia-moss/40 flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-arcadia-moss">
              {initials}
            </span>
          </div>
          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-arcadia-cream font-medium truncate leading-tight">
              {displayName}
            </p>
            <p className="text-[11px] text-arcadia-sand/50 mt-0.5 truncate">
              {user?.email || "arcadia.homes"}
            </p>
          </div>
        </div>
        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-arcadia-bark/60 text-arcadia-sand/60 hover:bg-arcadia-bark/50 hover:text-arcadia-cream hover:border-arcadia-bark transition-all duration-200 text-sm">
          <LogOut size={15} />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar