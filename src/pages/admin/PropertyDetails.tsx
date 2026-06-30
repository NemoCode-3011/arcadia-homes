import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { properties } from "../../data/properties"
import { agents } from "../../data/agents"
import { useAuth } from "../../context/AuthContext"
import { Loader2 } from "lucide-react"

const PropertyDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const isSuperAdmin = user?.role === "super_admin"

  const property = properties.find((p) => p.id === id)
  const [reassigning, setReassigning] = useState(false)
  const [selectedAgentId, setSelectedAgentId] = useState(property?.agent.id || "")

  const [editing, setEditing] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const [editData, setEditData] = useState({
    houseType: property?.houseType || "",
    location: property?.location || "",
    price: property?.price?.toString() || "",
    bedrooms: property?.bedrooms?.toString() || "",
    bathrooms: property?.bathrooms?.toString() || "",
    status: property?.status || "",
    description: property?.description || "",
  })

  if (!property) {
    return (
      <div className="p-6">
        <p className="text-arcadia-cream">Property not found</p>
      </div>
    )
  }

  if (!isSuperAdmin && property.agent.id !== user?.id) {
    return (
      <div className="p-6 space-y-3">
        <p className="text-arcadia-cream">This property isn't assigned to you.</p>
        <button
          onClick={() => navigate("/properties")}
          className="text-sm text-arcadia-moss hover:text-arcadia-leaf transition-colors"
        >
          ← Back to My Properties
        </button>
      </div>
    )
  }

  // ─── TODO: Replace with API call ──────────────────
  // const handleReassign = async () => {
  //   try {
  //     const response = await fetch(`/api/properties/${property.id}/reassign`, {
  //       method: "PATCH",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ agentId: selectedAgentId })
  //     })
  //     if (!response.ok) throw new Error("Failed to reassign")
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }
  // ───────────────────────────────────────────────────

  const handleReassign = () => {
    const newAgent = agents.find((a) => a.id === selectedAgentId)
    if (!newAgent) return

    property.agent = {
      id: newAgent.id,
      name: newAgent.name,
      phone: newAgent.phone,
      email: newAgent.email,
    }

    setReassigning(false)
  }

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setEditData({ ...editData, [e.target.name]: e.target.value })
  }

  // ─── TODO: Replace with API call ──────────────────
  // const handleSaveEdit = async () => {
  //   try {
  //     const response = await fetch(`/api/properties/${property.id}`, {
  //       method: "PATCH",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(editData)
  //     })
  //     if (!response.ok) throw new Error("Failed to update")
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }
  // ───────────────────────────────────────────────────

  const handleSaveEdit = () => {
    property.houseType = editData.houseType
    property.location = editData.location
    property.price = Number(editData.price)
    property.bedrooms = Number(editData.bedrooms)
    property.bathrooms = Number(editData.bathrooms)
    property.status = editData.status
    property.description = editData.description
    setEditing(false)
  }

  // ─── TODO: Replace with API call ──────────────────
  // const handleDelete = async () => {
  //   setDeleting(true)
  //   try {
  //     const response = await fetch(`/api/properties/${property.id}`, { method: "DELETE" })
  //     if (!response.ok) throw new Error("Failed to delete")
  //     navigate("/properties")
  //   } catch (err) {
  //     console.error(err)
  //   } finally {
  //     setDeleting(false)
  //   }
  // }
  // ───────────────────────────────────────────────────

  const handleDelete = () => {
    setDeleting(true)
    setTimeout(() => {
      const index = properties.findIndex((p) => p.id === property.id)
      if (index !== -1) properties.splice(index, 1)
      navigate("/properties")
    }, 600)
  }

  return (
    <div className="p-3 lg:p-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/properties")}
          className="text-2xl text-arcadia-sand"
        >
          ← Back to Properties
        </button>

        {!editing && !confirmDelete && (
          <div className="flex gap-3">
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 border border-arcadia-bark rounded-lg text-arcadia-sand text-sm hover:bg-arcadia-bark transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => setConfirmDelete(true)}
              className="px-4 py-2 border border-red-800 rounded-lg text-red-400 text-sm hover:bg-red-900/30 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {confirmDelete && (
        <div className="mt-4 p-4 bg-red-900/20 border border-red-800 rounded-xl flex items-center justify-between flex-wrap gap-3">
          <p className="text-red-400 text-sm">
            Delete <span className="font-medium text-arcadia-cream">{property.houseType}</span>? This can't be undone.
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-4 py-2 rounded-lg bg-red-900/40 border border-red-800 text-red-400 text-sm hover:bg-red-900/60 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {deleting ? <Loader2 size={14} className="animate-spin" /> : null}
              {deleting ? "Deleting..." : "Confirm Delete"}
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="px-4 py-2 rounded-lg border border-arcadia-bark text-arcadia-sand text-sm hover:bg-arcadia-bark transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div>
        <img
          src={property.image}
          alt="property"
          className="w-full h-96 object-cover rounded-xl mt-4"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

        <div className="lg:col-span-2">
          {editing ? (
            <div className="space-y-4 bg-arcadia-stone border border-arcadia-bark rounded-xl p-6">
              <h3 className="text-arcadia-cream font-semibold">Edit Property</h3>

              <div className="space-y-2">
                <label className="text-sm font-medium text-arcadia-sand">House Type</label>
                <input
                  name="houseType"
                  type="text"
                  value={editData.houseType}
                  onChange={handleEditChange}
                  className="w-full h-10 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream focus:outline-none focus:border-arcadia-moss"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-arcadia-sand">Location</label>
                <input
                  name="location"
                  type="text"
                  value={editData.location}
                  onChange={handleEditChange}
                  className="w-full h-10 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream focus:outline-none focus:border-arcadia-moss"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-arcadia-sand">Price</label>
                <input
                  name="price"
                  type="number"
                  value={editData.price}
                  onChange={handleEditChange}
                  className="w-full h-10 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream focus:outline-none focus:border-arcadia-moss"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-arcadia-sand">Bedrooms</label>
                  <input
                    name="bedrooms"
                    type="number"
                    value={editData.bedrooms}
                    onChange={handleEditChange}
                    className="w-full h-10 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream focus:outline-none focus:border-arcadia-moss"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-arcadia-sand">Bathrooms</label>
                  <input
                    name="bathrooms"
                    type="number"
                    value={editData.bathrooms}
                    onChange={handleEditChange}
                    className="w-full h-10 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream focus:outline-none focus:border-arcadia-moss"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-arcadia-sand">Status</label>
                <select
                  name="status"
                  value={editData.status}
                  onChange={handleEditChange}
                  className="w-full h-10 px-4 bg-arcadia-charcoal border border-arcadia-bark rounded-lg text-arcadia-cream focus:outline-none focus:border-arcadia-moss"
                >
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-arcadia-sand">Description</label>
                <textarea
                  name="description"
                  rows={4}
                  value={editData.description}
                  onChange={handleEditChange}
                  className="w-full px-4 py-3 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream focus:outline-none focus:border-arcadia-moss resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 py-3 rounded-lg bg-arcadia-moss text-arcadia-cream font-medium hover:bg-arcadia-leaf transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setEditing(false)
                    setEditData({
                      houseType: property.houseType,
                      location: property.location,
                      price: property.price.toString(),
                      bedrooms: property.bedrooms.toString(),
                      bathrooms: property.bathrooms.toString(),
                      status: property.status,
                      description: property.description,
                    })
                  }}
                  className="flex-1 py-3 rounded-lg border border-arcadia-bark text-arcadia-sand hover:text-arcadia-cream transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-arcadia-cream">{property.houseType}</h2>
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-arcadia-moss text-arcadia-cream">
                  {property.status}
                </span>
              </div>
              <p className="text-arcadia-sand mt-1">📍 {property.location}</p>
              <p className="text-xl font-semibold text-arcadia-leaf mt-3">
                ₦{property.price.toLocaleString()}
              </p>
              <hr className="border-arcadia-bark my-6" />
              <div className="flex gap-6">
                <p className="text-arcadia-cream">🛏 {property.bedrooms} Bedrooms</p>
                <p className="text-arcadia-cream">🚿 {property.bathrooms} Bathrooms</p>
              </div>
              <hr className="border-arcadia-bark my-6" />
              <h3 className="text-arcadia-cream font-semibold mb-2">Description</h3>
              <p className="text-arcadia-sand leading-relaxed">{property.description}</p>
            </>
          )}
        </div>

        <div className="bg-arcadia-stone rounded-xl p-6 h-fit space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-arcadia-cream font-semibold">Listed by</h3>
            {isSuperAdmin && !reassigning && (
              <button
                onClick={() => setReassigning(true)}
                className="text-xs text-arcadia-moss hover:text-arcadia-leaf transition-colors"
              >
                Reassign
              </button>
            )}
          </div>

          {reassigning ? (
            <div className="space-y-3">
              <select
                value={selectedAgentId}
                onChange={(e) => setSelectedAgentId(e.target.value)}
                className="w-full h-10 px-4 bg-arcadia-charcoal border border-arcadia-bark rounded-lg text-arcadia-cream focus:outline-none focus:border-arcadia-moss"
              >
                {agents.map((agent) => (
                  <option key={agent.id} value={agent.id}>{agent.name}</option>
                ))}
              </select>
              <div className="flex gap-2">
                <button
                  onClick={handleReassign}
                  className="flex-1 py-2 rounded-lg bg-arcadia-moss text-arcadia-cream text-sm font-medium hover:bg-arcadia-leaf transition-colors"
                >
                  Confirm
                </button>
                <button
                  onClick={() => {
                    setReassigning(false)
                    setSelectedAgentId(property.agent.id)
                  }}
                  className="flex-1 py-2 rounded-lg border border-arcadia-bark text-arcadia-sand text-sm hover:text-arcadia-cream transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-arcadia-moss flex items-center justify-center text-arcadia-cream font-bold">
                  {property.agent.name.charAt(0)}
                </div>
                <p className="text-arcadia-cream font-medium">{property.agent.name}</p>
              </div>

              <hr className="border-arcadia-bark" />

              <div className="space-y-2">
                <p className="text-arcadia-sand text-sm">📞 {property.agent.phone}</p>
                <p className="text-arcadia-sand text-sm">📧 {property.agent.email}</p>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  )
}

export default PropertyDetails