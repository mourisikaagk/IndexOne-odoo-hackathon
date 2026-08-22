const crypto = require('crypto');

const secret = () => process.env.TOKEN_SECRET || 'hackathon-change-this-token-secret';
const encode = (value) => Buffer.from(JSON.stringify(value)).toString('base64url');

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('hex');
    crypto.scrypt(password, salt, 64, (error, derivedKey) => {
      if (error) return reject(error);
      resolve(`${salt}:${derivedKey.toString('hex')}`);
    });
  });
}

function verifyPassword(password, storedHash) {
  return new Promise((resolve, reject) => {
    const [salt, hash] = storedHash.split(':');
    crypto.scrypt(password, salt, 64, (error, derivedKey) => {
      if (error) return reject(error);
      resolve(crypto.timingSafeEqual(Buffer.from(hash, 'hex'), derivedKey));
    });
  });
}

function signToken(user) {
  const payload = encode({ sub: user._id.toString(), role: user.role, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 });
  const signature = crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

function verifyToken(token) {
  const [payload, signature] = (token || '').split('.');
  const expected = crypto.createHmac('sha256', secret()).update(payload || '').digest('base64url');
  if (!payload || !signature || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
  return data.exp > Date.now() ? data : null;
}

module.exports = { hashPassword, verifyPassword, signToken, verifyToken };
