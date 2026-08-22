import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LeaveApplyForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    leaveType: "Paid",
    startDate: "",
    endDate: "",
    remarks: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: axiosInstance.post("/leave/apply", formData) once backend is ready
    console.log("Leave request submitted:", formData);
    navigate("/employee/leave/status");
  };

  return (
    <div style={{ padding: "24px", maxWidth: "400px" }}>
      <h1>Apply for Leave</h1>

      <form onSubmit={handleSubmit}>
        <label>Leave Type</label>
        <select
          name="leaveType"
          value={formData.leaveType}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="Paid">Paid</option>
          <option value="Sick">Sick</option>
          <option value="Unpaid">Unpaid</option>
        </select>

        <label>Start Date</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <label>End Date</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <label>Remarks</label>
        <textarea
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          style={{ ...inputStyle, height: "80px" }}
          placeholder="Reason for leave"
        />

        <div>
          <button type="submit" style={btnStyle}>Submit Request</button>
          <button
            type="button"
            style={{ ...btnStyle, marginLeft: "12px", background: "#e5e7eb", color: "#000" }}
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "10px",
  marginTop: "6px",
  marginBottom: "16px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const btnStyle = {
  padding: "10px 20px",
  borderRadius: "8px",
  border: "none",
  background: "#2563eb",
  color: "#fff",
  cursor: "pointer",
};

export default LeaveApplyForm;