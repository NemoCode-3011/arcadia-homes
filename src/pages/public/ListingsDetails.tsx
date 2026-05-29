import { useNavigate, useParams } from "react-router-dom"
import { properties } from "../../data/properties"
import { ArrowLeft, MapPin, BedDouble, Bath, Tag } from "lucide-react"

const ListingsDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const property = properties.find((p) => p.id === id)

  if (!property) {
    return (
      <div className="min-h-screen bg-arcadia-charcoal flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-4xl">🏚️</p>
          <p className="text-arcadia-cream font-medium">Property not found</p>
          <button
            onClick={() => navigate("/listings")}
            className="text-sm text-arcadia-moss hover:text-arcadia-leaf transition-colors"
          >
            Back to listings
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-arcadia-charcoal">

      {/* Hero Image */}
      <div className="relative w-full h-[55vh] overflow-hidden">
        <img
          src={property.image}
          alt={property.houseType}
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-arcadia-charcoal via-arcadia-charcoal/20 to-transparent" />

        {/* Back button over image */}
        <button
          onClick={() => navigate("/listings")}
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-lg bg-arcadia-charcoal/60 backdrop-blur-sm border border-arcadia-bark text-arcadia-cream text-sm hover:bg-arcadia-charcoal/80 transition-colors"
        >
          <ArrowLeft size={15} />
          Back to Listings
        </button>

        {/* Status badge over image */}
        <div className="absolute top-6 right-6">
          <span className="px-3 py-1.5 rounded-full bg-arcadia-moss text-arcadia-cream text-xs font-medium">
            {property.status}
          </span>
        </div>

        {/* Property title over image bottom */}
        <div className="absolute bottom-8 left-6 right-6">
          <h1 className="text-3xl lg:text-4xl font-semibold text-arcadia-cream">
            {property.houseType}
          </h1>
          <div className="flex items-center gap-1.5 mt-2">
            <MapPin size={14} className="text-arcadia-moss" />
            <p className="text-arcadia-sand text-sm">{property.location}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left — details */}
          <div className="lg:col-span-2 space-y-8">

            {/* Price + quick stats */}
            <div className="flex flex-wrap items-center gap-6">
              <p className="text-3xl font-semibold text-arcadia-leaf">
                ₦{property.price.toLocaleString()}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-arcadia-sand text-sm">
                  <BedDouble size={16} className="text-arcadia-moss" />
                  {property.bedrooms} Bedrooms
                </div>
                <div className="flex items-center gap-1.5 text-arcadia-sand text-sm">
                  <Bath size={16} className="text-arcadia-moss" />
                  {property.bathrooms} Bathrooms
                </div>
                <div className="flex items-center gap-1.5 text-arcadia-sand text-sm">
                  <Tag size={16} className="text-arcadia-moss" />
                  {property.houseType}
                </div>
              </div>
            </div>

            <hr className="border-arcadia-bark" />

            {/* Description */}
            <div className="space-y-3">
              <h2 className="text-arcadia-cream font-semibold text-lg">
                About this property
              </h2>
              <p className="text-arcadia-sand leading-relaxed">
                {property.description}
              </p>
            </div>

            <hr className="border-arcadia-bark" />

            {/* Property details grid */}
            <div className="space-y-3">
              <h2 className="text-arcadia-cream font-semibold text-lg">
                Property Details
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: "Property Type", value: property.houseType },
                  { label: "Location", value: property.location },
                  { label: "Status", value: property.status },
                  { label: "Bedrooms", value: property.bedrooms },
                  { label: "Bathrooms", value: property.bathrooms },
                  { label: "Price", value: `₦${property.price.toLocaleString()}` },
                ].map((detail) => (
                  <div
                    key={detail.label}
                    className="bg-arcadia-stone border border-arcadia-bark rounded-xl p-4 space-y-1"
                  >
                    <p className="text-xs text-arcadia-sand/60 tracking-wide uppercase">
                      {detail.label}
                    </p>
                    <p className="text-arcadia-cream text-sm font-medium">
                      {detail.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — agent card */}
          <div className="space-y-4">
            <div className="bg-arcadia-stone border border-arcadia-bark rounded-xl p-6 space-y-5 sticky top-6">

              <h3 className="text-arcadia-cream font-semibold">
                Contact Agent
              </h3>

              {/* Agent info */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-arcadia-moss/20 border border-arcadia-moss/30 flex items-center justify-center text-arcadia-moss font-bold text-lg">
                  {property.agent.name.charAt(0)}
                </div>
                <div>
                  <p className="text-arcadia-cream font-medium">
                    {property.agent.name}
                  </p>
                  <p className="text-arcadia-sand/60 text-xs">
                    Arcadia Agent
                  </p>
                </div>
              </div>

              <hr className="border-arcadia-bark" />

              {/* Contact details */}
              <div className="space-y-2">
                <p className="text-arcadia-sand text-sm">
                  📞 {property.agent.phone}
                </p>
                <p className="text-arcadia-sand text-sm">
                  📧 {property.agent.email}
                </p>
              </div>

              <hr className="border-arcadia-bark" />

              {/* CTA buttons */}
              <div className="space-y-3">
                <button className="w-full py-3 rounded-lg bg-arcadia-moss text-arcadia-cream text-sm font-medium hover:bg-arcadia-leaf transition-colors">
                  Schedule Viewing
                </button>
                <button className="w-full py-3 rounded-lg bg-arcadia-bark text-arcadia-cream text-sm font-medium hover:bg-arcadia-stone transition-colors">
                  Send Message
                </button>
              </div>
            </div>
            {/* Similar properties nudge */}
            <button
              onClick={() => navigate("/listings")}
              className="w-full py-3 rounded-lg border border-arcadia-bark text-arcadia-sand text-sm hover:text-arcadia-cream hover:border-arcadia-sand transition-colors"
            >
              View more properties →
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ListingsDetails