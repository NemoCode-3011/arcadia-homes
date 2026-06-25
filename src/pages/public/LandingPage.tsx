import { useNavigate } from "react-router-dom"
import { ParallaxProvider, Parallax } from "react-scroll-parallax"
import { properties } from "../../data/properties"
import PropertyCard from "../../components/ui/PropertyCard"
import house4 from "../../assets/house23.jpg"

const LandingPage = () => {
  const navigate = useNavigate()
  const featured = properties.slice(0, 3)

  return (
    <ParallaxProvider>
      <div className="bg-arcadia-charcoal">
        {/* ─── HERO SECTION ─── */}
        <section className="relative h-[130vh] flex items-center justify-center overflow-hidden ">
          {/* Background Image with Parallax */}
          <Parallax speed={-15} className="absolute inset-0 w-full h-full">
            <img
              src={house4}
              alt="Arcadia"
              className="w-full h-full object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60" />
          </Parallax>
          {/* Hero Content */}
          <div className="relative z-10 text-center px-6 space-y-6 mt-10">
            <p className="text-xs tracking-[0.4em] text-arcadia-sand uppercase">
              Modern Nature Residences
            </p>
            <h1 className="text-5xl lg:text-7xl font-semibold text-arcadia-cream leading-tight">
              Find Your <br />
              <span className="text-arcadia-leaf">Sanctuary</span>
            </h1>
            <p className="text-arcadia-sand text-lg max-w-md mx-auto leading-relaxed">
              Premium properties in Nigeria's most prestigious locations. Built for those who value nature, design, and privacy.
            </p>

            {/* Buy / Rent Toggle */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => navigate("/listings?status=For Sale")}
                className="px-8 py-3 rounded-lg bg-arcadia-moss text-arcadia-cream font-medium hover:bg-arcadia-leaf transition-colors"
              >
                Buy
              </button>
              <button
                onClick={() => navigate("/listings?status=For Rent")}
                className="px-8 py-3 rounded-lg border border-arcadia-cream text-arcadia-cream font-medium hover:bg-arcadia-cream/10 transition-colors"
              >
                Rent
              </button>
            </div>

            {/* Scroll hint */}
            <div className="pt-8 flex flex-col items-center gap-2 animate-bounce">
              <p className="text-arcadia-sand text-xs tracking-widest">SCROLL</p>
              <div className="w-px h-8 bg-arcadia-sand" />
            </div>
          </div>
        </section>
        {/* ─── FEATURED PROPERTIES ─── */}
        <section className="bg-arcadia-cream py-24 px-6">
          <div className="max-w-7xl mx-auto space-y-12">
            {/* Section Header */}
            <div className="flex items-end justify-between">
              <div className="space-y-2">
                <p className="text-xs tracking-widest text-arcadia-moss uppercase">
                  Handpicked For You
                </p>
                <h2 className="text-4xl font-semibold text-arcadia-charcoal">
                  Featured Properties
                </h2>
              </div>
              <button
                onClick={() => navigate("/listings")}
                className="text-sm text-arcadia-moss hover:text-arcadia-bark transition-colors font-medium"
              >
                View all →
              </button>
            </div>

            {/* Property Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((property) => (
                <PropertyCard
                  key={property.id}
                  id={property.id}
                  image={property.image}
                  status={property.status}
                  houseType={property.houseType}
                  location={property.location}
                  price={property.price}
                  bedrooms={property.bedrooms}
                  bathrooms={property.bathrooms}
                />
              ))}
            </div>

          </div>
        </section>

        {/* ─── WHY ARCADIA ─── */}
        <section className="relative py-24 px-6 overflow-hidden">

          {/* Background with Parallax */}
          <Parallax speed={-10} className="absolute inset-0">
            <img
              src={house4}
              alt="Why Arcadia"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-arcadia-charcoal/90" />
          </Parallax>

          <div className="relative z-10 max-w-7xl mx-auto space-y-16">

            {/* Header */}
            <div className="text-center space-y-3">
              <p className="text-xs tracking-widest text-arcadia-moss uppercase">
                The Arcadia Difference
              </p>
              <h2 className="text-4xl font-semibold text-arcadia-cream">
                Why Choose Arcadia?
              </h2>
            </div>

            {/* Three Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                {
                  icon: "🏡",
                  title: "Premium Listings",
                  description: "Every property is carefully vetted and selected to meet our high standards of quality and design."
                },
                {
                  icon: "🤝",
                  title: "Trusted Agents",
                  description: "Our experienced agents guide you through every step — from first viewing to final handover."
                },
                {
                  icon: "🌿",
                  title: "Nature First",
                  description: "We believe homes should connect you to nature. Every Arcadia property reflects that philosophy."
                }
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-arcadia-stone/60 backdrop-blur-sm border border-arcadia-bark rounded-2xl p-8 space-y-4 text-center"
                >
                  <span className="text-4xl">{item.icon}</span>
                  <h3 className="text-arcadia-cream font-semibold text-lg">
                    {item.title}
                  </h3>
                  <p className="text-arcadia-sand text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ─── STATS SECTION ─── */}
        <section className="bg-arcadia-cream py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { value: "124+", label: "Properties Listed" },
                { value: "40+", label: "Properties Sold" },
                { value: "30+", label: "Happy Renters" },
                { value: "10+", label: "Expert Agents" },
              ].map((stat) => (
                <div key={stat.label} className="space-y-2">
                  <h3 className="text-4xl font-semibold text-arcadia-charcoal">
                    {stat.value}
                  </h3>
                  <p className="text-arcadia-moss text-sm font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA SECTION ─── */}
        <section className="relative py-32 px-6 overflow-hidden">
          {/* Background with Parallax */}
          <Parallax speed={-8} className="absolute inset-0">
            <img
              src={house4}
              alt="CTA"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70" />
          </Parallax>

          {/* Content */}
          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
            <p className="text-xs tracking-widest text-arcadia-moss uppercase">
              Begin Your Journey
            </p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-arcadia-cream leading-tight">
              Find Your Perfect Home Today
            </h2>
            <p className="text-arcadia-sand leading-relaxed">
              Whether you're buying or renting, Arcadia has a property that matches your lifestyle and vision.
            </p>
            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={() => navigate("/listings")}
                className="px-8 py-3 rounded-lg bg-arcadia-moss text-arcadia-cream font-medium hover:bg-arcadia-leaf transition-colors"
              >
                Explore Properties
              </button>
              <button
                onClick={() => navigate("/contactus")}
                className="px-8 py-3 rounded-lg border border-arcadia-cream text-arcadia-cream font-medium hover:bg-arcadia-cream/10 transition-colors"
              >
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </div>
    </ParallaxProvider>
  )
}
export default LandingPage