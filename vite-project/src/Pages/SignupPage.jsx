import { useState } from 'react'
import { useAuth } from "../Hooks/useAuth"
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { getPasswordStrength } from '../Utlis/authStorage'

const SignupPage = () => {
  const navigate = useNavigate()
  const { signup, isLoggedIn } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (isLoggedIn) return <Navigate to="/menu" />

  const strength = getPasswordStrength(password)

  const passwordChecks = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains a number', met: /[0-9]/.test(password) },
    { label: 'Contains an uppercase letter', met: /[A-Z]/.test(password) },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const result = signup(name, email, password)
    if (!result.ok) { setError(result.message); return }
    navigate('/menu')
  }

  return (
    <div style={{
      backgroundColor: '#0a0a0a',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        backgroundColor: '#1a1a1a',
        border: '1px solid #2a2a2a',
        borderRadius: '8px',
        padding: '3rem',
        width: '100%',
        maxWidth: '420px',
      }}>
        <p style={{
          color: '#c9a84c',
          fontSize: '0.75rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: '0.8rem',
        }}>
          Get Started
        </p>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '2.2rem',
          color: '#f5f5f5',
          marginBottom: '2rem',
        }}>
          Create Account
        </h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { placeholder: 'Name', value: name, setter: setName, type: 'text' },
            { placeholder: 'Email', value: email, setter: setEmail, type: 'email' },
            { placeholder: 'Password', value: password, setter: setPassword, type: 'password' },
          ].map(({ placeholder, value, setter, type }) => (
            <input
              key={placeholder}
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={(e) => setter(e.target.value)}
              style={{
                backgroundColor: '#111',
                border: '1px solid #2a2a2a',
                borderRadius: '4px',
                padding: '0.8rem 1rem',
                color: '#f5f5f5',
                fontSize: '0.9rem',
                fontFamily: 'Inter, sans-serif',
                outline: 'none',
              }}
            />
          ))}

          {/* Password strength meter */}
          {password && (
            <div style={{ marginTop: '-0.3rem' }}>
              {/* Strength bar */}
              <div style={{
                display: 'flex',
                gap: '4px',
                marginBottom: '0.6rem',
              }}>
                {[1, 2, 3, 4, 5].map(level => (
                  <div key={level} style={{
                    flex: 1,
                    height: '3px',
                    borderRadius: '2px',
                    backgroundColor: level <= strength.score ? strength.color : '#2a2a2a',
                    transition: 'background-color 0.3s',
                  }} />
                ))}
              </div>
              <p style={{
                color: strength.color,
                fontSize: '0.75rem',
                fontWeight: '500',
                marginBottom: '0.6rem',
              }}>
                {strength.label}
              </p>

              {/* Requirement checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {passwordChecks.map(check => (
                  <div key={check.label} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}>
                    <span style={{
                      fontSize: '0.75rem',
                      color: check.met ? '#4caf7d' : '#555',
                      transition: 'color 0.3s',
                    }}>
                      {check.met ? '✓' : '○'}
                    </span>
                    <span style={{
                      fontSize: '0.78rem',
                      color: check.met ? '#888' : '#555',
                      transition: 'color 0.3s',
                    }}>
                      {check.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <p style={{
              color: '#e05c5c',
              fontSize: '0.85rem',
              padding: '0.6rem 1rem',
              backgroundColor: '#1f1010',
              border: '1px solid #3a1a1a',
              borderRadius: '4px',
            }}>
              {error}
            </p>
          )}

          <button type="submit" style={{
            width: '100%',
            backgroundColor: '#c9a84c',
            color: '#0a0a0a',
            border: 'none',
            padding: '0.9rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.95rem',
            fontWeight: '600',
            fontFamily: 'Inter, sans-serif',
            marginTop: '0.5rem',
          }}>
            Sign Up
          </button>
        </form>

        <p style={{ color: '#888', fontSize: '0.85rem', textAlign: 'center' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#c9a84c', textDecoration: 'none' }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignupPage