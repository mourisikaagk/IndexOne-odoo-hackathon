import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AttendanceDaily() {
  const navigate = useNavigate();

  // Mock data — will be replaced with API data later
  const [attendance, setAttendance] = useState({
    date: "2026-08-22",
    checkIn: null,
    checkOut: null,
    status: "Not marked",
  });

  const handleCheckIn = () => {
    const time = new Date().toLocaleTimeString();
    setAttendance({ ...attendance, checkIn: time, status: "Present" });
    // TODO: axiosInstance.post("/attendance/checkin")
  };

  const handleCheckOut = () => {
    const time = new Date().toLocaleTimeString();
    setAttendance({ ...attendance, checkOut: time });
    // TODO: axiosInstance.post("/attendance/checkout")
  };

  return (
    <div style={{ padding: "24px" }}>
      <h1>Today's Attendance</h1>
      <p>Date: {attendance.date}</p>

      <div style={cardStyle}>
        <p><strong>Status:</strong> {attendance.status}</p>
        <p><strong>Check-in:</strong> {attendance.checkIn || "—"}</p>
        <p><strong>Check-out:</strong> {attendance.checkOut || "—"}</p>

        <div style={{ marginTop: "16px" }}>
          <button
            style={btnStyle}
            onClick={handleCheckIn}
            disabled={!!attendance.checkIn}
          >
            Check In
          </button>
          <button
            style={{ ...btnStyle, marginLeft: "12px", background: "#059669" }}
            onClick={handleCheckOut}
            disabled={!attendance.checkIn || !!attendance.checkOut}
          >
            Check Out
          </button>
        </div>
      </div>

      <div style={{ marginTop: "24px" }}>
        <button style={linkBtnStyle} onClick={() => navigate("/employee/attendance/weekly")}>
          View Weekly Attendance →
        </button>
      </div>

      <button style={{ ...linkBtnStyle, marginTop: "12px" }} onClick={() => navigate("/")}>
        ← Back to Dashboard
      </button>
    </div>
  );
}

const cardStyle = {
  marginTop: "20px",
  padding: "20px",
  border: "1px solid #eee",
  borderRadius: "12px",
  background: "#fafafa",
  maxWidth: "400px",
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
  background: "none",
  border: "none",
  color: "#2563eb",
  cursor: "pointer",
  padding: 0,
  fontSize: "15px",
};

export default AttendanceDaily;