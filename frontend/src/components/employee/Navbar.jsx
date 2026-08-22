import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { label: "Dashboard", path: "/", icon: "⬛" },
    { label: "Profile", path: "/employee/profile", icon: "◆" },
    { label: "Attendance", path: "/employee/attendance", icon: "●" },
    { label: "Leave", path: "/employee/leave", icon: "▲" },
  ];

  return (
    <aside style={sidebarStyle}>
      <div style={logoStyle}>Dayflow</div>
      <p style={taglineStyle}>Every workday, aligned.</p>

      <nav style={{ marginTop: "32px" }}>
        {links.map((link) => {
          const active = location.pathname === link.path;
          return (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              style={{
                ...linkStyle,
                background: active ? "#0F766E" : "transparent",
                color: active ? "#fff" : "#4B5563",
                borderLeft: active ? "3px solid #F59E0B" : "3px solid transparent",
              }}
            >
              <span style={{ marginRight: "10px", fontSize: "10px" }}>{link.icon}</span>
              {link.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

const sidebarStyle = {
  position: "fixed",
  left: 0,
  top: 0,
  bottom: 0,
  width: "220px",
  background: "#fff",
  borderRight: "1px solid #E5E7EB",
  padding: "28px 16px",
};

const logoStyle = {
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 700,
  fontSize: "22px",
  color: "#0F766E",
};

const taglineStyle = {
  fontSize: "12px",
  color: "#9CA3AF",
  marginTop: "2px",
};

const linkStyle = {
  display: "block",
  width: "100%",
  textAlign: "left",
  border: "none",
  padding: "12px 14px",
  borderRadius: "0 8px 8px 0",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: 500,
  marginBottom: "4px",
};

export default Navbar;