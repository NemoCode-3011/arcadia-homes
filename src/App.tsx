import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/auth/SignUpPage";
import SignInPage from "./pages/auth/SignInPage";
import HomePage from "./pages/admin/HomePage";
import Propertiespage from "./pages/admin/Propertiespage";
import PropertyDetails from "./pages/admin/PropertyDetails";
import DashboardLayout from "./components/layout/DashboardLayout";
import MessagesPage from "./pages/admin/MessagesPage";
import Settings from "./pages/admin/Settings";
import PublicDashboardLayout from "./components/layout/PublicDashboardLayout";
import LandingPage from "./pages/public/LandingPage";
import ListingsPage from "./pages/public/ListingsPage";
import ListingsDetails from "./pages/public/ListingsDetails";
import ContactPage from "./pages/public/ContactPage";
import ManageAgentPage from "./pages/admin/ManageAgentPage";


const App = () => {
  return (
    <div>
      <Routes>
        {/* Auth routes */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />

        {/* Public routes */}
        <Route element={<PublicDashboardLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/details" element={<ListingsDetails />} />
          <Route path="/contacts" element={<ContactPage />} />
        </Route>

        {/* admin dashboard routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/properties" element={<Propertiespage />} />
          <Route path="/properties/propertiesdetail/:id" element={<PropertyDetails />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/agents" element={<ManageAgentPage/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App