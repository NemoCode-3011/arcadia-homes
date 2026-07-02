import { agents as allAgents } from "../../data/agents"
import { useProperties } from "../../context/PropertiesContext"
import { messages } from "../../data/messages"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { Loader2, CheckCircle } from "lucide-react"

const ManageAgentPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { properties } = useProperties()
  const isSuperAdmin = user?.role === "super_admin"

  const [openModal, setOpenModal] = useState(false)
  const [agentList, setAgentList] = useState(allAgents)
  const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null)
  const [agentAdded, setAgentAdded] = useState(false)
  const [addedAgentEmail, setAddedAgentEmail] = useState("")

  const [formData, setFormData] = useState({ name: "", email: "", phone: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  if (!isSuperAdmin) {
    return (
      <div className="p-6 space-y-3">
        <p className="text-arcadia-cream">You don't have access to this page.</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm text-arcadia-moss hover:text-arcadia-leaf transition-colors"
        >
          ← Back to Dashboard
        </button>
      </div>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError("")
  }

  // ─── TODO: Replace with API call ──────────────────────────────────────────
  // When the backend is ready, this whole function becomes:
  //
  // const handleAddAgent = async () => {
  //   setLoading(true)
  //   try {
  //     const response = await fetch("/api/agents", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData)
  //     })
  //     const data = await response.json()
  //     if (!response.ok) throw new Error(data.message)
  //     // backend automatically:
  //     // 1. creates agent account in the database
  //     // 2. generates a random temp password
  //     // 3. sends email to agent with login credentials
  //     setAgentList([data.agent, ...agentList])
  //     setAddedAgentEmail(formData.email)
  //     setAgentAdded(true)
  //   } catch (err: any) {
  //     setError(err.message || "Something went wrong")
  //   } finally {
  //     setLoading(false)
  //   }
  // }
  // ──────────────────────────────────────────────────────────────────────────

  const handleAddAgent = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      setError("Please fill in all fields.")
      return
    }

    setLoading(true)
    setError("")

    setTimeout(() => {
      const newAgent = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        listings: 0,
        joinedAt: new Date().toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
      }

      setAgentList([newAgent, ...agentList])
      setAddedAgentEmail(formData.email)
      setAgentAdded(true)
      setLoading(false)
      setFormData({ name: "", email: "", phone: "" })
    }, 800)
  }

  const getAgentImpact = (agentId: string) => {
    const propertyCount = properties.filter((p) => p.agent.id === agentId).length
    const messageCount = messages.filter((m) => m.agentId === agentId).length
    return { propertyCount, messageCount }
  }

  const removeAgent = (id: string) => {
    setAgentList(agentList.filter((a) => a.id !== id))
    setConfirmRemoveId(null)
  }

  const closeModal = () => {
    setOpenModal(false)
    setAgentAdded(false)
    setAddedAgentEmail("")
    setError("")
    setFormData({ name: "", email: "", phone: "" })
  }

  return (
    <div className="p-3 lg:p-6 space-y-6">

      {/* Header */}
      <header className="space-y-1">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl text-arcadia-cream font-semibold">Manage Agents</h1>
          <button
            onClick={() => setOpenModal(true)}
            className="px-4 py-2 bg-arcadia-moss text-arcadia-cream rounded-lg text-sm font-medium hover:bg-arcadia-leaf transition-colors"
          >
            + Add Agent
          </button>
        </div>
        <p className="text-arcadia-sand text-sm">
          {agentList.length} agents on your team
        </p>
      </header>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {agentList.map((agent) => {
          const { propertyCount, messageCount } = getAgentImpact(agent.id)
          const isConfirming = confirmRemoveId === agent.id

          return (
            <div
              key={agent.id}
              className="bg-arcadia-stone border border-arcadia-bark rounded-xl p-6 space-y-4"
            >
              {/* Identity */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-arcadia-moss flex items-center justify-center text-arcadia-cream font-bold text-lg">
                  {agent.name.charAt(0)}
                </div>
                <div>
                  <p className="text-arcadia-cream font-medium">{agent.name}</p>
                  <p className="text-arcadia-sand text-xs">Joined {agent.joinedAt}</p>
                </div>
              </div>

              <hr className="border-arcadia-bark" />

              {/* Details */}
              <div className="space-y-2">
                <p className="text-arcadia-sand text-sm">📧 {agent.email}</p>
                <p className="text-arcadia-sand text-sm">📞 {agent.phone}</p>
                <p className="text-arcadia-leaf text-sm font-medium">
                  🏠 {propertyCount} {propertyCount === 1 ? "Listing" : "Listings"}
                </p>
              </div>

              <hr className="border-arcadia-bark" />

              {/* Actions */}
              {isConfirming ? (
                <div className="space-y-3">
                  <p className="text-xs text-arcadia-sand leading-relaxed">
                    {propertyCount > 0 || messageCount > 0 ? (
                      <>
                        ⚠️ This agent has{" "}
                        <span className="text-arcadia-cream font-medium">
                          {propertyCount} {propertyCount === 1 ? "listing" : "listings"}
                        </span>{" "}
                        and{" "}
                        <span className="text-arcadia-cream font-medium">
                          {messageCount} {messageCount === 1 ? "message" : "messages"}
                        </span>{" "}
                        tied to them. Reassign listings first if needed.
                      </>
                    ) : (
                      "This agent has no listings or messages. Safe to remove."
                    )}
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => removeAgent(agent.id)}
                      className="flex-1 py-2 bg-red-900/30 border border-red-800 rounded-lg text-red-400 text-sm hover:bg-red-900/50 transition-colors"
                    >
                      Confirm Remove
                    </button>
                    <button
                      onClick={() => setConfirmRemoveId(null)}
                      className="flex-1 py-2 border border-arcadia-bark rounded-lg text-arcadia-sand text-sm hover:bg-arcadia-bark transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3">
                  <button className="flex-1 py-2 border border-arcadia-bark rounded-lg text-arcadia-sand text-sm hover:bg-arcadia-bark transition-colors">
                    Edit
                  </button>
                  <button
                    onClick={() => setConfirmRemoveId(agent.id)}
                    className="flex-1 py-2 border border-red-800 rounded-lg text-red-400 text-sm hover:bg-red-900/30 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Add Agent Modal */}
      {openModal && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
          onClick={() => { if (!loading) closeModal() }}
        >
          <div
            className="w-full max-w-md bg-arcadia-stone rounded-2xl shadow-2xl p-6 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-arcadia-bark pb-4">
              <h2 className="text-xl font-semibold text-arcadia-cream">
                {agentAdded ? "Agent Created" : "Add New Agent"}
              </h2>
              {!loading && (
                <button
                  onClick={closeModal}
                  className="text-arcadia-sand hover:text-arcadia-cream transition-colors text-xl"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="px-4 py-3 rounded-lg bg-red-900/30 border border-red-800 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Success state — agent was added */}
            {agentAdded ? (
              <div className="space-y-5">
                <div className="flex flex-col items-center text-center gap-3 py-4">
                  <CheckCircle size={48} className="text-arcadia-moss" />
                  <div className="space-y-1">
                    <p className="text-arcadia-cream font-semibold text-lg">
                      Account created!
                    </p>
                    <p className="text-arcadia-sand text-sm leading-relaxed">
                      An email has been sent to{" "}
                      <span className="text-arcadia-cream font-medium">
                        {addedAgentEmail}
                      </span>{" "}
                      with their login credentials and a temporary password.
                    </p>
                    <p className="text-arcadia-sand/60 text-xs mt-2">
                      They can log in at{" "}
                      <span className="text-arcadia-moss">
                        {window.location.origin}/admin/signin
                      </span>{" "}
                      and change their password in Settings.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setAgentAdded(false)
                      setAddedAgentEmail("")
                    }}
                    className="flex-1 py-3 rounded-lg border border-arcadia-bark text-arcadia-sand text-sm font-medium hover:bg-arcadia-bark transition-colors"
                  >
                    Add Another
                  </button>
                  <button
                    onClick={closeModal}
                    className="flex-1 py-3 rounded-lg bg-arcadia-moss text-arcadia-cream text-sm font-medium hover:bg-arcadia-leaf transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* Form */
              <div className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-arcadia-sand">
                    Full Name <sup className="text-red-500">*</sup>
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="e.g Vivian Adeyemi"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full h-11 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-arcadia-sand">
                    Email <sup className="text-red-500">*</sup>
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="e.g vivian@arcadia.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full h-11 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-arcadia-sand">
                    Phone Number <sup className="text-red-500">*</sup>
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="e.g 08149798764"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full h-11 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss"
                  />
                </div>

                <p className="text-arcadia-sand text-xs">
                  A temporary password will be auto-generated and emailed to the agent. They can change it after their first login.
                </p>

                {/* Submit */}
                <button
                  type="button"
                  onClick={handleAddAgent}
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-arcadia-moss text-arcadia-cream font-medium hover:bg-arcadia-leaf transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create Agent Account"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}

export default ManageAgentPage