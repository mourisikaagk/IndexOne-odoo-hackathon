import { useState } from "react";
import { User, Clock, CalendarDays, LogOut, Bell } from "lucide-react";

const tokens = {
  ink: "#2B1F3D",
  inkLight: "#4A3B63",
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
  const [active, setActive] = useState("Dashboard");

  const links = [
    { label: "Dashboard", icon: User },
    { label: "Profile", icon: User },
    { label: "Attendance", icon: Clock },
    { label: "Leave", icon: CalendarDays },
  ];

  const cards = [
    { title: "Profile", sub: "Software Engineer", icon: User, accent: tokens.lavender },
    { title: "Attendance", sub: "Checked in — 9:14 AM", icon: Clock, accent: tokens.green },
    { title: "Leave requests", sub: "1 pending approval", icon: CalendarDays, accent: tokens.gold },
    { title: "Log out", sub: "End your session", icon: LogOut, accent: tokens.textMuted },
  ];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "600px",
        fontFamily: "'Inter', sans-serif",
        background: tokens.ivory,
      }}
    >
      <div
        style={{
          width: 220,
          background: tokens.ink,
          padding: "28px 16px",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 600,
            fontSize: 22,
            color: "#fff",
          }}
        >
          Dayflow
        </div>
        <p style={{ fontSize: 12, color: "#B7ACC9", marginTop: 2 }}>
          Every workday, aligned.
        </p>

        <nav style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 4 }}>
          {links.map((link) => {
            const isActive = active === link.label;
            const Icon = link.icon;

            return (
              <button
                key={link.label}
                onClick={() => setActive(link.label)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  border: "none",
                  textAlign: "left",
                  padding: "10px 12px",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 500,
                  background: isActive ? "rgba(217,142,59,0.15)" : "transparent",
                  color: isActive ? tokens.gold : "#C9C0D6",
                }}
              >
                <Icon size={16} />
                {link.label}
              </button>
            );
          })}
        </nav>

        <div
          style={{
            marginTop: 40,
            padding: "14px",
            borderRadius: 10,
            background: "rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
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
            }}
          >
            JD
          </div>
          <p style={{ fontSize: 12, color: "#fff", margin: 0, fontWeight: 500 }}>John Doe</p>
          <p style={{ fontSize: 11, color: "#B7ACC9", margin: 0 }}>Engineering</p>
        </div>
      </div>

      <div style={{ flex: 1, padding: "32px 40px" }}>
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
    </div>
  );
}

export default EmployeeDashboard;