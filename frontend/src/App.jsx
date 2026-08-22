import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeDashboard from "./components/employee/EmployeeDashboard";

// Keep any routes from the Team Leader's version here as they are added.
// import Login from "./pages/Login";
// import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeDashboard />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
