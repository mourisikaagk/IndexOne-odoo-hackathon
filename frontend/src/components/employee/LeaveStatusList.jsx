import { useNavigate } from "react-router-dom";

function LeaveStatusList() {
  const navigate = useNavigate();

  // Mock data — will be replaced with API data later
  const leaveRequests = [
    { id: 1, type: "Sick", from: "2026-08-10", to: "2026-08-11", status: "Approved" },
    { id: 2, type: "Paid", from: "2026-08-18", to: "2026-08-19", status: "Pending" },
    { id: 3, type: "Unpaid", from: "2026-07-25", to: "2026-07-25", status: "Rejected" },
  ];

  const statusColor = {
    Approved: "#059669",
    Pending: "#d97706",
    Rejected: "#dc2626",
  };

  return (
    <div style={{ padding: "24px" }}>
      <h1>My Leave Requests</h1>

      <button style={btnStyle} onClick={() => navigate("/employee/leave/apply")}>
        + Apply for Leave
      </button>

      <table style={{ marginTop: "20px", borderCollapse: "collapse", width: "100%", maxWidth: "550px" }}>
        <thead>
          <tr>
            <th style={thStyle}>Type</th>
            <th style={thStyle}>From</th>
            <th style={thStyle}>To</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((req) => (
            <tr key={req.id}>
              <td style={tdStyle}>{req.type}</td>
              <td style={tdStyle}>{req.from}</td>
              <td style={tdStyle}>{req.to}</td>
              <td style={{ ...tdStyle, color: statusColor[req.status], fontWeight: 600 }}>
                {req.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button style={linkBtnStyle} onClick={() => navigate("/")}>
        ← Back to Dashboard
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

const btnStyle = {
  padding: "10px 20px",
  borderRadius: "8px",
  border: "none",
  background: "#2563eb",
  color: "#fff",
  cursor: "pointer",
};

const linkBtnStyle = {
  display: "block",
  marginTop: "20px",
  background: "none",
  border: "none",
  color: "#2563eb",
  cursor: "pointer",
  padding: 0,
  fontSize: "15px",
};

export default LeaveStatusList;