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
import LoadingScreen from "./components/ui/LoadingScreen";
import { useState } from "react";
import ProtectedRoute from "./components/layout/ProtectedRoute"
import { AuthProvider } from "./context/AuthContext"
import PublicProtectedRoute from "./components/layout/PublicProtectedRoutes"
import ScrollToTop from "./components/ui/ScrollTop"
import SuperAdminRoute from "./components/layout/SuperadminRoute";
const App = () => {
  const [loading, setLoading] = useState(true)

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />
  }

  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        {/* accessible public routes */}
        <Route element={<PublicDashboardLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/aboutus" element={<AboutPage />} />
          <Route path="/contactus" element={<ContactPage />} />
        </Route>

        {/* Protected public routes, tou must sign up first */}
        <Route element={<PublicProtectedRoute />}>
          <Route element={<PublicDashboardLayout />}>
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/listings/:id" element={<ListingsDetails />} />
          </Route>
        </Route>

        {/* Public auth */}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Admin auth */}
        <Route path="/admin/signin" element={<AdminSignInPage />} />

        {/* Protected admin routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<HomePage />} />
            <Route path="/properties" element={<Propertiespage />} />
            <Route path="/propertiesdetail/:id" element={<PropertyDetails />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route element={<SuperAdminRoute />}>
              <Route path="/agents" element={<ManageAgentPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  )
}
export default App