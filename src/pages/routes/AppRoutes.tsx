import { Routes, Route, Navigate } from "react-router-dom";

/* ================= AUTH ================= */
import LoginPage from "../auth/LoginPage";
import AgentRegisterPage from "../auth/AgentRegisterPage";

/* ================= AGENT PAGES ================= */
import DashboardPage from "../agent/DashboardPage";
import PropertyListPage from "../agent/PropertyListPage";
import AddPropertyPage from "../agent/AddPropertyPage";
import EditPropertyPage from "../agent/EditPropertyPage";
import AnalyticsPage from "../agent/AnalyticsPage";
import ProfilePage from "../agent/ProfilePage";
import InquiryManagementPage from "../agent/InquiryManagementPage";
import ViewingRequestsPage from "../agent/ViewingRequestsPage";

/* ================= ADMIN PAGES ================= */
import AdminDashboardPage from "../admin/AdminDashboardPage";
import AddAgentPage from "../admin/AddAgentPage";
import AgentManagementPage from "../admin/AgentManagementPage";
import CustomerManagementPage from "../admin/CustomerManagementPage";
import InquiryManagementPageAdmin from "../admin/InquiryManagementPage";
import ListingModerationPage from "../admin/ListingModerationPage";
import PlatformAnalyticsPage from "../admin/PlatformAnalyticsPage";
import AdminProfilePage from "../admin/AdminProfilePage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ================= AUTH ================= */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<AgentRegisterPage />} />

      {/* ================= DEFAULT REDIRECTS ================= */}
      <Route path="/agent" element={<Navigate to="/dashboard" />} />
      <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />

      {/* ================= AGENT ROUTES ================= */}
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/properties" element={<PropertyListPage />} />
      <Route path="/properties/new" element={<AddPropertyPage />} />
      <Route path="/properties/edit/:id" element={<EditPropertyPage />} />
      <Route path="/inquiries" element={<InquiryManagementPage />} />
      <Route path="/viewings" element={<ViewingRequestsPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/profile" element={<ProfilePage />} />

      {/* ================= ADMIN ROUTES ================= */}
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      <Route path="/admin/agents" element={<AgentManagementPage />} />
      <Route path="/admin/agents/new" element={<AddAgentPage />} />
      <Route path="/admin/customers" element={<CustomerManagementPage />} />
      <Route path="/admin/inquiries" element={<InquiryManagementPageAdmin />} />
      <Route path="/admin/moderation" element={<ListingModerationPage />} />
      <Route path="/admin/analytics" element={<PlatformAnalyticsPage />} />
      <Route path="/admin/profile" element={<AdminProfilePage />} />
    </Routes>
  );
}
