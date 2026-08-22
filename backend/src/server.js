require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Leave = require('./models/Leave');
const Attendance = require('./models/Attendance');
const { hashPassword, verifyPassword, signToken } = require('./utils/auth');
const { requireAuth, allowRoles, revokedTokens } = require('./middleware/auth');

const app = express();
const clientOrigins = [process.env.CLIENT_URL || 'http://localhost:5173', 'http://127.0.0.1:5173'];
app.use(cors({ origin: (origin, callback) => callback(null, !origin || clientOrigins.includes(origin)) }));
app.use(express.json());

const asyncRoute = (handler) => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
const dayStart = (value = new Date()) => { const date = new Date(value); date.setHours(0, 0, 0, 0); return date; };
const publicUser = (user) => user.toSafeObject ? user.toSafeObject() : user;
const isEmail = (value) => /^\S+@\S+\.\S+$/.test(value || '');

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.post('/api/auth/signup', asyncRoute(async (req, res) => {
  const { name, email, password, role = 'EMPLOYEE' } = req.body;
  if (!name?.trim() || !isEmail(email) || !password || password.length < 6) return res.status(400).json({ message: 'Name, a valid email, and a password of at least 6 characters are required.' });
  if (!['EMPLOYEE', 'ADMIN'].includes(role)) return res.status(400).json({ message: 'Invalid role.' });
  if (await User.exists({ email: email.toLowerCase() })) return res.status(400).json({ message: 'An account with this email already exists.' });
  const user = await User.create({ name, email, role, passwordHash: await hashPassword(password), joiningDate: new Date() });
  res.status(201).json({ user: publicUser(user), token: signToken(user) });
}));

app.post('/api/auth/login', asyncRoute(async (req, res) => {
  const { email, password } = req.body;
  if (!isEmail(email) || !password) return res.status(400).json({ message: 'Email and password are required.' });
  const user = await User.findOne({ email: email.toLowerCase() }).select('+passwordHash');
  if (!user || user.status !== 'ACTIVE' || !(await verifyPassword(password, user.passwordHash))) return res.status(401).json({ message: 'Invalid email or password.' });
  res.json({ user: publicUser(user), token: signToken(user) });
}));

app.post('/api/auth/logout', requireAuth, (req, res) => { revokedTokens.add(req.token); res.json({ message: 'Logged out successfully.' }); });
app.get('/api/auth/me', requireAuth, (req, res) => res.json({ user: publicUser(req.user) }));

// Employees may keep their own contact details current; job and access details
// remain admin-managed.
app.patch('/api/profile', requireAuth, asyncRoute(async (req, res) => {
  const { phone } = req.body;
  if (phone !== undefined && String(phone).trim().length > 30) return res.status(400).json({ message: 'Phone number is too long.' });
  req.user.phone = phone === undefined ? req.user.phone : String(phone).trim();
  await req.user.save();
  res.json({ user: publicUser(req.user), message: 'Profile updated.' });
}));

app.get('/api/admin/dashboard', requireAuth, allowRoles('ADMIN'), asyncRoute(async (req, res) => {
  const today = dayStart();
  const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);
  const [totalEmployees, presentToday, onLeave, pendingLeaves, recentLeaves] = await Promise.all([
    User.countDocuments({ role: 'EMPLOYEE', status: 'ACTIVE' }),
    Attendance.countDocuments({ date: { $gte: today, $lt: tomorrow }, status: 'PRESENT' }),
    Leave.countDocuments({ status: 'APPROVED', fromDate: { $lte: today }, toDate: { $gte: today } }),
    Leave.countDocuments({ status: 'PENDING' }),
    Leave.find().sort({ updatedAt: -1 }).limit(5).populate('employeeId', 'name').lean(),
  ]);
  res.json({
    success: true,
    data: {
      totalEmployees,
      presentToday,
      onLeave,
      pendingLeaves,
      // Payroll has no model or API in this project yet, so this remains a truthful default.
      payrollSummary: { total: 0, processedEmployees: 0 },
      recentActivities: recentLeaves.map((leave) => ({
        id: leave._id,
        activity: 'Leave request',
        employee: leave.employeeId?.name || 'Employee',
        status: leave.status,
        createdAt: leave.updatedAt,
      })),
    },
  });
}));

app.get('/api/employees', requireAuth, allowRoles('ADMIN'), asyncRoute(async (req, res) => {
  const search = req.query.search?.trim();
  const query = { role: 'EMPLOYEE' };
  if (search) query.$or = ['name', 'email', 'department', 'designation'].map((field) => ({ [field]: { $regex: search, $options: 'i' } }));
  res.json({ employees: await User.find(query).sort({ createdAt: -1 }) });
}));
app.get('/api/employees/:id', requireAuth, asyncRoute(async (req, res) => {
  if (req.user.role !== 'ADMIN' && req.user.id !== req.params.id) return res.status(403).json({ message: 'You can only view your own profile.' });
  const employee = await User.findOne({ _id: req.params.id, role: 'EMPLOYEE' });
  if (!employee) return res.status(404).json({ message: 'Employee not found.' });
  res.json({ employee });
}));
app.post('/api/employees', requireAuth, allowRoles('ADMIN'), asyncRoute(async (req, res) => {
  const { name, email, password = 'welcome123', phone, department, designation, joiningDate, salary } = req.body;
  if (!name?.trim() || !isEmail(email)) return res.status(400).json({ message: 'Name and valid email are required.' });
  if (await User.exists({ email: email.toLowerCase() })) return res.status(400).json({ message: 'An account with this email already exists.' });
  const employee = await User.create({ name, email, passwordHash: await hashPassword(password), role: 'EMPLOYEE', phone, department, designation, joiningDate, salary });
  res.status(201).json({ employee: publicUser(employee) });
}));
app.put('/api/employees/:id', requireAuth, allowRoles('ADMIN'), asyncRoute(async (req, res) => {
  const allowed = ['name', 'phone', 'department', 'designation', 'joiningDate', 'salary', 'status'];
  const update = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)));
  const employee = await User.findOneAndUpdate({ _id: req.params.id, role: 'EMPLOYEE' }, update, { new: true, runValidators: true });
  if (!employee) return res.status(404).json({ message: 'Employee not found.' });
  res.json({ employee });
}));
app.delete('/api/employees/:id', requireAuth, allowRoles('ADMIN'), asyncRoute(async (req, res) => {
  const employee = await User.findOneAndUpdate({ _id: req.params.id, role: 'EMPLOYEE' }, { status: 'INACTIVE' }, { new: true });
  if (!employee) return res.status(404).json({ message: 'Employee not found.' });
  res.json({ message: 'Employee deactivated.', employee });
}));

app.post('/api/leaves', requireAuth, asyncRoute(async (req, res) => {
  const { leaveType, fromDate, toDate, reason } = req.body;
  if (!leaveType?.trim() || !fromDate || !toDate || !reason?.trim()) return res.status(400).json({ message: 'Leave type, dates, and reason are required.' });
  if (new Date(fromDate) > new Date(toDate)) return res.status(400).json({ message: 'From date cannot be after to date.' });
  const leave = await Leave.create({ employeeId: req.user.id, leaveType, fromDate, toDate, reason });
  res.status(201).json({ leave });
}));
app.get('/api/leaves', requireAuth, asyncRoute(async (req, res) => {
  const query = req.user.role === 'ADMIN' ? {} : { employeeId: req.user.id };
  if (req.query.status && ['PENDING', 'APPROVED', 'REJECTED'].includes(req.query.status.toUpperCase())) query.status = req.query.status.toUpperCase();
  const leaves = await Leave.find(query).sort({ createdAt: -1 }).populate('employeeId', 'name email department');
  res.json({ leaves });
}));
app.get('/api/leaves/:id', requireAuth, asyncRoute(async (req, res) => {
  const leave = await Leave.findById(req.params.id).populate('employeeId', 'name email department');
  if (!leave) return res.status(404).json({ message: 'Leave request not found.' });
  if (req.user.role !== 'ADMIN' && leave.employeeId._id.toString() !== req.user.id) return res.status(403).json({ message: 'You can only view your own leave requests.' });
  res.json({ leave });
}));
async function reviewLeave(req, res, status) {
  const leave = await Leave.findById(req.params.id);
  if (!leave) return res.status(404).json({ message: 'Leave request not found.' });
  if (leave.status !== 'PENDING') return res.status(400).json({ message: 'Only pending leave requests can be reviewed.' });
  leave.status = status; leave.reviewedBy = req.user.id; await leave.save();
  res.json({ leave });
}
app.put('/api/leaves/:id/approve', requireAuth, allowRoles('ADMIN'), asyncRoute((req, res) => reviewLeave(req, res, 'APPROVED')));
app.put('/api/leaves/:id/reject', requireAuth, allowRoles('ADMIN'), asyncRoute((req, res) => reviewLeave(req, res, 'REJECTED')));

app.post('/api/attendance/check-in', requireAuth, asyncRoute(async (req, res) => {
  const date = dayStart();
  let attendance = await Attendance.findOne({ employeeId: req.user.id, date });
  if (attendance?.checkIn) return res.status(400).json({ message: 'You are already checked in today.' });
  attendance = attendance || new Attendance({ employeeId: req.user.id, date });
  attendance.checkIn = new Date(); attendance.status = 'PRESENT'; await attendance.save();
  res.status(201).json({ attendance });
}));
app.post('/api/attendance/check-out', requireAuth, asyncRoute(async (req, res) => {
  const attendance = await Attendance.findOne({ employeeId: req.user.id, date: dayStart() });
  if (!attendance?.checkIn) return res.status(400).json({ message: 'Check in before checking out.' });
  attendance.checkOut = new Date(); await attendance.save(); res.json({ attendance });
}));
app.get('/api/attendance/today', requireAuth, allowRoles('ADMIN'), asyncRoute(async (req, res) => {
  const today = dayStart(); const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);
  const [employees, marked] = await Promise.all([
    User.find({ role: 'EMPLOYEE', status: 'ACTIVE' }).select('name email department designation').sort({ name: 1 }).lean(),
    Attendance.find({ date: { $gte: today, $lt: tomorrow } }).populate('employeeId', 'name email department designation').lean(),
  ]);
  const entries = new Map(marked.map((item) => [item.employeeId?._id.toString(), item]));
  const attendance = employees.map((employee) => entries.get(employee._id.toString()) || ({
    _id: `absent-${employee._id}`, employeeId: employee, date: today, status: 'ABSENT', checkIn: null, checkOut: null,
  }));
  res.json({ attendance });
}));
app.get('/api/attendance/summary', requireAuth, allowRoles('ADMIN'), asyncRoute(async (req, res) => {
  const match = {};
  if (req.query.from || req.query.to) {
    match.date = {};
    if (req.query.from) match.date.$gte = dayStart(req.query.from);
    if (req.query.to) { const end = dayStart(req.query.to); end.setDate(end.getDate() + 1); match.date.$lt = end; }
  }
  const summary = await Attendance.aggregate([
    { $match: match },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);
  res.json({ summary: Object.fromEntries(summary.map((item) => [item._id, item.count])) });
}));
app.get('/api/attendance/:employeeId', requireAuth, asyncRoute(async (req, res) => {
  if (req.user.role !== 'ADMIN' && req.user.id !== req.params.employeeId) return res.status(403).json({ message: 'You can only view your own attendance.' });
  res.json({ attendance: await Attendance.find({ employeeId: req.params.employeeId }).sort({ date: -1 }) });
}));
app.get('/api/attendance', requireAuth, allowRoles('ADMIN'), asyncRoute(async (req, res) => {
  const query = {}; if (req.query.date) query.date = dayStart(req.query.date); if (req.query.employeeId) query.employeeId = req.query.employeeId;
  if (req.query.status && ['PRESENT', 'ABSENT', 'HALF_DAY', 'LEAVE'].includes(req.query.status.toUpperCase())) query.status = req.query.status.toUpperCase();
  res.json({ attendance: await Attendance.find(query).populate('employeeId', 'name email department').sort({ date: -1 }) });
}));

app.use((req, res) => res.status(404).json({ message: 'Route not found.' }));
app.use((error, req, res, next) => { console.error(error); if (error.name === 'CastError') return res.status(404).json({ message: 'Resource not found.' }); if (error.code === 11000) return res.status(400).json({ message: 'A record with this value already exists.' }); res.status(500).json({ message: 'Server error.' }); });

const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hrms_hackathon')
  .then(() => app.listen(port, () => console.log(`API listening on port ${port}`)))
  .catch((error) => { console.error('MongoDB connection failed:', error.message); process.exit(1); });
