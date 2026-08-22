import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfileEdit() {
  const navigate = useNavigate();

  // Pre-filled with mock existing data — only editable fields per spec
  const [formData, setFormData] = useState({
    phone: "+91 98765 43210",
    address: "123 MG Road, Bengaluru",
    profilePicture: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call axiosInstance.put("/employee/profile", formData) once backend is ready
    console.log("Updated profile:", formData);
    navigate("/employee/profile");
  };

  return (
    <div style={{ padding: "24px", maxWidth: "400px" }}>
      <h1>Edit Profile</h1>
      <p style={{ color: "#666" }}>You can only update phone, address, and profile picture.</p>

      <form onSubmit={handleSubmit}>
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          style={{ ...inputStyle, height: "80px" }}
        />

        <label>Profile Picture</label>
        <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginBottom: "16px" }} />

        <div>
          <button type="submit" style={btnStyle}>Save Changes</button>
          <button
            type="button"
            style={{ ...btnStyle, marginLeft: "12px", background: "#e5e7eb", color: "#000" }}
            onClick={() => navigate("/employee/profile")}
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

export default ProfileEdit;