import { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import logo from "../../assets/logo-img-5.png"

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-arcadia-charcoal shadow-lg py-3" : "bg-transparent py-5"
      }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <img src={logo} alt="Arcadia" className="h-20 w-auto object-contain scale-110" />
        </div>

        {/* Desktop Links — ALL in one container */}
        <div className="hidden lg:flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${isActive ? "text-arcadia-cream" : "text-arcadia-sand hover:text-arcadia-cream"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/listings"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${isActive ? "text-arcadia-cream" : "text-arcadia-sand hover:text-arcadia-cream"
              }`
            }
          >
            Listings
          </NavLink>
          <NavLink
            to="/aboutus"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${isActive ? "text-arcadia-cream" : "text-arcadia-sand hover:text-arcadia-cream"
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contactus"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${isActive ? "text-arcadia-cream" : "text-arcadia-sand hover:text-arcadia-cream"
              }`
            }
          >
            Contact
          </NavLink>
        </div>

        {/* Right side — Sign In + Get Started */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={() => navigate("/signin")}
            className="text-sm font-medium text-arcadia-sand hover:text-arcadia-cream transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 rounded-lg bg-arcadia-moss text-arcadia-cream text-sm font-medium hover:bg-arcadia-leaf transition-colors"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-arcadia-cream text-2xl"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-arcadia-charcoal px-6 py-4 space-y-4 border-t border-arcadia-bark">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className="block text-arcadia-sand hover:text-arcadia-cream text-sm font-medium">Home</NavLink>
          <NavLink to="/listings" onClick={() => setMenuOpen(false)} className="block text-arcadia-sand hover:text-arcadia-cream text-sm font-medium">Listings</NavLink>
          <NavLink to="/aboutus" onClick={() => setMenuOpen(false)} className="block text-arcadia-sand hover:text-arcadia-cream text-sm font-medium">About</NavLink>
          <NavLink to="/contactus" onClick={() => setMenuOpen(false)} className="block text-arcadia-sand hover:text-arcadia-cream text-sm font-medium">Contact</NavLink>
          <hr className="border-arcadia-bark" />
          <button onClick={() => { navigate("/signin"); setMenuOpen(false) }} className="block text-arcadia-sand hover:text-arcadia-cream text-sm font-medium">Sign In</button>
          <button onClick={() => { navigate("/signup"); setMenuOpen(false) }} className="w-full py-2 rounded-lg bg-arcadia-moss text-arcadia-cream text-sm font-medium">Get Started</button>
        </div>
      )}
    </nav>
  )
}

export default Navbar