import { useState } from "react"
import { MapPin, Clock, ChevronRight, X } from "lucide-react"
import { messages as propertyMessages } from "../../data/messages"
import { generalEnquiries } from "../../data/generalEnquiries"
import { agents } from "../../data/agents"
import { useAuth } from "../../context/AuthContext"


const MessagesPage = () => {
  const { user } = useAuth()
  const isSuperAdmin = user?.role === "super_admin"

  const [activeTab, setActiveTab] = useState<"property" | "general">("property")
  const [messageList, setMessageList] = useState(propertyMessages)
  const [generalList, setGeneralList] = useState(generalEnquiries)
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null)

  // ── Agents only see enquiries tied to THEIR properties ──
  const visibleMessages = isSuperAdmin
    ? messageList
    : messageList.filter((m) => m.agentId === user?.id)

  const markAsRead = (id: string) => {
    setMessageList(messageList.map((m) => (m.id === id ? { ...m, isRead: true } : m)))
  }

  const markGeneralAsRead = (id: string) => {
    setGeneralList(generalList.map((g) => (g.id === id ? { ...g, isRead: true } : g)))
  }

  const assignAgent = (id: string, agentId: string) => {
    setGeneralList(generalList.map((g) => (g.id === id ? { ...g, assignedAgentId: agentId, isRead: true } : g)))
  }

  const unreadProperty = visibleMessages.filter((m) => !m.isRead).length
  const unreadGeneral = generalList.filter((g) => !g.isRead).length

  return (
    <div className="p-3 lg:p-6 space-y-6">

      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-arcadia-cream">Messages</h1>
        <p className="text-arcadia-sand text-sm">
          {isSuperAdmin
            ? "All enquiries from buyers and renters"
            : "Enquiries on your listed properties"}
        </p>
      </header>

      {/* Tabs — General Enquiries tab only shows for Super Admin */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveTab("property")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === "property"
            ? "bg-arcadia-moss text-arcadia-cream"
            : "bg-arcadia-stone text-arcadia-sand hover:text-arcadia-cream"
            }`}
        >
          Property Enquiries
          {unreadProperty > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {unreadProperty}
            </span>
          )}
        </button>

        {isSuperAdmin && (
          <button
            onClick={() => setActiveTab("general")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === "general"
              ? "bg-arcadia-moss text-arcadia-cream"
              : "bg-arcadia-stone text-arcadia-sand hover:text-arcadia-cream"
              }`}
          >
            General Enquiries
            {unreadGeneral > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {unreadGeneral}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Property Enquiries Tab — uses visibleMessages now, not messageList */}
      {activeTab === "property" && (
        <div className="space-y-4">
          {visibleMessages.length === 0 ? (
            <p className="text-arcadia-sand text-sm text-center py-12">
              No enquiries yet on your properties.
            </p>
          ) : (
            visibleMessages.map((message) => (
              <div
                key={message.id}
                onClick={() => setSelectedMessage({ ...message, type: "property" })}
                className={`rounded-xl p-6 flex items-center justify-between transition-all duration-300 border cursor-pointer ${!message.isRead
                  ? "bg-arcadia-bark/20 border-red-400 hover:border-red-300"
                  : "border-arcadia-bark hover:border-arcadia-sand"
                  }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-3 h-3 rounded-full mt-2 shrink-0 ${message.isRead ? "bg-arcadia-moss" : "bg-red-500"
                    }`} />
                  <div className="w-10 h-10 rounded-full bg-arcadia-moss flex items-center justify-center text-arcadia-cream font-bold shrink-0">
                    {message.senderName.split(" ").map((n) => n.charAt(0)).join("")}
                  </div>
                  <div className="space-y-1">
                    <p className="text-arcadia-cream font-medium">{message.senderName}</p>
                    <p className="text-arcadia-leaf text-sm">{message.propertyName}</p>
                    <p className="text-arcadia-sand text-sm max-w-md line-clamp-2">{message.message}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="space-y-3 text-sm">
                    <span className="text-arcadia-sand flex items-center gap-2">
                      <MapPin size={16} />
                      {message.location}
                    </span>
                    <span className="text-arcadia-sand flex items-center gap-2">
                      <Clock size={16} />
                      {message.createdAt}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {!message.isRead && (
                      <button
                        onClick={(e) => { e.stopPropagation(); markAsRead(message.id) }}
                        className="text-xs text-arcadia-moss hover:text-arcadia-leaf whitespace-nowrap"
                      >
                        Mark as read
                      </button>
                    )}
                    <ChevronRight className="text-arcadia-sand hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* General Enquiries Tab — only renders for Super Admin anyway, but double-guarded */}
      {activeTab === "general" && isSuperAdmin && (
        <div className="space-y-4">
          {generalList.map((enquiry) => (
            <div
              key={enquiry.id}
              className={`rounded-xl p-6 flex items-center justify-between transition-all duration-300 border ${!enquiry.isRead ? "bg-arcadia-bark/20 border-red-400" : "border-arcadia-bark"
                }`}
            >
              <div className="flex items-start gap-4 cursor-pointer flex-1" onClick={() => setSelectedMessage({ ...enquiry, type: "general" })}>
                <div className={`w-3 h-3 rounded-full mt-2 shrink-0 ${enquiry.isRead ? "bg-arcadia-moss" : "bg-red-500"
                  }`} />
                <div className="w-10 h-10 rounded-full bg-arcadia-bark flex items-center justify-center text-arcadia-cream font-bold shrink-0">
                  {enquiry.name.split(" ").map((n) => n.charAt(0)).join("")}
                </div>
                <div className="space-y-1">
                  <p className="text-arcadia-cream font-medium">{enquiry.name}</p>
                  <p className="text-arcadia-leaf text-sm">Wants to {enquiry.intent}</p>
                  <p className="text-arcadia-sand text-sm max-w-md line-clamp-2">{enquiry.message}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-arcadia-sand text-sm flex items-center gap-2">
                  <Clock size={16} />
                  {enquiry.createdAt}
                </span>
                {!enquiry.isRead && (
                  <button
                    onClick={(e) => { e.stopPropagation(); markGeneralAsRead(enquiry.id) }}
                    className="text-xs text-arcadia-moss hover:text-arcadia-leaf whitespace-nowrap"
                  >
                    Mark as read
                  </button>
                )}

                {enquiry.assignedAgentId ? (
                  <span className="text-xs px-3 py-1.5 rounded-full bg-arcadia-leaf/20 text-arcadia-leaf">
                    Assigned to {agents.find((a) => a.id === enquiry.assignedAgentId)?.name}
                  </span>
                ) : (
                  <select
                    onChange={(e) => { if (e.target.value) assignAgent(enquiry.id, e.target.value) }}
                    defaultValue=""
                    className="bg-arcadia-bark border border-arcadia-bark rounded-lg px-3 py-2 text-arcadia-cream text-sm focus:outline-none focus:border-arcadia-moss"
                  >
                    <option value="">Assign to agent</option>
                    {agents.map((agent) => (
                      <option key={agent.id} value={agent.id}>{agent.name}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          ))}
        </div>

      )}

      {/* Detail Modal — unchanged */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center" onClick={() => setSelectedMessage(null)}>
          <div className="w-full max-w-lg bg-arcadia-stone rounded-2xl shadow-2xl p-6 space-y-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b border-arcadia-bark pb-4">
              <h2 className="text-xl font-semibold text-arcadia-cream">
                {selectedMessage.type === "property" ? "Property Enquiry" : "General Enquiry"}
              </h2>
              <button onClick={() => setSelectedMessage(null)} className="text-arcadia-sand hover:text-arcadia-cream">
                <X size={20} />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-arcadia-moss flex items-center justify-center text-arcadia-cream font-bold text-lg">
                {(selectedMessage.senderName || selectedMessage.name).split(" ").map((n: string) => n.charAt(0)).join("")}
              </div>
              <div>
                <p className="text-arcadia-cream font-medium">{selectedMessage.senderName || selectedMessage.name}</p>
                <p className="text-arcadia-sand text-sm">{selectedMessage.senderEmail || selectedMessage.email}</p>
              </div>
            </div>

            <hr className="border-arcadia-bark" />

            {selectedMessage.type === "property" ? (
              <div className="space-y-2">
                <p className="text-arcadia-sand text-sm">Enquiry about:</p>
                <p className="text-arcadia-leaf font-medium">{selectedMessage.propertyName}</p>
                <p className="text-arcadia-sand text-sm flex items-center gap-2">
                  <MapPin size={14} />
                  {selectedMessage.location}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-arcadia-sand text-sm">Looking to:</p>
                <p className="text-arcadia-leaf font-medium">{selectedMessage.intent}</p>
                <p className="text-arcadia-sand text-sm">📞 {selectedMessage.phone}</p>
              </div>
            )}

            <hr className="border-arcadia-bark" />

            <div className="space-y-2">
              <p className="text-arcadia-sand text-sm">Message:</p>
              <p className="text-arcadia-cream leading-relaxed">{selectedMessage.message}</p>
            </div>

            <div className="flex gap-3 pt-2">
              < a href={`https://mail.google.com/mail/?view=cm&to=${selectedMessage.senderEmail || selectedMessage.email}&su=Re: Your Enquiry about ${encodeURIComponent(selectedMessage.propertyName || "a property")} — Arcadia Homes&body=Hi ${encodeURIComponent(selectedMessage.senderName || selectedMessage.name)},%0A%0AThank you for reaching out to Arcadia Homes.%0A%0A`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-3 rounded-lg bg-arcadia-moss text-arcadia-cream text-sm font-medium hover:bg-arcadia-leaf transition-colors text-center"
>
              Reply via Email
            </a>
          </div>
        </div>
        </div>
  )
}

    </div >
  )
}

export default MessagesPage