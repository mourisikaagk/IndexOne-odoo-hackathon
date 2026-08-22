import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, User, Clock, CalendarDays, LogOut } from "lucide-react";

const tokens = {
  ink: "#2B1F3D",
  gold: "#D98E3B",
  lavender: "#C9C0D6",
  muted: "#B7ACC9",
};

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { label: "Dashboard", path: "/employee/dashboard", icon: LayoutDashboard },
    { label: "Profile", path: "/employee/profile", icon: User },
    { label: "Attendance", path: "/employee/attendance", icon: Clock },
    { label: "Leave", path: "/employee/leave", icon: CalendarDays },
  ];

  const isActive = (path) =>
    path === "/employee/dashboard"
      ? location.pathname === "/" || location.pathname === "/employee/dashboard"
      : location.pathname.startsWith(path);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <aside style={sidebarStyle}>
      <div>
        <div style={logoStyle}>Dayflow</div>
        <p style={taglineStyle}>Every workday, aligned.</p>

        <nav style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: 4 }}>
          {links.map((link) => {
            const active = isActive(link.path);
            const Icon = link.icon;

            return (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                style={{
                  ...linkStyle,
                  background: active ? "rgba(217,142,59,0.15)" : "transparent",
                  color: active ? tokens.gold : tokens.lavender,
                }}
              >
                <Icon size={16} />
                {link.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div>
        <div style={profileCardStyle}>
          <div style={avatarStyle}>JD</div>
          <p style={{ fontSize: 12, color: "#fff", margin: 0, fontWeight: 500 }}>John Doe</p>
          <p style={{ fontSize: 11, color: tokens.muted, margin: 0 }}>Engineering</p>
        </div>

        <button onClick={handleLogout} style={logoutStyle}>
          <LogOut size={16} />
          Log out
        </button>
      </div>
    </aside>
  );
}

const sidebarStyle = {
  position: "fixed",
  left: 0,
  top: 0,
  bottom: 0,
  width: "220px",
  background: tokens.ink,
  padding: "28px 16px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxSizing: "border-box",
  overflowY: "auto",
};

const logoStyle = {
  fontFamily: "'Fraunces', 'Poppins', serif",
  fontWeight: 600,
  fontSize: "22px",
  color: "#fff",
};

const taglineStyle = {
  fontSize: "12px",
  color: tokens.muted,
  marginTop: "2px",
};

const linkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  width: "100%",
  textAlign: "left",
  border: "none",
  padding: "10px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: 500,
};

const profileCardStyle = {
  padding: "14px",
  borderRadius: "10px",
  background: "rgba(255,255,255,0.06)",
  marginBottom: "10px",
};

const avatarStyle = {
  width: 32,
  height: 32,
  borderRadius: "50%",
  background: tokens.gold,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 12,
  fontWeight: 600,
  color: tokens.ink,
  marginBottom: 8,
};

const logoutStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  width: "100%",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "transparent",
  color: tokens.lavender,
  padding: "10px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: 500,
};

export default Navbar;