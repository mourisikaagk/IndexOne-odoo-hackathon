import { useNavigate } from "react-router-dom";

function AttendanceWeekly() {
  const navigate = useNavigate();

  // Mock data — will be replaced with API data later
  const weekData = [
    { date: "2026-08-17", day: "Mon", status: "Present" },
    { date: "2026-08-18", day: "Tue", status: "Present" },
    { date: "2026-08-19", day: "Wed", status: "Half-day" },
    { date: "2026-08-20", day: "Thu", status: "Absent" },
    { date: "2026-08-21", day: "Fri", status: "Leave" },
    { date: "2026-08-22", day: "Sat", status: "Present" },
  ];

  const statusColor = {
    Present: "#059669",
    Absent: "#dc2626",
    "Half-day": "#d97706",
    Leave: "#2563eb",
  };

  return (
    <div style={{ padding: "24px" }}>
      <h1>Weekly Attendance</h1>

      <table style={{ marginTop: "20px", borderCollapse: "collapse", width: "100%", maxWidth: "500px" }}>
        <thead>
          <tr>
            <th style={thStyle}>Day</th>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {weekData.map((row) => (
            <tr key={row.date}>
              <td style={tdStyle}>{row.day}</td>
              <td style={tdStyle}>{row.date}</td>
              <td style={{ ...tdStyle, color: statusColor[row.status], fontWeight: 600 }}>
                {row.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button style={linkBtnStyle} onClick={() => navigate("/employee/attendance")}>
        ← Back to Daily View
      </button>
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "10px",
  borderBottom: "2px solid #ddd",
  background: "#f3f4f6",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};

const linkBtnStyle = {
  marginTop: "20px",
  background: "none",
  border: "none",
  color: "#2563eb",
  cursor: "pointer",
  padding: 0,
  fontSize: "15px",
};

export default AttendanceWeekly;