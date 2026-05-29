import { useState, useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { properties } from "../../data/properties"
import PropertyCard from "../../components/ui/PropertyCard"
import { SlidersHorizontal, X } from "lucide-react"

const ListingsPage = () => {
  const [searchParams] = useSearchParams()

  // Read ?status= from URL (coming from landing page Buy/Rent buttons)
  const initialTab = searchParams.get("status") === "For Sale"
    ? "buy"
    : searchParams.get("status") === "For Rent"
      ? "rent"
      : "all"

  const [activeTab, setActiveTab] = useState(initialTab)
  const [showFilters, setShowFilters] = useState(false)

  // Filter state
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [bedrooms, setBedrooms] = useState("")

  // Unique values for dropdowns
  const locations = [...new Set(properties.map((p) => p.location))]
  const houseTypes = [...new Set(properties.map((p) => p.houseType))]

  // Normalize status for comparison
  const normalize = (str: string) => str.toLowerCase().replace(/\s/g, "")

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      // Tab filter
      if (activeTab === "buy" && normalize(p.status) !== "forsale") return false
      if (activeTab === "rent" && normalize(p.status) !== "forrent") return false

      // Location filter
      if (selectedLocation && p.location !== selectedLocation) return false

      // House type filter
      if (selectedType && p.houseType !== selectedType) return false

      // Price filter
      if (minPrice && p.price < Number(minPrice)) return false
      if (maxPrice && p.price > Number(maxPrice)) return false

      // Bedrooms filter
      if (bedrooms && p.bedrooms < Number(bedrooms)) return false

      return true
    })
  }, [activeTab, selectedLocation, selectedType, minPrice, maxPrice, bedrooms])

  const clearFilters = () => {
    setSelectedLocation("")
    setSelectedType("")
    setMinPrice("")
    setMaxPrice("")
    setBedrooms("")
  }

  const hasActiveFilters =
    selectedLocation || selectedType || minPrice || maxPrice || bedrooms

  return (
    <div className="min-h-screen bg-arcadia-charcoal">
      {/* Page Header */}
      <div className="bg-arcadia-stone border-b border-arcadia-bark px-6 py-10">
        <div className="max-w-7xl mx-auto space-y-2 mt-25">
          <p className="text-xs tracking-widest text-arcadia-moss uppercase">
            Explore
          </p>
          <h1 className="text-3xl font-semibold text-arcadia-cream">
            All Properties
          </h1>
          <p className="text-arcadia-sand text-sm">
            {filtered.length} {filtered.length === 1 ? "property" : "properties"} found
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Tabs + Filter toggle row */}
        <div className="flex items-center justify-between">
          {/* Tabs */}
          <div className="flex items-center bg-arcadia-stone rounded-lg p-1 gap-1">
            {[
              { label: "All", value: "all" },
              { label: "Buy", value: "buy" },
              { label: "Rent", value: "rent" },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === tab.value
                    ? "bg-arcadia-moss text-arcadia-cream shadow-sm"
                    : "text-arcadia-sand hover:text-arcadia-cream"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filter toggle button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${showFilters || hasActiveFilters
                ? "border-arcadia-moss text-arcadia-moss bg-arcadia-moss/10"
                : "border-arcadia-bark text-arcadia-sand hover:text-arcadia-cream hover:border-arcadia-sand"
              }`}
          >
            <SlidersHorizontal size={15} />
            Filters
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-arcadia-moss" />
            )}
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-arcadia-stone border border-arcadia-bark rounded-xl p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

              {/* Location */}
              <div className="space-y-1.5">
                <label className="text-xs text-arcadia-sand font-medium tracking-wide">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full h-10 px-3 bg-arcadia-bark border border-arcadia-bark rounded-lg text-arcadia-cream text-sm focus:outline-none focus:border-arcadia-moss transition-colors"
                >
                  <option value="">All Locations</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* House Type */}
              <div className="space-y-1.5">
                <label className="text-xs text-arcadia-sand font-medium tracking-wide">
                  Property Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full h-10 px-3 bg-arcadia-bark border border-arcadia-bark rounded-lg text-arcadia-cream text-sm focus:outline-none focus:border-arcadia-moss transition-colors"
                >
                  <option value="">All Types</option>
                  {houseTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Min Price */}
              <div className="space-y-1.5">
                <label className="text-xs text-arcadia-sand font-medium tracking-wide">
                  Min Price (₦)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 500000"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full h-10 px-3 bg-arcadia-bark border border-arcadia-bark rounded-lg text-arcadia-cream text-sm placeholder:text-arcadia-bark/80 focus:outline-none focus:border-arcadia-moss transition-colors"
                />
              </div>

              {/* Max Price */}
              <div className="space-y-1.5">
                <label className="text-xs text-arcadia-sand font-medium tracking-wide">
                  Max Price (₦)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 50000000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full h-10 px-3 bg-arcadia-bark border border-arcadia-bark rounded-lg text-arcadia-cream text-sm placeholder:text-arcadia-bark/80 focus:outline-none focus:border-arcadia-moss transition-colors"
                />
              </div>

              {/* Bedrooms */}
              <div className="space-y-1.5">
                <label className="text-xs text-arcadia-sand font-medium tracking-wide">
                  Min Bedrooms
                </label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full h-10 px-3 bg-arcadia-bark border border-arcadia-bark rounded-lg text-arcadia-cream text-sm focus:outline-none focus:border-arcadia-moss transition-colors"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>
            </div>

            {/* Clear filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 text-xs text-arcadia-sand hover:text-arcadia-cream transition-colors"
              >
                <X size={13} />
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Property Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-3">
            <p className="text-4xl">🏚️</p>
            <p className="text-arcadia-cream font-medium">No properties found</p>
            <p className="text-arcadia-sand text-sm">Try adjusting your filters</p>
            <button
              onClick={clearFilters}
              className="mt-2 text-sm text-arcadia-moss hover:text-arcadia-leaf transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((property) => (
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
        )}
      </div>
    </div>
  )
}

export default ListingsPage