import { useNavigate } from "react-router-dom";

function EmployeeDashboard() {
  const navigate = useNavigate();

  // Mock data — will be replaced with API data later
  const employee = {
    name: "John Doe",
    designation: "Software Engineer",
    attendanceToday: "Present",
    pendingLeaves: 1,
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ padding: "24px" }}>
      <h1>Welcome, {employee.name} 👋</h1>
      <p>{employee.designation}</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginTop: "24px",
        }}
      >
        <div style={cardStyle} onClick={() => navigate("/employee/profile")}>
          <h3>👤 Profile</h3>
          <p>View & edit your details</p>
        </div>

        <div style={cardStyle} onClick={() => navigate("/employee/attendance")}>
          <h3>🕒 Attendance</h3>
          <p>Today: {employee.attendanceToday}</p>
        </div>

        <div style={cardStyle} onClick={() => navigate("/employee/leave")}>
          <h3>📅 Leave Requests</h3>
          <p>{employee.pendingLeaves} pending</p>
        </div>

        <div style={{ ...cardStyle, background: "#fee2e2" }} onClick={handleLogout}>
          <h3>🚪 Logout</h3>
        </div>
      </div>

      <div style={{ marginTop: "32px" }}>
        <h3>Recent Activity</h3>
        <ul>
          <li>Checked in at 9:15 AM</li>
          <li>Leave request submitted — Pending</li>
        </ul>
      </div>
    </div>
  );
}

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "20px",
  cursor: "pointer",
  background: "#f9fafb",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
};

export default EmployeeDashboard;