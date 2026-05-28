import { agents } from "../../data/agents"
import { useState } from "react"

const ManageAgentPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [agentList, setAgentList] = useState(agents)

  const removeAgent = (id: string) => {
    setAgentList(agentList.filter((a) => a.id !== id))
  }

  return (
    <div className="p-3 lg:p-6 space-y-6">
      {/* Header */}
      <header className="space-y-1">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl text-arcadia-cream font-semibold">Manage Agents</h1>
          <button
            onClick={() => setOpenModal(true)}
            className="px-4 py-2 bg-arcadia-moss text-arcadia-cream rounded-lg text-sm font-medium hover:bg-arcadia-leaf transition-colors">
            + Add Agent
          </button>
        </div>
        <p className="text-arcadia-sand text-sm">
          {agentList.length} agents on your team
        </p>
      </header>
      {/* Agents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {agentList.map((agent) => (
          <div
            key={agent.id}
            className="bg-arcadia-stone border border-arcadia-bark rounded-xl p-6 space-y-4">
            {/* Agent Identity */}
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
            {/* Agent Details */}
            <div className="space-y-2">
              <p className="text-arcadia-sand text-sm">📧 {agent.email}</p>
              <p className="text-arcadia-sand text-sm">📞 {agent.phone}</p>
              <p className="text-arcadia-leaf text-sm font-medium">
                🏠 {agent.listings} Listings
              </p>
            </div>
            <hr className="border-arcadia-bark" />
            {/* Actions */}
            <div className="flex gap-3">
              <button className="flex-1 py-2 border border-arcadia-bark rounded-lg text-arcadia-sand text-sm hover:bg-arcadia-bark transition-colors">
                Edit
              </button>
              <button
                onClick={() => removeAgent(agent.id)}
                className="flex-1 py-2 border border-red-800 rounded-lg text-red-400 text-sm hover:bg-red-900/30 transition-colors">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Add Agent Modal */}
      {openModal && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
          onClick={() => setOpenModal(false)}>
          <div
            className="w-full max-w-md bg-arcadia-stone rounded-2xl shadow-2xl p-6 space-y-5"
            onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-arcadia-bark pb-4">
              <h2 className="text-xl font-semibold text-arcadia-cream">Add New Agent</h2>
              <button
                onClick={() => setOpenModal(false)}
                className="text-arcadia-sand hover:text-arcadia-cream transition-colors text-xl">
                ✕
              </button>
            </div>
            {/* Form */}
            <div className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-arcadia-sand">
                  Full Name <sup className="text-red-500">*</sup>
                </label>
                <input
                  type="text"
                  placeholder="e.g Vivian Adeyemi"
                  className="w-full h-11 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss"
                />
              </div>
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-arcadia-sand">
                  Email <sup className="text-red-500">*</sup>
                </label>
                <input
                  type="email"
                  placeholder="e.g vivian@arcadia.com"
                  className="w-full h-11 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss"
                />
              </div>
              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-arcadia-sand">
                  Phone Number <sup className="text-red-500">*</sup>
                </label>
                <input
                  type="tel"
                  placeholder="e.g 08149798764"
                  className="w-full h-11 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss"
                />
              </div>
              <p className="text-arcadia-sand text-xs">
                Login details will be automatically sent to the agent's email.
              </p>
              {/* Submit */}
              <button className="w-full py-3 rounded-lg bg-arcadia-moss text-arcadia-cream font-medium hover:bg-arcadia-leaf transition-colors">
                Add Agent
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default ManageAgentPage