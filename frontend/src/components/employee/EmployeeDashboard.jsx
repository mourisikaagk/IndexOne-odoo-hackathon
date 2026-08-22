import { useNavigate } from "react-router-dom";
import { User, Clock, CalendarDays, LogOut, Bell } from "lucide-react";

const tokens = {
  gold: "#D98E3B",
  goldSoft: "#F6E4C8",
  lavender: "#8B7FA8",
  ivory: "#F6F3EE",
  card: "#FFFFFF",
  textPrimary: "#211826",
  textMuted: "#756C82",
  border: "#EAE5DC",
  green: "#3D7A5C",
};

function EmployeeDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const cards = [
    {
      title: "Profile",
      sub: "Software Engineer",
      icon: User,
      accent: tokens.lavender,
      onClick: () => navigate("/employee/profile"),
    },
    {
      title: "Attendance",
      sub: "Checked in — 9:14 AM",
      icon: Clock,
      accent: tokens.green,
      onClick: () => navigate("/employee/attendance"),
    },
    {
      title: "Leave requests",
      sub: "1 pending approval",
      icon: CalendarDays,
      accent: tokens.gold,
      onClick: () => navigate("/employee/leave"),
    },
    {
      title: "Log out",
      sub: "End your session",
      icon: LogOut,
      accent: tokens.textMuted,
      onClick: handleLogout,
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        background: tokens.ivory,
        padding: "32px 40px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ fontSize: 13, color: tokens.textMuted, margin: 0 }}>Saturday, 22 August</p>
          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 600,
              fontSize: 30,
              color: tokens.textPrimary,
              margin: "4px 0 0",
            }}
          >
            Good morning, John
          </h1>
        </div>

        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: tokens.card,
            border: `1px solid ${tokens.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Bell size={16} color={tokens.textMuted} />
        </div>
      </div>

      <div
        style={{
          marginTop: 28,
          background: tokens.card,
          border: `1px solid ${tokens.border}`,
          borderRadius: 14,
          padding: "18px 22px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12,
            color: tokens.textMuted,
            marginBottom: 10,
          }}
        >
          <span>Check-in · 9:14 AM</span>
          <span>Now · 11:42 AM</span>
          <span>Check-out · —</span>
        </div>

        <div
          style={{
            position: "relative",
            height: 6,
            borderRadius: 3,
            background: tokens.border,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: "34%",
              borderRadius: 3,
              background: `linear-gradient(90deg, ${tokens.green}, ${tokens.gold})`,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "34%",
              top: -4,
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: tokens.gold,
              border: "3px solid #fff",
              boxShadow: "0 0 0 1px rgba(0,0,0,0.06)",
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          gap: 14,
          marginTop: 24,
        }}
      >
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              onClick={card.onClick}
              style={{
                background: tokens.card,
                border: `1px solid ${tokens.border}`,
                borderRadius: 14,
                padding: "18px",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  background: `${card.accent}22`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 14,
                }}
              >
                <Icon size={16} color={card.accent} />
              </div>
              <p style={{ fontWeight: 600, fontSize: 15, margin: 0, color: tokens.textPrimary }}>
                {card.title}
              </p>
              <p style={{ fontSize: 12.5, color: tokens.textMuted, margin: "4px 0 0" }}>
                {card.sub}
              </p>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 28 }}>
        <h3
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 600,
            fontSize: 17,
            color: tokens.textPrimary,
            marginBottom: 12,
          }}
        >
          Recent activity
        </h3>

        {[
          { text: "Checked in at 9:14 AM", tag: "Attendance" },
          { text: "Leave request submitted for Aug 28–29", tag: "Pending" },
        ].map((activity, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 0",
              borderBottom: index === 0 ? `1px solid ${tokens.border}` : "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: tokens.gold }} />
              <span style={{ fontSize: 14, color: tokens.textPrimary }}>{activity.text}</span>
            </div>
            <span
              style={{
                fontSize: 11,
                color: tokens.textMuted,
                background: tokens.goldSoft,
                padding: "3px 10px",
                borderRadius: 20,
              }}
            >
              {activity.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeDashboard;