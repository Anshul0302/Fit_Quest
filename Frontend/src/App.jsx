import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/Auth/AdminLogin";
import ForgotPassword from "./components/Auth/ForgotPassword";
import VerificationCode from "./components/Auth/VerificationCode";
import NewPassword from "./components/Auth/NewPassword";
import Dashboard from "./components/Dashboard/Dashboard";
import UserManagement from "./pages/UserManagement";
import Layout from "./components/Layout/Layout";
import "./App.css";
import UserDetails from "./components/UserManagement/UserDetails";
import UserDetailsCH from "./components/ChallengeManagement/UserDetailsCH";
import UserTable from "./components/Tables/UserTable";
import OrderManagement from "./pages/OrderManagement";
import Ordertable from "./components/Tables/OrderTable";
import OrderDetails from "./components/OrderManagement/OrderDetails";
import "react-datepicker/dist/react-datepicker.css";
import ChallengeTable from "./components/ChallengeManagement/ChallengeTable";
import AddChallenge from "./components/ChallengeManagement/AddChallenge";
import ViewChallenge from "./components/ChallengeManagement/ViewChallenge";
import EditChallenge from "./components/ChallengeManagement/EditCHallenge";
import ViewParticipants from "./components/ChallengeManagement/ViewParticipants";
import UserTaskHistory from "./components/ChallengeManagement/UserTaskHistory";
import LeaderboardManagement from "./components/Leaderboard/LeaderboardManagement";
import ChampionshipListPage from "./components/Leaderboard/ChampionshipListPage";
import ChampionshipCreatePage from "./components/Leaderboard/ChampionshipCreatePage";
import ChampionshipDetailsPage from "./components/Leaderboard/ChampionshipDetailsPage";
import ParticipantsListPage from "./components/Leaderboard/ParticipantsListPage";
import LeaderboardPage from "./components/Leaderboard/LeaderboardPage";
import UserDetailsPage from "./components/Leaderboard/UserDetailsPage";

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
          <Route path="/user-table" element={<UserTable />} />
          <Route path="/users/:id" element={<UserDetails />} />

          <Route path="/order-management" element={<OrderManagement />} />
          <Route path="/order-table" element={<Ordertable />} />
          <Route path="/orders/:id" element={<OrderDetails />} />

          <Route path="/challenges" element={<ChallengeTable />} />
          <Route path="/challenges/add" element={<AddChallenge />} />
          <Route path="/admin/challenges/view/:id" element={<ViewChallenge />} />
          <Route path="/admin/challenges/participants/:id" element={<ViewParticipants />} />
          <Route path="/admin/challenges/edit/:id" element={<EditChallenge />} />
          <Route path="/admin/user/:id" element={<UserDetailsCH />} />
          <Route path="/admin/user/history/:id" element={<UserTaskHistory />} />


        <Route path="/leaderboard" element={<ChampionshipListPage />} />
        <Route path="/championships/create" element={<ChampionshipCreatePage />} />
        <Route path="/championships/view/:id" element={<ChampionshipDetailsPage />} />
        <Route path="/participants" element={<ParticipantsListPage />} />
        <Route path="/usersParticipants/:id" element={<UserDetailsPage />} />
        <Route path="/leaderboardPage" element={<LeaderboardPage />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
