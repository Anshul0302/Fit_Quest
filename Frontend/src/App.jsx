import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import ForgotPassword from "./pages/ForgotPassword";
import VerificationCode from "./pages/VerificationCode";
import NewPassword from "./pages/NewPassword";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./components/UserManagement";
import Layout from "./components/Layout"; // ✅ import layout
import "./App.css";
import UserDetails from "./components/View-Details/UserDetails";
import UserTable from "./components/Tables/UserTable";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerificationCode />} />
        <Route path="/reset-password" element={<NewPassword />} />

        {/* Protected Routes using Layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          {/* User Management nested routes */}
          <Route path="/user-management" element={<UserManagement />} >
            <Route index element={<UserTable />} /> {/* Default route */}
            <Route path="details/:id" element={<UserDetails />} />
          </Route>
          {/* Add more routes here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
