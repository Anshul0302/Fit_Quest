import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin'
import ForgotPassword from './pages/ForgotPassword'
import './App.css'
import VerificationCode from './pages/VerificationCode';
import NewPassword from './pages/NewPassword';
import UserManagement from './pages/UserManagement';
import Dashboard from './pages/Dashboard';

function App() {
 
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerificationCode />} />
        <Route path="/reset-password" element={<NewPassword />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user-management" element={<UserManagement />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
