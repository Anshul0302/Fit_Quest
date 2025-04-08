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
import UserChallengeTable from "./components/Tables/UserChallengeTable";
import UserChallengeDetails from "./components/View-Details/UserChallengeDetails";
import StoreManagement from "./components/StoreManagement";
import ProductTable from "./components/Tables/ProductTable";

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
            <Route path="user-challenges/:id" element={<UserChallengeTable />} />
            <Route path="user-challenge-details/:id" element={<UserChallengeDetails/>} />
          </Route>

           {/* Store Management nested routes */}
           <Route path="/store-management" element={<StoreManagement />} >
            <Route index element={<ProductTable />} /> {/* Default route */}
            {/* <Route path="details/:id" element={<UserDetails />} />
            <Route path="user-challenges/:id" element={<UserChallengeTable />} />
            <Route path="user-challenge-details/:id" element={<UserChallengeDetails/>} /> */}
          </Route>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
