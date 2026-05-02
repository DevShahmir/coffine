const USERS_KEY = 'coffee-users'
const SESSION_KEY = 'coffee-session'

export const normalizeEmail = (email) => email.trim().toLowerCase()

// ── Validation helpers ────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const validateSignupFields = (name, email, password) => {
  if (!name || name.trim().length < 2) {
    return { ok: false, message: 'Name must be at least 2 characters' }
  }
  if (!email || !EMAIL_RE.test(email.trim())) {
    return { ok: false, message: 'Please enter a valid email address' }
  }
  if (!password || password.length < 8) {
    return { ok: false, message: 'Password must be at least 8 characters' }
  }
  if (!/[0-9]/.test(password)) {
    return { ok: false, message: 'Password must contain at least 1 number' }
  }
  if (!/[A-Z]/.test(password)) {
    return { ok: false, message: 'Password must contain at least 1 uppercase letter' }
  }
  return { ok: true }
}

export const validateLoginFields = (email, password) => {
  if (!email || !email.trim()) {
    return { ok: false, message: 'Please enter your email' }
  }
  if (!EMAIL_RE.test(email.trim())) {
    return { ok: false, message: 'Please enter a valid email address' }
  }
  if (!password) {
    return { ok: false, message: 'Please enter your password' }
  }
  return { ok: true }
}

// ── Password strength (for the UI meter) ──────────────────
export const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: '', color: '' }
  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[0-9]/.test(password)) score++
  if (/[A-Z]/.test(password)) score++
  if (/[^a-zA-Z0-9]/.test(password)) score++

  if (score <= 2) return { score, label: 'Weak', color: '#e05c5c' }
  if (score <= 3) return { score, label: 'Medium', color: '#e0a84c' }
  return { score, label: 'Strong', color: '#4caf7d' }
}

// ── Registration ──────────────────────────────────────────
export const registerUser = ({ name, email, password }) => {
  // Run validation first
  const validation = validateSignupFields(name, email, password)
  if (!validation.ok) return validation

  try {
    const raw = localStorage.getItem(USERS_KEY)
    const parsed = raw ? JSON.parse(raw) : []

    const normalizedEmail = normalizeEmail(email)
    const duplicate = parsed.find(u => u.email === normalizedEmail)
    if (duplicate) return { ok: false, message: 'Email already exists' }

    const user = { name: name.trim(), email: normalizedEmail, password }
    parsed.push(user)
    localStorage.setItem(USERS_KEY, JSON.stringify(parsed))
    return { ok: true, user: { name: user.name, email: user.email } }

  } catch {
    return { ok: false, message: 'Unable to create account right now' }
  }
}

// ── Login verification ────────────────────────────────────
export const verifyLogin = (email, password) => {
  // Run validation first
  const validation = validateLoginFields(email, password)
  if (!validation.ok) return validation

  try {
    const raw = localStorage.getItem(USERS_KEY)

    if (!raw) return { ok: false, message: 'No account found. Please sign up.' }
    const parsed = JSON.parse(raw)

    const user = parsed.find(
      u => u.email === normalizeEmail(email) && u.password === password
    )
    if (!user) return { ok: false, message: 'Wrong email or password. Please try again.' }
    return { ok: true, user: { name: user.name, email: user.email } }
  } catch {
    return { ok: false, message: 'Unable to sign in right now' }
  }
}

export const persistSession = (session) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export const loadSession = () => {
  const get  = localStorage.getItem(SESSION_KEY)
  if(!get) return null
  const parsed = JSON.parse(get)
  if (!parsed?.email || !parsed?.name) return null
  return parsed
}

export const clearSession = () => {
  localStorage.removeItem(SESSION_KEY)
}
