import { useNavigate } from "react-router-dom";

function ProfileView() {
  const navigate = useNavigate();

  // Mock data — will be replaced with API data later
  const profile = {
    fullName: "John Doe",
    email: "john.doe@company.com",
    phone: "+91 98765 43210",
    address: "123 MG Road, Bengaluru",
    jobTitle: "Software Engineer",
    department: "Engineering",
    dateOfJoining: "2023-06-15",
    salary: { basic: 40000, hra: 15000, allowances: 5000 },
    documents: ["Resume.pdf", "OfferLetter.pdf"],
    profilePicture: "https://via.placeholder.com/120",
  };

  return (
    <div style={{ padding: "24px" }}>
      <h1>My Profile</h1>

      <img
        src={profile.profilePicture}
        alt="Profile"
        style={{ borderRadius: "50%", width: "120px", height: "120px" }}
      />

      <h2 style={{ marginTop: "16px" }}>{profile.fullName}</h2>
      <p>{profile.jobTitle} — {profile.department}</p>

      <div style={sectionStyle}>
        <h3>Personal Details</h3>
        <p>Email: {profile.email}</p>
        <p>Phone: {profile.phone}</p>
        <p>Address: {profile.address}</p>
      </div>

      <div style={sectionStyle}>
        <h3>Job Details</h3>
        <p>Title: {profile.jobTitle}</p>
        <p>Department: {profile.department}</p>
        <p>Date of Joining: {profile.dateOfJoining}</p>
      </div>

      <div style={sectionStyle}>
        <h3>Salary Structure</h3>
        <p>Basic: ₹{profile.salary.basic}</p>
        <p>HRA: ₹{profile.salary.hra}</p>
        <p>Allowances: ₹{profile.salary.allowances}</p>
      </div>

      <div style={sectionStyle}>
        <h3>Documents</h3>
        <ul>
          {profile.documents.map((doc, i) => (
            <li key={i}>{doc}</li>
          ))}
        </ul>
      </div>

      <button style={btnStyle} onClick={() => navigate("/employee/profile/edit")}>
        Edit Profile
      </button>
      <button style={{ ...btnStyle, marginLeft: "12px", background: "#e5e7eb" }} onClick={() => navigate("/")}>
        Back to Dashboard
      </button>
    </div>
  );
}

const sectionStyle = {
  marginTop: "20px",
  padding: "16px",
  border: "1px solid #eee",
  borderRadius: "10px",
  background: "#fafafa",
};

const btnStyle = {
  marginTop: "24px",
  padding: "10px 20px",
  borderRadius: "8px",
  border: "none",
  background: "#2563eb",
  color: "#fff",
  cursor: "pointer",
};

export default ProfileView;