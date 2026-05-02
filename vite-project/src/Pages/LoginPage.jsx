import { useState } from 'react'
import { useAuth } from "../Hooks/useAuth"
import { useNavigate, Navigate, Link } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login, isLoggedIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (isLoggedIn) return <Navigate to="/menu" />

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const result = login(email, password)
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
          Welcome Back
        </p>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '2.2rem',
          color: '#f5f5f5',
          marginBottom: '2rem',
        }}>
          Sign In
        </h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          }}>
            Login
          </button>
        </form>

        <p style={{ color: '#888', fontSize: '0.85rem', textAlign: 'center' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#c9a84c', textDecoration: 'none' }}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage