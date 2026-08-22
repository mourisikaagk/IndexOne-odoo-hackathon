import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/employee/Navbar";
import EmployeeDashboard from "./components/employee/EmployeeDashboard";
import ProfileView from "./components/employee/ProfileView";
import ProfileEdit from "./components/employee/ProfileEdit";
import AttendanceDaily from "./components/employee/AttendanceDaily";
import AttendanceWeekly from "./components/employee/AttendanceWeekly";
import LeaveApplyForm from "./components/employee/LeaveApplyForm";
import LeaveStatusList from "./components/employee/LeaveStatusList";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ marginLeft: "220px", minHeight: "100vh" }}>
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;