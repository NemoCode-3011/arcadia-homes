import { NavLink } from "react-router-dom"
import logoimage from "/react/arcadia-homes/src/assets/logo-img-3.png"


interface SideBarProp {
  onClose: () => void
}
const Sidebar = ({onClose}: SideBarProp) => {

  return (
    <aside className="w-64 h-screen flex flex-col  border-r border-arcadia-sand bg-arcadia-stone">
      {/* Logo */}
      <div className="p-6 border-b border-arcadia-sand ">
        <img src={logoimage} alt="" className="w-40 object-contain md:w-52" style={{margin: '-40px -20px -10px -10px'}} />
        <p className="text-xs tracking-widest -mt-5" style={{ color: '#E6E6E6' }}>
          MODERN NATURE RESIDENCES
        </p>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 px-4 mt-4">
        <NavLink
          to="/admin-dashboard"
          onClick={onClose}
          className={({ isActive }) =>
            `px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
              ? "bg-arcadia-moss text-arcadia-cream" : "text-arcadia-sand hover:text-arcadia-cream hover:bg-arcadia-bark"
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/properties"
           onClick={onClose}
          className={({ isActive }) =>
            `px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
              ? "bg-arcadia-moss text-arcadia-cream" : "text-arcadia-sand hover:text-arcadia-cream hover:bg-arcadia-bark"
            }`
          }>Properties
        </NavLink>
        <NavLink
          to="/messages"
           onClick={onClose}
          className={({ isActive }) =>
            `px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
              ? "bg-arcadia-moss text-arcadia-cream" : "text-arcadia-sand hover:text-arcadia-cream hover:bg-arcadia-bark"
            }`
          }
        >
          Messages
        </NavLink>
        <NavLink
          to="/agents"
           onClick={onClose}
          className={({ isActive }) =>
            `px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
              ? "bg-arcadia-moss text-arcadia-cream" : "text-arcadia-sand hover:text-arcadia-cream hover:bg-arcadia-bark"
            }`
          }
        >
          Manage Agents
        </NavLink>
        <NavLink
          to="/settings"
           onClick={onClose}
          className={({ isActive }) =>
            `px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
              ? "bg-arcadia-moss text-arcadia-cream" : "text-arcadia-sand hover:text-arcadia-cream hover:bg-arcadia-bark"
            }`
          }
        >
          Settings
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar