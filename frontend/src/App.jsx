import { useState } from 'react'
import Notifications from './components/Notifications/Notifications'
import './App.css'

function App() {
  const [role, setRole] = useState('admin')
  const isAdmin = role === 'admin'
  return <div className="hr-app">
    <header className="app-navbar">
      <div className="app-brand"><span>H</span>Horizon<span>HR</span></div>
      <nav><a className="active">Dashboard</a><a>Leave</a><a>Attendance</a>{isAdmin && <a>Payroll</a>}</nav>
      <div className="navbar-actions"><div className="role-switch" aria-label="Demo role selector"><button onClick={() => setRole('employee')} className={!isAdmin ? 'selected' : ''}>Employee</button><button onClick={() => setRole('admin')} className={isAdmin ? 'selected' : ''}>Admin / HR</button></div><Notifications role={role} /><span className="profile-avatar">{isAdmin ? 'HR' : 'AS'}</span></div>
    </header>
    <main className="demo-content">
      <section className="page-title"><div><p>HORIZON HR / DASHBOARD</p><h1>Welcome back, {isAdmin ? 'Renu' : 'Aarav'}</h1><span>{isAdmin ? 'Here is your team overview for today.' : 'Here is your personal work overview for today.'}</span></div><span className="today">Today: Friday, 22 August 2026</span></section>
      <section className="overview-grid">
        <article><span className="metric-icon blue">E</span><p>{isAdmin ? 'Total employees' : 'Leave balance'}</p><strong>{isAdmin ? '48' : '12 days'}</strong><small>{isAdmin ? '4 joined this month' : 'Annual leave remaining'}</small></article>
        <article><span className="metric-icon green">OK</span><p>{isAdmin ? 'Present today' : 'Today attendance'}</p><strong>{isAdmin ? '42' : 'Present'}</strong><small>{isAdmin ? '87.5% attendance' : 'Checked in at 9:08 AM'}</small></article>
        <article><span className="metric-icon amber">L</span><p>{isAdmin ? 'Pending leave requests' : 'Leave requests'}</p><strong>{isAdmin ? '6' : '1'}</strong><small>{isAdmin ? 'Requires review' : 'Pending approval'}</small></article>
      </section>
      <section className="content-card"><div><span className="card-icon">N</span><h2>Stay up to date</h2><p>Use the bell in the top navigation to view and manage your {isAdmin ? 'team and employee' : 'leave and HR'} notifications. Unread messages are highlighted and can be marked as read.</p></div><button className="demo-button">View dashboard</button></section>
    </main>
  </div>
}
export default App
