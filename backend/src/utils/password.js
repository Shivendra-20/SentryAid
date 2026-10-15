import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

export function hashPassword(plain) {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

export function comparePassword(plain, hashed) {
  return bcrypt.compare(plain, hashed);
}

export function isPlainTextPassword(plain, stored) {
  return plain === stored;
}

export function sanitizeUser(doc) {
  const obj = doc?.toObject ? doc.toObject() : doc;
  if (!obj) return obj;
  const { password, __v, ...safe } = obj;
  return safe;
}
