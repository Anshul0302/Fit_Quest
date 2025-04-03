import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import ForgotPassword from "./pages/ForgotPassword";
import VerificationCode from "./pages/VerificationCode";
import NewPassword from "./pages/NewPassword";
import UserManagement from "./pages/UserManagement";
import Dashboard from "./pages/Dashboard";
import AdminLayout from "./pages/AdminLayout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerificationCode />} />
        <Route path="/reset-password" element={<NewPassword />} />

        {/* Admin Layout with Sidebar + Content */}
        {/* <Route path="/admin" element={<AdminLayout />}> */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        {/* </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
