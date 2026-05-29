import { useNavigate } from "react-router-dom"
import logo from "../../assets/logo-img-5.png"
import { CiLinkedin } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const navigate = useNavigate()

  return (
    <footer className="bg-arcadia-charcoal border-t border-arcadia-bark">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="space-y-4 lg:col-span-2">
          <img
            src={logo}
            alt="Arcadia"
            className="h-20 w-auto object-contain scale-180"
          />
          <p className="text-xs tracking-widest text-arcadia-sand">
            MODERN NATURE RESIDENCES
          </p>
          <p className="text-arcadia-sand text-sm leading-relaxed max-w-xs">
            Arcadia connects discerning buyers and renters with premium properties across Nigeria's most prestigious locations.
          </p>
          {/* Social Links */}
          <div className="flex gap-4 pt-2">
            <button className="text-arcadia-sand hover:text-arcadia-cream text-sm transition-colors">
            <FaXTwitter />
            </button>
            <button className="text-arcadia-sand hover:text-arcadia-cream text-sm transition-colors">
              <FaInstagram />
            </button>
            <button className="text-arcadia-sand hover:text-arcadia-cream text-xl transition-colors">
             <CiLinkedin />
            </button>
          </div>
        </div>
        {/* Column 2 — Quick Links */}
        <div className="space-y-4">
          <h3 className="text-arcadia-cream font-semibold text-sm tracking-wide">
            Quick Links
          </h3>
          <div className="flex flex-col gap-3">
            {[
              { label: "Home", path: "/" },
              { label: "Listings", path: "/listings" },
              { label: "About", path: "/about" },
              { label: "Contact", path: "/contact" },
            ].map((link) => (
              <button
                key={link.label}
                onClick={() => navigate(link.path)}
                className="text-arcadia-sand hover:text-arcadia-cream text-sm text-left transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Column 3 — Properties */}
        <div className="space-y-4">
          <h3 className="text-arcadia-cream font-semibold text-sm tracking-wide">
            Properties
          </h3>
          <div className="flex flex-col gap-3">
            {[
              { label: "For Sale", path: "/listings?status=For Sale" },
              { label: "For Rent", path: "/listings?status=For Rent" },
              { label: "Luxury Villas", path: "/listings?type=Luxury Villa" },
              { label: "Apartments", path: "/listings?type=Apartments" },
              { label: "Duplexes", path: "/listings?type=Duplex" },
            ].map((link) => (
              <button
                key={link.label}
                onClick={() => navigate(link.path)}
                className="text-arcadia-sand hover:text-arcadia-cream text-sm text-left transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Contact Bar */}
      <div className="border-t border-arcadia-bark">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 text-sm text-arcadia-sand">
            <span>📧 hello@arcadiaresidences.com</span>
            <span>📞 +234 801 234 5678</span>
            <span>📍 Victoria Island, Lagos</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-arcadia-bark">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-arcadia-sand text-xs">
            © 2026 Arcadia Modern Nature Residences. All rights reserved.
          </p>
          <div className="flex gap-4">
            <button className="text-arcadia-sand hover:text-arcadia-cream text-xs transition-colors">
              Privacy Policy
            </button>
            <button className="text-arcadia-sand hover:text-arcadia-cream text-xs transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer