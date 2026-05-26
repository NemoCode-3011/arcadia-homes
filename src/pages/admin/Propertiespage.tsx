import PropertyCard from "../../components/ui/PropertyCard"
import FilterBar from "../../components/ui/FilterBar"
import { useState } from "react"
import { properties } from "../../data/properties"
import { Upload } from "lucide-react"

const Propertiespage = () => {
  const [activeFilter, setActiveFIlter] = useState("All")


  const filtered = activeFilter === "All" ? properties : properties.filter((p) => p.status === activeFilter)

  const [openModal, setOpenModal] = useState(false)

  const [formData, setFormData] = useState({
    housetype: "",
    location: "",
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    status: "For Sale",
    description: ""
  })

  return (
    <div className="space-y-5">
      <header className="space-y-3 ">
        <div className="flex justify-between">
          <h1 className="text-3xl text-arcadia-cream font-semibold">All Properties</h1>
          <div>
            <h1 onClick={() => setOpenModal(true)} className="text-4xl text-arcadia-sand">+</h1>
          </div>
        </div>
        <p className="text-arcadia-sand font-sm">Browse the current listings</p>
      </header>
      <div>
        <FilterBar
          active={activeFilter}
          onFilterChange={setActiveFIlter} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4  mt-6">
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
      {openModal && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
          onClick={() => setOpenModal(false)}>
          <div
            className="w-full max-w-lg h-[90vh] bg-arcadia-stone rounded-2xl shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-arcadia-bark sticky top-0 bg-arcadia-stone z-10">
              <h1 className="text-2xl font-semibold text-arcadia-cream">Add Property</h1>
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 border border-arcadia-bark rounded-xl text-arcadia-sand hover:bg-arcadia-bark transition-colors">
                Done
              </button>
            </div>
            {/* Form */}
            <div className="p-6">
              <form className="space-y-5">
                {/* Image Upload */}
                <div>
                  <label className="border-2 border-dashed border-arcadia-bark rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-arcadia-moss transition-colors w-full">
                    <Upload className="w-10 h-10 text-arcadia-sand mb-2" />
                    <p className="text-sm text-arcadia-sand">Upload Property Image</p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                </div>
                {/* House Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-arcadia-sand">
                    House Type <sup className="text-red-500">*</sup>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g Luxury Villa, Duplex"
                    className="w-full h-10 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss"
                  />
                </div>
                {/* Location */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-arcadia-sand">
                    Location <sup className="text-red-500">*</sup>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g Lekki, Lagos"
                    className="w-full h-10 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss"
                  />
                </div>
                {/* Price */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-arcadia-sand">
                    Price <sup className="text-red-500">*</sup>
                  </label>
                  <input
                    type="number"
                    placeholder="e.g 45000000"
                    className="w-full h-10 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss" />
                </div>
                {/* Bedrooms and Bathrooms side by side */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-arcadia-sand">
                      Bedrooms <sup className="text-red-500">*</sup>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g 4"
                      className="w-full h-10 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-arcadia-sand">
                      Bathrooms <sup className="text-red-500">*</sup>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g 3"
                      className="w-full h-10 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss"
                    />
                  </div>
                </div>
                {/* Status */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-arcadia-sand">
                    Status <sup className="text-red-500">*</sup>
                  </label>
                  <select className="w-full h-10 px-4 bg-arcadia-stone border border-arcadia-bark rounded-lg text-arcadia-cream focus:outline-none focus:border-arcadia-moss">
                    <option value="">Select Status</option>
                    <option value="For Sale">For Sale</option>
                    <option value="For Rent">For Rent</option>
                  </select>
                </div>
                {/* Agent */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-arcadia-sand">
                    Agent <sup className="text-red-500">*</sup>
                  </label>
                  <select className="w-full h-10 px-4 bg-arcadia-stone border border-arcadia-bark rounded-lg text-arcadia-cream focus:outline-none focus:border-arcadia-moss">
                    <option value="">Select Agent</option>
                    <option value="1">Vivian A.</option>
                    <option value="2">Lekan A.</option>
                    <option value="3">Hannah O.</option>
                    <option value="4">Israel J.</option>
                  </select>
                </div>
                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-arcadia-sand">
                    Description <sup className="text-red-500">*</sup>
                  </label>
                  <textarea
                    placeholder="Enter property description"
                    rows={4}
                    className="w-full px-4 py-3 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss resize-none"
                  />
                </div>
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-arcadia-moss text-arcadia-cream font-medium hover:bg-arcadia-leaf transition-colors">
                  Add Property
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Propertiespage