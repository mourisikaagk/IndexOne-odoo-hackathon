import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeDashboard from "./components/employee/EmployeeDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeDashboard />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;