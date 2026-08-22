import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeDashboard from "./components/employee/EmployeeDashboard";
import ProfileView from "./components/employee/ProfileView";
import ProfileEdit from "./components/employee/ProfileEdit";

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
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;