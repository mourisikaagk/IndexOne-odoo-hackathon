import { useEffect, useState } from 'react'
import './App.css'

const TOKEN_KEY = 'hrms_token'
const USER_KEY = 'hrms_user'
const adminLinks = [['/admin/dashboard', 'Dashboard'], ['/admin/employees', 'Employees'], ['/admin/attendance', 'Attendance'], ['/admin/leaves', 'Leave Requests'], ['/admin/payroll', 'Payroll'], ['/admin/reports', 'Reports']]
const employeeLinks = [['/employee/dashboard', 'Employee Dashboard'], ['/employee/profile', 'Profile'], ['/employee/attendance', 'Attendance'], ['/employee/apply-leave', 'Apply Leave'], ['/employee/leaves', 'Leave Status'], ['/employee/payroll', 'Payroll']]
const dashboardFor = (role) => role === 'ADMIN' ? '/admin/dashboard' : '/employee/dashboard'

function navigate(path, replace = false) { window.history[replace ? 'replaceState' : 'pushState']({}, '', path); window.dispatchEvent(new PopStateEvent('popstate')) }
async function request(path, options = {}) { const token = localStorage.getItem(TOKEN_KEY); const response = await fetch(path, { ...options, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers } }); const data = await response.json().catch(() => ({})); if (!response.ok) throw new Error(data.message || 'Something went wrong.'); return data }

function AuthPage({ onAuthenticated }) {
  const [mode, setMode] = useState('login'); const [form, setForm] = useState({ name: '', email: '', password: '', role: 'EMPLOYEE' }); const [error, setError] = useState(''); const [busy, setBusy] = useState(false)
  const submit = async (event) => { event.preventDefault(); setError(''); setBusy(true); try { const data = await request(`/api/auth/${mode === 'login' ? 'login' : 'signup'}`, { method: 'POST', body: JSON.stringify(form) }); localStorage.setItem(TOKEN_KEY, data.token); localStorage.setItem(USER_KEY, JSON.stringify(data.user)); onAuthenticated(data.user); navigate(dashboardFor(data.user.role), true) } catch (err) { setError(err.message) } finally { setBusy(false) } }
  return <main className="auth-page"><section className="auth-card"><p className="eyebrow">HRMS PORTAL</p><h1>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1><p className="muted">{mode === 'login' ? 'Sign in to continue to your workspace.' : 'Choose the role for this hackathon account.'}</p><form onSubmit={submit}>{mode === 'signup' && <label>Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>}<label>Email<input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label><label>Password<input type="password" minLength="6" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>{mode === 'signup' && <label>Role<select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}><option value="EMPLOYEE">Employee</option><option value="ADMIN">Admin / HR</option></select></label>}{error && <p className="error">{error}</p>}<button disabled={busy}>{busy ? 'Please wait…' : mode === 'login' ? 'Login' : 'Sign up'}</button></form><button className="link-button" onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError('') }}>{mode === 'login' ? 'Need an account? Sign up' : 'Already registered? Login'}</button></section></main>
}

function Unauthorized({ user }) { return <main className="message-page"><div><h1>Unauthorized</h1><p>You are not authorized to access this page.</p><button onClick={() => navigate(dashboardFor(user.role), true)}>Return to dashboard</button></div></main> }
function Portal({ user, onLogout, path }) { const isAdmin = user.role === 'ADMIN'; const links = isAdmin ? adminLinks : employeeLinks; const title = links.find(([route]) => route === path)?.[1] || 'Workspace'; return <div className="portal"><aside><div className="brand">HRMS</div><p className="role-label">{isAdmin ? 'ADMIN / HR' : 'EMPLOYEE'}</p><nav>{links.map(([route, label]) => <button className={path === route ? 'active' : ''} key={route} onClick={() => navigate(route)}>{label}</button>)}</nav><button className="logout" onClick={onLogout}>Logout</button></aside><main className="content"><header><div><p className="eyebrow">{isAdmin ? 'ADMINISTRATION' : 'MY WORKSPACE'}</p><h1>{title}</h1></div><div className="account"><strong>{user.name}</strong><span>{user.email}</span></div></header><section className="placeholder"><h2>{title}</h2><p>This page is protected and ready for its module implementation.</p></section></main></div> }

function App() {
  const [path, setPath] = useState(window.location.pathname); const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem(USER_KEY)) } catch { return null } }); const [checking, setChecking] = useState(Boolean(localStorage.getItem(TOKEN_KEY)))
  useEffect(() => { const listener = () => setPath(window.location.pathname); window.addEventListener('popstate', listener); return () => window.removeEventListener('popstate', listener) }, [])
  useEffect(() => { if (!localStorage.getItem(TOKEN_KEY)) { setChecking(false); return } request('/api/auth/me').then(({ user: verified }) => { setUser(verified); localStorage.setItem(USER_KEY, JSON.stringify(verified)) }).catch(() => { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(USER_KEY); setUser(null) }).finally(() => setChecking(false)) }, [])
  const logout = async () => { try { await request('/api/auth/logout', { method: 'POST' }) } catch { /* local session must still be removed */ } localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(USER_KEY); setUser(null); navigate('/login', true) }
  if (checking) return <main className="message-page"><p>Checking your session…</p></main>
  if (path === '/login' || path === '/signup') return user ? (navigate(dashboardFor(user.role), true), null) : <AuthPage onAuthenticated={setUser} />
  if (!user) { navigate('/login', true); return null }
  if (path === '/unauthorized') return <Unauthorized user={user} />
  const adminRoute = path.startsWith('/admin/'); const employeeRoute = path.startsWith('/employee/')
  if ((adminRoute && user.role !== 'ADMIN') || (employeeRoute && user.role !== 'EMPLOYEE')) return <Unauthorized user={user} />
  if (!adminRoute && !employeeRoute) { navigate(dashboardFor(user.role), true); return null }
  return <Portal user={user} onLogout={logout} path={path} />
}
export default App
