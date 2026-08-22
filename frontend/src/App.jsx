import { useState } from 'react'
import Notifications from './components/Notifications/Notifications'
import EmployeePayroll from './components/Payroll/EmployeePayroll'
import AdminPayroll from './components/Payroll/AdminPayroll'
import DashboardAnalytics from './components/Reports/DashboardAnalytics'
import AttendanceReport from './components/Reports/AttendanceReport'
import PayrollReport from './components/Reports/PayrollReport'
import './App.css'

function App() {
  const [role, setRole] = useState('admin')
  const [page, setPage] = useState('dashboard')
  const isAdmin = role === 'admin'
  const changeRole = (nextRole) => { setRole(nextRole); setPage('dashboard') }
  const navItem = (name, label) => <button className={page === name ? 'active' : ''} onClick={() => setPage(name)}>{label}</button>
  return <div className="hr-app">
    <header className="app-navbar">
      <div className="app-brand"><span>H</span>Horizon<span>HR</span></div>
      <nav>{navItem('dashboard', 'Dashboard')}{isAdmin && navItem('reports', 'Reports')}{navItem('attendance', 'Attendance')}{navItem('payroll', 'Payroll')}</nav>
      <div className="navbar-actions"><div className="role-switch" aria-label="Demo role selector"><button onClick={() => changeRole('employee')} className={!isAdmin ? 'selected' : ''}>Employee</button><button onClick={() => changeRole('admin')} className={isAdmin ? 'selected' : ''}>Admin / HR</button></div><Notifications role={role} /><span className="profile-avatar">{isAdmin ? 'HR' : 'AS'}</span></div>
    </header>
    {page === 'payroll' ? (isAdmin ? <AdminPayroll /> : <EmployeePayroll />) : page === 'reports' ? <PayrollReport /> : page === 'attendance' ? <AttendanceReport /> : <main className="demo-content">
      <section className="page-title"><div><p>HORIZON HR / DASHBOARD</p><h1>Welcome back, {isAdmin ? 'Renu' : 'Aarav'}</h1><span>{isAdmin ? 'Here is your team overview for today.' : 'Here is your personal work overview for today.'}</span></div><span className="today">Today: Friday, 22 August 2026</span></section>
      {isAdmin ? <DashboardAnalytics /> : <section className="overview-grid"><article><span className="metric-icon blue">L</span><p>Leave balance</p><strong>12 days</strong><small>Annual leave remaining</small></article><article><span className="metric-icon green">OK</span><p>Today attendance</p><strong>Present</strong><small>Checked in at 9:08 AM</small></article><article><span className="metric-icon amber">$</span><p>Next salary</p><strong>₹52,200</strong><small>Expected on 31 Aug</small></article></section>}
      <section className="content-card"><div><span className="card-icon">N</span><h2>Stay up to date</h2><p>Use the bell in the top navigation to view and manage your {isAdmin ? 'team and employee' : 'leave and HR'} notifications. Unread messages are highlighted and can be marked as read.</p></div><button className="demo-button">View dashboard</button></section>
    </main>}
  </div>
}
export default App
