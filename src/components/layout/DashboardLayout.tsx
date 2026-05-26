import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Topbar from "./Topbar"
import { useState } from "react"

const DashboardLayout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className="flex h-screen bg-arcadia-charcoal">
      {sidebarOpen && (
        <div className="fixed inet-0 bg-black/50 z-20 lg:hidden" onClick={()=> setSidebarOpen(false)}></div>
      )}
      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-64 h-screen bg-arcadia-stone transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
      <Sidebar onClose={()=> setSidebarOpen(false)}/>
      </aside>
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar onMenuclick={()=> setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-3 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout