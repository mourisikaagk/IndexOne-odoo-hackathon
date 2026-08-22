const User = require('../models/User');
const { verifyToken } = require('../utils/auth');

const revokedTokens = new Set();

async function requireAuth(req, res, next) {
  try {
    const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
    const payload = token && !revokedTokens.has(token) ? verifyToken(token) : null;
    if (!payload) return res.status(401).json({ message: 'Authentication required.' });
    const user = await User.findById(payload.sub).select('+passwordHash');
    if (!user || user.status !== 'ACTIVE') return res.status(401).json({ message: 'Account is unavailable.' });
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    next(error);
  }
}

function allowRoles(...roles) {
  return (req, res, next) => (roles.includes(req.user.role)
    ? next()
    : res.status(403).json({ message: 'You are not authorized to perform this action.' }));
}

module.exports = { requireAuth, allowRoles, revokedTokens };
