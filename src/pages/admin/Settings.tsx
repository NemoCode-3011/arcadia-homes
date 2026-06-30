import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { User, Lock, Bell, Camera, ArrowRight } from "lucide-react"

const SettingsPage = () => {
  const navigate = useNavigate()
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
  ]

  const user = JSON.parse(localStorage.getItem("user") || "{}")

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");

    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const image = reader.result as string;
      setProfileImage(image);
      localStorage.setItem("profileImage", image);
    };
    reader.readAsDataURL(file);
  };
  const openFilePicker = () => {
    fileInputRef.current?.click();
  };
  const removePhoto = () => {
    setProfileImage(null);
    localStorage.removeItem("profileImage");
  };
  return (
    <div className="p-3 lg:p-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-arcadia-cream">Settings</h1>
        <p className="text-arcadia-sand text-sm">Manage your account and platform preferences</p>
      </header>
      <div className="flex flex-col lg:flex-row gap-6">
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
        <div className="flex-1 bg-arcadia-stone rounded-xl p-6">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-arcadia-cream">Profile Settings</h2>
              <div className="flex items-center gap-6">
                <div className="relative">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={profile.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-arcadia-moss"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-arcadia-moss flex items-center justify-center text-arcadia-cream text-2xl font-bold">
                      {profile.name.charAt(0)}
                    </div>
                  )}

                  <button
                    onClick={openFilePicker}
                    type="button"
                    className="absolute bottom-0 right-0 w-7 h-7 bg-arcadia-bark rounded-full flex items-center justify-center hover:bg-arcadia-moss transition-colors"
                  >
                    <Camera
                      size={14}
                      className="text-arcadia-cream"
                    />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
                <div>
                  <p className="text-arcadia-cream font-medium">
                    {profile.name}
                  </p>
                  <p className="text-arcadia-sand text-sm">
                    Super Admin
                  </p>
                  <button
                    type="button"
                    onClick={openFilePicker}
                    className="text-xs text-arcadia-moss hover:text-arcadia-leaf mt-1">
                    Change photo
                  </button>
                  <button
                    onClick={removePhoto}
                    className="text-xs text-red-400 mt-1 ml-3 bg-arcadia-moss p-3 px-3 py-1 rounded-md">
                    Remove photo
                  </button>
                </div>
              </div>
              <hr className="border-arcadia-bark" />
              <div className="space-y-2">
                <label className="text-sm font-medium text-arcadia-sand">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full h-11 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream focus:outline-none focus:border-arcadia-moss"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-arcadia-sand">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full h-11 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream focus:outline-none focus:border-arcadia-moss"
                />
              </div>
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
              <button className="px-6 py-3 rounded-lg bg-arcadia-moss text-arcadia-cream text-sm font-medium hover:bg-arcadia-leaf transition-colors">
                Save Changes
              </button>
            </div>
          )}
          {activeTab === "security" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-arcadia-cream">Security</h2>
              <div className="space-y-2">
                <label className="text-sm font-medium text-arcadia-sand">Current Password</label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  className="w-full h-11 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-arcadia-sand">New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full h-11 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss"
                />
              </div>
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
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-arcadia-cream">Notifications</h2>
              <p className="text-arcadia-sand text-sm">Choose how you want to be notified</p>
              <hr className="border-arcadia-bark" />
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

              {user.role === "super_admin" && (
                <>
                  <hr className="border-arcadia-bark" />
                  <button
                    onClick={() => navigate("/messages")}
                    className="w-full flex items-center justify-between p-4 border border-arcadia-bark rounded-lg hover:border-arcadia-moss/40 transition-colors group"
                  >
                    <div className="text-left">
                      <p className="text-arcadia-cream font-medium text-sm">Property Assignments</p>
                      <p className="text-arcadia-sand text-xs mt-1">
                        Assign general enquiries to agents from the Messages page
                      </p>
                    </div>
                    <ArrowRight size={16} className="text-arcadia-sand group-hover:text-arcadia-moss group-hover:translate-x-1 transition-all" />
                  </button>
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