import { useState } from "react"
import { User, Lock, Bell, Home, Camera } from "lucide-react"
import { ClipboardList } from "lucide-react"

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile")

  const [profile, setProfile] = useState({
    name: "Temilade A.",
    email: "adeniyitemilade192@gmail.com",
    phone: "",
    avatar: ""
  })

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
  })

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "assignments", label: "Assignments", icon: Home },
  ]

  const user = JSON.parse(localStorage.getItem("user") || "{}")

  return (
    <div className="p-3 lg:p-6 space-y-6">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-arcadia-cream">Settings</h1>
        <p className="text-arcadia-sand text-sm">Manage your account and platform preferences</p>
      </header>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:w-56 bg-arcadia-stone rounded-xl p-3 space-y-1 h-fit">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id
                  ? "bg-arcadia-moss text-arcadia-cream"
                  : "text-arcadia-sand hover:text-arcadia-cream hover:bg-arcadia-bark"
                  }`}>
                <Icon size={16} />
                {tab.label}
              </button>
            )
          })}
        </div>
        {/* Tab Content */}
        <div className="flex-1 bg-arcadia-stone rounded-xl p-6">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-arcadia-cream">Profile Settings</h2>
              {/* Avatar */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-arcadia-moss flex items-center justify-center text-arcadia-cream text-2xl font-bold">
                    {profile.name.charAt(0)}
                  </div>
                  <button className="absolute bottom-0 right-0 w-7 h-7 bg-arcadia-bark rounded-full flex items-center justify-center hover:bg-arcadia-moss transition-colors">
                    <Camera size={14} className="text-arcadia-cream" />
                  </button>
                </div>
                <div>
                  <p className="text-arcadia-cream font-medium">{profile.name}</p>
                  <p className="text-arcadia-sand text-sm">Super Admin</p>
                  <button className="text-xs text-arcadia-moss hover:text-arcadia-leaf mt-1">
                    Change photo
                  </button>
                </div>
              </div>
              <hr className="border-arcadia-bark" />
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-arcadia-sand">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full h-11 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream focus:outline-none focus:border-arcadia-moss"
                />
              </div>
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-arcadia-sand">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full h-11 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream focus:outline-none focus:border-arcadia-moss"
                />
              </div>
              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-arcadia-sand">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Add phone number"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full h-11 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss"
                />
              </div>
              {/* Save Button */}
              <button className="px-6 py-3 rounded-lg bg-arcadia-moss text-arcadia-cream text-sm font-medium hover:bg-arcadia-leaf transition-colors">
                Save Changes
              </button>
            </div>
          )}
          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-arcadia-cream">Security</h2>
              {/* Current Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-arcadia-sand">Current Password</label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  className="w-full h-11 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss"
                />
              </div>
              {/* New Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-arcadia-sand">New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full h-11 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss"
                />
              </div>
              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-arcadia-sand">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full h-11 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss"
                />
              </div>
              <button className="px-6 py-3 rounded-lg bg-arcadia-moss text-arcadia-cream text-sm font-medium hover:bg-arcadia-leaf transition-colors">
                Update Password
              </button>
            </div>
          )}
          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-arcadia-cream">Notifications</h2>
              <p className="text-arcadia-sand text-sm">Choose how you want to be notified</p>
              <hr className="border-arcadia-bark" />
              {/* Email Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-arcadia-cream font-medium">Email Notifications</p>
                  <p className="text-arcadia-sand text-sm mt-1">
                    Receive enquiries and updates via email
                  </p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
                  className={`w-12 h-6 rounded-full transition-colors relative ${notifications.email ? "bg-arcadia-moss" : "bg-arcadia-bark"
                    }`}>
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${notifications.email ? "translate-x-6" : "translate-x-0.5"
                    }`} />
                </button>
              </div>
              <hr className="border-arcadia-bark" />
              {/* SMS Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-arcadia-cream font-medium">SMS Notifications</p>
                  <p className="text-arcadia-sand text-sm mt-1">
                    Receive enquiries and updates via SMS
                  </p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, sms: !notifications.sms })}
                  className={`w-12 h-6 rounded-full transition-colors relative ${notifications.sms ? "bg-arcadia-moss" : "bg-arcadia-bark"
                    }`}>
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${notifications.sms ? "translate-x-6" : "translate-x-0.5"
                    }`} />
                </button>
              </div>
            </div>
          )}
          {/* Assignments Tab */}
          {activeTab === "assignments" && (
            <div className="space-y-6">

              {user.role === "super_admin" ? (
                <>
                  {/* Super Admin View */}
                  <div>
                    <h2 className="text-xl font-semibold text-arcadia-cream">Property Assignments</h2>
                    <p className="text-arcadia-sand text-sm mt-1">
                      Assign unhandled enquiries to agents
                    </p>
                  </div>
                  <hr className="border-arcadia-bark" />

                  {[
                    { id: "1", property: "Luxury Villa", sender: "John Feranmi", location: "Victoria Island" },
                    { id: "2", property: "Penthouse", sender: "Bayo Martins", location: "Banana Island" },
                    { id: "3", property: "Mansion", sender: "Emeka Nwachukwu", location: "Lekki" },
                  ].map((enquiry) => (
                    <div
                      key={enquiry.id}
                      className="flex items-center justify-between p-4 border border-arcadia-bark rounded-lg"
                    >
                      <div className="space-y-1">
                        <p className="text-arcadia-cream font-medium">{enquiry.sender}</p>
                        <p className="text-arcadia-leaf text-sm">{enquiry.property}</p>
                        <p className="text-arcadia-sand text-xs">📍 {enquiry.location}</p>
                      </div>
                      <select className="bg-arcadia-bark border border-arcadia-bark rounded-lg px-3 py-2 text-arcadia-cream text-sm focus:outline-none focus:border-arcadia-moss">
                        <option value="">Assign to agent</option>
                        <option value="1">Vivian A.</option>
                        <option value="2">Lekan A.</option>
                        <option value="3">Hannah O.</option>
                        <option value="4">Israel J.</option>
                      </select>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {/* Agent View */}
                  <div>
                    <h2 className="text-xl font-semibold text-arcadia-cream">My Assignments</h2>
                    <p className="text-arcadia-sand text-sm mt-1">
                      Enquiries and properties assigned to you
                    </p>
                  </div>
                  <hr className="border-arcadia-bark" />

                  {/* Fake assignments for this agent — replace with filtered API data later */}
                  {[
                    {
                      id: "1",
                      property: "Luxury Villa",
                      sender: "John Feranmi",
                      location: "Victoria Island",
                      status: "Pending",
                    },
                    {
                      id: "2",
                      property: "Penthouse",
                      sender: "Bayo Martins",
                      location: "Banana Island",
                      status: "In Progress",
                    },
                  ].length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-12 h-12 rounded-full bg-arcadia-bark/50 flex items-center justify-center mb-4">
                        <ClipboardList size={20} className="text-arcadia-sand/40" />
                      </div>
                      <p className="text-arcadia-sand/60 text-sm">No assignments yet</p>
                      <p className="text-arcadia-sand/30 text-xs mt-1">
                        Your assigned enquiries will appear here
                      </p>
                    </div>
                  ) : (
                    [
                      {
                        id: "1",
                        property: "Luxury Villa",
                        sender: "John Feranmi",
                        location: "Victoria Island",
                        status: "Pending",
                      },
                      {
                        id: "2",
                        property: "Penthouse",
                        sender: "Bayo Martins",
                        location: "Banana Island",
                        status: "In Progress",
                      },
                    ].map((assignment) => (
                      <div
                        key={assignment.id}
                        className="flex items-center justify-between p-4 border border-arcadia-bark rounded-lg"
                      >
                        <div className="space-y-1">
                          <p className="text-arcadia-cream font-medium">{assignment.sender}</p>
                          <p className="text-arcadia-leaf text-sm">{assignment.property}</p>
                          <p className="text-arcadia-sand text-xs">📍 {assignment.location}</p>
                        </div>

                        {/* Status badge */}
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium ${assignment.status === "Pending"
                              ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                              : assignment.status === "In Progress"
                                ? "bg-arcadia-moss/10 text-arcadia-moss border border-arcadia-moss/20"
                                : "bg-arcadia-bark/50 text-arcadia-sand border border-arcadia-bark"
                            }`}>
                          {assignment.status}
                        </span>
                      </div>
                    ))
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default SettingsPage