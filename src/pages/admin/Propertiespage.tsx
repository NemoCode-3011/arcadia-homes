import PropertyCard from "../../components/ui/PropertyCard"
import FilterBar from "../../components/ui/FilterBar"
import { useState } from "react"
import { agents } from "../../data/agents"
import { useAuth } from "../../context/AuthContext"
import { useProperties } from "../../context/PropertiesContext"
import { Upload, Loader2 } from "lucide-react"

const Propertiespage = () => {
  const { user } = useAuth()
  const { properties, addProperty } = useProperties()
  const isSuperAdmin = user?.role === "super_admin"

  const [activeFilter, setActiveFIlter] = useState("All")

  const visibleProperties = isSuperAdmin
    ? properties
    : properties.filter((p) => p.agent.id === user?.id)

  const filtered = activeFilter === "All"
    ? visibleProperties
    : visibleProperties.filter((p) => p.status === activeFilter)

  const [openModal, setOpenModal] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    houseType: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    status: "",
    description: "",
    agentId: isSuperAdmin ? "" : user?.id || "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError("")
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImagePreview(URL.createObjectURL(file))
  }

  // ─── TODO: Replace with API call ──────────────────
  // const handleAddProperty = async () => {
  //   setLoading(true)
  //   try {
  //     const response = await fetch("/api/properties", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData)
  //     })
  //     const data = await response.json()
  //     if (!response.ok) throw new Error(data.message)
  //     addProperty(data.property)
  //     setOpenModal(false)
  //   } catch (err: any) {
  //     setError(err.message || "Something went wrong")
  //   } finally {
  //     setLoading(false)
  //   }
  // }
  // ───────────────────────────────────────────────────

  const handleAddProperty = () => {
    const finalAgentId = isSuperAdmin ? formData.agentId : user?.id

    if (
      !formData.houseType || !formData.location || !formData.price ||
      !formData.bedrooms || !formData.bathrooms || !formData.status ||
      !formData.description || !finalAgentId
    ) {
      setError("Please fill in all fields.")
      return
    }

    setLoading(true)
    setError("")

    setTimeout(() => {
      const agent = agents.find((a) => a.id === finalAgentId)

      const newProperty = {
        id: Date.now().toString(),
        image: imagePreview || "",
        status: formData.status,
        houseType: formData.houseType,
        location: formData.location,
        price: Number(formData.price),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        description: formData.description,
        agent: {
          id: finalAgentId,
          name: agent?.name || user?.name || "Unknown Agent",
          phone: agent?.phone || "",
          email: agent?.email || "",
        },
      }

      addProperty(newProperty) // goes into shared context — visible on ALL pages
      setLoading(false)
      setOpenModal(false)
      setImagePreview(null)
      setFormData({
        houseType: "", location: "", price: "", bedrooms: "",
        bathrooms: "", status: "", description: "",
        agentId: isSuperAdmin ? "" : user?.id || "",
      })
    }, 800)
  }

  return (
    <div className="space-y-5">
      <header className="space-y-3">
        <div className="flex justify-between">
          <h1 className="text-3xl text-arcadia-cream font-semibold">
            {isSuperAdmin ? "All Properties" : "My Properties"}
          </h1>
          <h1 onClick={() => setOpenModal(true)} className="text-4xl text-arcadia-sand cursor-pointer">+</h1>
        </div>
        <p className="text-arcadia-sand text-sm">
          {isSuperAdmin ? "Browse the current listings" : "Properties assigned to you"}
        </p>
      </header>

      <FilterBar active={activeFilter} onFilterChange={setActiveFIlter} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {filtered.length === 0 && (
          <p className="text-arcadia-sand text-sm col-span-full text-center py-12">
            No properties yet.
          </p>
        )}
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
            linkTo={`/propertiesdetail/${property.id}`}
          />
        ))}
      </div>

      {openModal && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
          onClick={() => { setOpenModal(false); setImagePreview(null) }}>
          <div
            className="w-full max-w-lg h-[90vh] bg-arcadia-stone rounded-2xl shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-arcadia-bark sticky top-0 bg-arcadia-stone z-10">
              <h1 className="text-2xl font-semibold text-arcadia-cream">Add Property</h1>
              <button
                onClick={() => { setOpenModal(false); setImagePreview(null) }}
                className="px-4 py-2 border border-arcadia-bark rounded-xl text-arcadia-sand hover:bg-arcadia-bark transition-colors">
                Close
              </button>
            </div>

            <div className="p-6 space-y-5">
              {error && (
                <div className="px-4 py-3 rounded-lg bg-red-900/30 border border-red-800 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Image Upload */}
              <div>
                {imagePreview ? (
                  <div className="relative">
                    <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-xl" />
                    <button type="button" onClick={() => setImagePreview(null)}
                      className="absolute top-2 right-2 px-3 py-1.5 rounded-lg bg-arcadia-charcoal/80 text-arcadia-cream text-xs hover:bg-red-900/60 transition-colors">
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-arcadia-bark rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-arcadia-moss transition-colors w-full">
                    <Upload className="w-10 h-10 text-arcadia-sand mb-2" />
                    <p className="text-sm text-arcadia-sand">Upload Property Image</p>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                )}
              </div>

              {/* House Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-arcadia-sand">House Type <sup className="text-red-500">*</sup></label>
                <input name="houseType" type="text" placeholder="e.g Luxury Villa, Duplex"
                  value={formData.houseType} onChange={handleChange}
                  className="w-full h-10 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss" />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-arcadia-sand">Location <sup className="text-red-500">*</sup></label>
                <input name="location" type="text" placeholder="e.g Lekki, Lagos"
                  value={formData.location} onChange={handleChange}
                  className="w-full h-10 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss" />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-arcadia-sand">Price <sup className="text-red-500">*</sup></label>
                <input name="price" type="number" placeholder="e.g 45000000"
                  value={formData.price} onChange={handleChange}
                  className="w-full h-10 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss" />
              </div>

              {/* Bedrooms + Bathrooms */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-arcadia-sand">Bedrooms <sup className="text-red-500">*</sup></label>
                  <input name="bedrooms" type="number" placeholder="e.g 4"
                    value={formData.bedrooms} onChange={handleChange}
                    className="w-full h-10 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-arcadia-sand">Bathrooms <sup className="text-red-500">*</sup></label>
                  <input name="bathrooms" type="number" placeholder="e.g 3"
                    value={formData.bathrooms} onChange={handleChange}
                    className="w-full h-10 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss" />
                </div>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-arcadia-sand">Status <sup className="text-red-500">*</sup></label>
                <select name="status" value={formData.status} onChange={handleChange}
                  className="w-full h-10 px-4 bg-arcadia-stone border border-arcadia-bark rounded-lg text-arcadia-cream focus:outline-none focus:border-arcadia-moss">
                  <option value="">Select Status</option>
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                </select>
              </div>

              {/* Listed by */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-arcadia-sand">
                  Listed by {isSuperAdmin && <sup className="text-red-500">*</sup>}
                </label>
                {isSuperAdmin ? (
                  <select name="agentId" value={formData.agentId} onChange={handleChange}
                    className="w-full h-10 px-4 bg-arcadia-stone border border-arcadia-bark rounded-lg text-arcadia-cream focus:outline-none focus:border-arcadia-moss">
                    <option value="">Select Agent</option>
                    <option value={user?.id}>Myself ({user?.name})</option>
                    {agents.map((agent) => (
                      <option key={agent.id} value={agent.id}>{agent.name}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-arcadia-cream text-sm px-4 py-2 bg-arcadia-bark/40 rounded-lg">
                    {user?.name} (you)
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-arcadia-sand">Description <sup className="text-red-500">*</sup></label>
                <textarea name="description" placeholder="Enter property description" rows={4}
                  value={formData.description} onChange={handleChange}
                  className="w-full px-4 py-3 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss resize-none" />
              </div>

              {/* Submit */}
              <button type="button" onClick={handleAddProperty} disabled={loading}
                className="w-full py-3 rounded-lg bg-arcadia-moss text-arcadia-cream font-medium hover:bg-arcadia-leaf transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading ? (<><Loader2 size={18} className="animate-spin" /> Adding...</>) : "Add Property"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Propertiespage