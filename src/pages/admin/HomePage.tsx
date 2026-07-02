import StatCard from "../../components/ui/StatCard"
import PropertyCard from "../../components/ui/PropertyCard"
import { useProperties } from "../../context/PropertiesContext"
import { useAuth } from "../../context/AuthContext"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar,
} from "recharts"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
  const { properties } = useProperties()
  const { user } = useAuth()
  const navigate = useNavigate()
  const isSuperAdmin = user?.role === "super_admin"

  // Agents see only their own recent listings
  const visibleProperties = isSuperAdmin
    ? properties
    : properties.filter((p) => p.agent.id === user?.id)

  const recentProperties = visibleProperties.slice(0, 4)

  interface StatCardData {
    title: string
    value: number
    change: string
  }

  const statscards: StatCardData[] = [
    { title: "Total Listings", value: visibleProperties.length, change: "↑ 12 this week" },
    { title: "Properties Sold", value: 40, change: "↑ 3 this month" },
    { title: "For Rent", value: visibleProperties.filter(p => p.status === "For Rent").length, change: "↑ 5 this week" },
    { title: "Enquiries", value: 18, change: "↑ 2 today" },
  ]

  const listingsData = [
    { month: "Jan", listings: 12 },
    { month: "Feb", listings: 18 },
    { month: "Mar", listings: 15 },
    { month: "Apr", listings: 19 },
    { month: "May", listings: 10 },
    { month: "Jun", listings: 9 },
  ]

  const salesRentalData = [
    { month: "Jan", sales: 8, rentals: 4 },
    { month: "Feb", sales: 10, rentals: 8 },
    { month: "Mar", sales: 7, rentals: 8 },
    { month: "Apr", sales: 8, rentals: 11 },
    { month: "May", sales: 6, rentals: 4 },
    { month: "Jun", sales: 3, rentals: 6 },
  ]

  const recentActivity = [
    { icon: "🏠", text: "New listing added — Luxury Villa, Lekki", time: "2 mins ago" },
    { icon: "💬", text: "John enquired about Lekki Villa", time: "10 mins ago" },
    { icon: "✅", text: "Ikoyi Duplex marked as sold", time: "1 hour ago" },
    { icon: "💬", text: "Ada enquired about VI Apartment", time: "3 hours ago" },
    { icon: "🏠", text: "New listing added — Terrace Duplex, FESTAC", time: "5 hours ago" },
  ]

  return (
    <div className="p-2 lg:p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-arcadia-cream">
          Good Morning {user?.name},
        </h1>
        <p className="text-sm text-arcadia-sand mt-1">
          Here's what is happening with Arcadia today
        </p>
      </header>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {statscards.map((stat) => (
          <div key={stat.title} className="border w-full h-30 p-6 bg-arcadia-stone rounded-md shadow shadow-arcadia-moss">
            <StatCard
              title={stat.title}
              value={stat.value}
              change={stat.change}
            />
          </div>
        ))}
      </div>

      {/* Recent Listings */}
      <div className="mt-10 flex justify-between">
        <h1 className="text-3xl text-arcadia-cream font-semibold">Recent Listings</h1>
        <h1
          onClick={() => navigate("/properties")}
          className="text-md text-arcadia-cream font-semibold mt-3 cursor-pointer"
        >
          Explore more →
        </h1>
      </div>

      {recentProperties.length === 0 ? (
        <p className="text-arcadia-sand text-sm mt-6">No listings yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {recentProperties.map((property) => (
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
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-arcadia-stone rounded-xl p-6">
          <h3 className="text-arcadia-cream font-semibold mb-4">Monthly Listings</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={listingsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3D4038" />
              <XAxis dataKey="month" stroke="#C8B99A" tick={{ fontSize: 12 }} />
              <YAxis stroke="#C8B99A" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: "#2A2D27", border: "1px solid #3D4038", borderRadius: "8px", color: "#F2EDE4" }} />
              <Line type="monotone" dataKey="listings" stroke="#6B7C5C" strokeWidth={2} dot={{ fill: "#8FA67A" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-arcadia-stone rounded-xl p-6">
          <h3 className="text-arcadia-cream font-semibold mb-4">Sales vs Rentals</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salesRentalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3D4038" />
              <XAxis dataKey="month" stroke="#C8B99A" tick={{ fontSize: 12 }} />
              <YAxis stroke="#C8B99A" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: "#2A2D27", border: "1px solid #3D4038", borderRadius: "8px", color: "#F2EDE4" }} />
              <Bar dataKey="sales" fill="#6B7C5C" radius={[4, 4, 0, 0]} />
              <Bar dataKey="rentals" fill="#C8B99A" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-arcadia-stone rounded-xl p-6">
          <h3 className="text-arcadia-cream font-semibold mb-4">Recent Activity</h3>
          <div className="flex flex-col gap-4">
            {recentActivity.map((item, index) => (
              <div key={index} className="flex items-start gap-3 border-b border-arcadia-bark pb-3">
                <span className="text-lg">{item.icon}</span>
                <div>
                  <p className="text-sm text-arcadia-cream">{item.text}</p>
                  <p className="text-xs text-arcadia-sand mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-arcadia-stone rounded-xl p-6">
          <h3 className="text-arcadia-cream font-semibold mb-4">Quick Actions</h3>
          <div className="flex flex-col gap-3">
            <button onClick={() => navigate("/messages")}
              className="w-full py-3 rounded-lg bg-arcadia-bark text-arcadia-cream text-sm font-medium hover:bg-arcadia-stone transition-colors">
              💬 View Messages
            </button>
            <button onClick={() => navigate("/properties")}
              className="w-full py-3 rounded-lg bg-arcadia-bark text-arcadia-cream text-sm font-medium hover:bg-arcadia-stone transition-colors">
              📋 All Listings
            </button>
            <button onClick={() => navigate("/settings")}
              className="w-full py-3 rounded-lg bg-arcadia-bark text-arcadia-cream text-sm font-medium hover:bg-arcadia-stone transition-colors">
              ⚙️ Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage