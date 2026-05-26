import { useState } from "react"
import { MapPin, Clock, ChevronRight, X } from "lucide-react"
import { messages } from "../../data/messages"

interface Message {
  id: string
  senderName: string
  senderEmail: string
  propertyId: string
  propertyName: string
  location: string
  message: string
  isRead: boolean
  createdAt: string
}

const MessagesPage = () => {
  const [messageList, setMessageList] = useState(messages)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  const markAsRead = (id: string) => {
    setMessageList(messageList.map((m) =>
      m.id === id ? { ...m, isRead: true } : m
    ))
  }

  return (
    <div className="p-3 lg:p-6 space-y-6">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-arcadia-cream">Messages</h1>
        <p className="text-arcadia-sand text-sm">
          All enquiries from buyers and renters
        </p>
      </header>
      {/* Unread count */}
      <p className="text-arcadia-sand text-sm">
        <span className="text-arcadia-cream font-medium">
          {messageList.filter((m) => !m.isRead).length}
        </span> unread messages
      </p>

      {/* Messages List */}
      <div className="space-y-4">
        {messageList.map((message) => (
          <div
            key={message.id}
            className={`rounded-xl p-6 flex items-center justify-between transition-all duration-300 border cursor-pointer ${!message.isRead
              ? "bg-arcadia-bark/20 border-red-400 hover:border-red-300"
              : "border-arcadia-bark hover:border-arcadia-sand"
              }`}
            onClick={() => setSelectedMessage(message)}>
            {/* Left Side */}
            <div className="flex items-start gap-4">
              {/* Read/Unread Indicator */}
              <div className={`w-3 h-3 rounded-full mt-2 shrink-0 ${message.isRead ? "bg-arcadia-moss" : "bg-red-500"
                }`} />
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-arcadia-moss flex items-center justify-center text-arcadia-cream font-bold shrink-0">
                {message.senderName
                  .split(" ")
                  .map((name) => name.charAt(0))
                  .join("")}
              </div>
              {/* Message Content */}
              <div className="space-y-1">
                <p className="text-arcadia-cream font-medium">
                  {message.senderName}
                </p>
                <p className="text-arcadia-leaf text-sm">
                  {message.propertyName}
                </p>
                <p className="text-arcadia-sand text-sm max-w-md line-clamp-2">
                  {message.message}
                </p>
              </div>

            </div>
            {/* Right Side */}
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
                    onClick={(e) => {
                      e.stopPropagation()
                      markAsRead(message.id)
                    }}
                    className="text-xs text-arcadia-moss hover:text-arcadia-leaf whitespace-nowrap">
                    Mark as read
                  </button>
                )}
                <ChevronRight className="text-arcadia-sand hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Message Detail Modal */}
      {selectedMessage && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
          onClick={() => setSelectedMessage(null)}>
          <div
            className="w-full max-w-lg bg-arcadia-stone rounded-2xl shadow-2xl p-6 space-y-5"
            onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-arcadia-bark pb-4">
              <h2 className="text-xl font-semibold text-arcadia-cream">
                Enquiry Details
              </h2>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-arcadia-sand hover:text-arcadia-cream transition-colors">
                <X size={20} />
              </button>
            </div>
            {/* Sender Info */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-arcadia-moss flex items-center justify-center text-arcadia-cream font-bold text-lg">
                {selectedMessage.senderName
                  .split(" ")
                  .map((name) => name.charAt(0))
                  .join("")}
              </div>
              <div>
                <p className="text-arcadia-cream font-medium">
                  {selectedMessage.senderName}
                </p>
                <p className="text-arcadia-sand text-sm">
                  {selectedMessage.senderEmail}
                </p>
              </div>
            </div>
            <hr className="border-arcadia-bark" />
            {/* Property Info */}
            <div className="space-y-2">
              <p className="text-arcadia-sand text-sm">Enquiry about:</p>
              <p className="text-arcadia-leaf font-medium">
                {selectedMessage.propertyName}
              </p>
              <p className="text-arcadia-sand text-sm flex items-center gap-2">
                <MapPin size={14} />
                {selectedMessage.location}
              </p>
            </div>
            <hr className="border-arcadia-bark" />
            {/* Message */}
            <div className="space-y-2">
              <p className="text-arcadia-sand text-sm">Message:</p>
              <p className="text-arcadia-cream leading-relaxed">
                {selectedMessage.message}
              </p>
            </div>
            <hr className="border-arcadia-bark" />
            {/* Time */}
            <p className="text-arcadia-sand text-sm flex items-center gap-2">
              <Clock size={14} />
              {selectedMessage.createdAt}
            </p>
            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button className="flex-1 py-3 rounded-lg bg-arcadia-moss text-arcadia-cream text-sm font-medium hover:bg-arcadia-leaf transition-colors">
                Reply via Email
              </button>
              {!selectedMessage.isRead && (
                <button
                  onClick={() => {
                    markAsRead(selectedMessage.id)
                    setSelectedMessage(null)
                  }}
                  className="flex-1 py-3 rounded-lg bg-arcadia-bark text-arcadia-cream text-sm font-medium hover:bg-arcadia-stone transition-colors">
                  Mark as Read
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MessagesPage