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
import AdminSignInPage from "./pages/admin/AdminSignInPage";
import AboutPage from "./pages/public/AboutPage";


const App = () => {
  return (
    <div>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicDashboardLayout />}>
          <Route path="/about-us" element={<AboutPage/>} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/listings/:id" element={<ListingsDetails />} />
          <Route path="/contact-us" element={<ContactPage />} />
        </Route>
        {/* Public auth */}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Admin auth — hidden from public */}
        <Route path="/admin/signin" element={<AdminSignInPage />} />

        {/* Admin dashboard */}
        <Route element={<DashboardLayout />}>
          <Route path="/admin-dashboard" element={<HomePage />} />
          <Route path="/properties" element={<Propertiespage />} />
          <Route path="/propertiesdetail/:id" element={<PropertyDetails />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/agents" element={<ManageAgentPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App