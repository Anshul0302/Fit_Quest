// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import AdminLogin from './pages/AdminLogin'
// import ForgotPassword from './pages/ForgotPassword'
// import './App.css'
// import VerificationCode from './pages/VerificationCode';
// import NewPassword from './pages/NewPassword';
// import UserManagement from './pages/UserManagement';
// import Dashboard from './pages/Dashboard';

// function App() {
 a
//   return (
//     <>
//       <Router>
//       <Routes>
//         <Route path="/" element={<AdminLogin />} />
//         <Route path="/admin-login" element={<AdminLogin />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/verify-otp" element={<VerificationCode />} />
//         <Route path="/reset-password" element={<NewPassword />} />

//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/user-management" element={<UserManagement />} />
//       </Routes>
//     </Router>
//     </>
//   )
// }

// export default App


// App.js
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
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/user-table" element={<UserTable/>} />
          <Route path="/user-details" element={<UserDetails/>} />
          {/* Add more routes here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
