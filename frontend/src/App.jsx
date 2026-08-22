import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeDashboard from "./components/employee/EmployeeDashboard";
import ProfileView from "./components/employee/ProfileView";
import ProfileEdit from "./components/employee/ProfileEdit";
import AttendanceDaily from "./components/employee/AttendanceDaily";
import AttendanceWeekly from "./components/employee/AttendanceWeekly";
import LeaveApplyForm from "./components/employee/LeaveApplyForm";
import LeaveStatusList from "./components/employee/LeaveStatusList";

// Keep any routes from the Team Leader's version here as they are added.
// import Login from "./pages/Login";
// import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeDashboard />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/employee/profile" element={<ProfileView />} />
        <Route path="/employee/profile/edit" element={<ProfileEdit />} />
        <Route path="/employee/attendance" element={<AttendanceDaily />} />
        <Route path="/employee/attendance/weekly" element={<AttendanceWeekly />} />
        <Route path="/employee/leave" element={<LeaveStatusList />} />
        <Route path="/employee/leave/apply" element={<LeaveApplyForm />} />
        <Route path="/employee/leave/status" element={<LeaveStatusList />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;