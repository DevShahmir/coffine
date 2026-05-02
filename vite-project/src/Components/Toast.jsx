import { useState, useEffect, useCallback } from 'react'

// ── Toast component ────────────────────────────────────────
const Toast = ({ message, type = 'info', action, onClose, duration = 4000 }) => {
  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    // enter
    requestAnimationFrame(() => setVisible(true))

    const timer = setTimeout(() => {
      setExiting(true)
      setTimeout(onClose, 350)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const colors = {
    success: { bg: '#0f2a1a', border: '#1a4a2a', accent: '#4caf7d' },
    error:   { bg: '#2a0f0f', border: '#4a1a1a', accent: '#e05c5c' },
    info:    { bg: '#1a1a2a', border: '#2a2a4a', accent: '#c9a84c' },
  }

  const c = colors[type] || colors.info

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      zIndex: 9999,
      backgroundColor: c.bg,
      border: `1px solid ${c.border}`,
      borderLeft: `3px solid ${c.accent}`,
      borderRadius: '8px',
      padding: '1rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      maxWidth: '420px',
      boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
      transform: visible && !exiting ? 'translateX(0)' : 'translateX(120%)',
      opacity: visible && !exiting ? 1 : 0,
      transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
      fontFamily: 'Inter, sans-serif',
    }}>
      <p style={{
        color: '#f5f5f5',
        fontSize: '0.9rem',
        lineHeight: 1.5,
        margin: 0,
        flex: 1,
      }}>
        {message}
      </p>
      {action && (
        <button onClick={action.onClick} style={{
          backgroundColor: c.accent,
          color: type === 'info' ? '#0a0a0a' : '#fff',
          border: 'none',
          padding: '0.4rem 1rem',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.82rem',
          fontWeight: 600,
          fontFamily: 'Inter, sans-serif',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
          {action.label}
        </button>
      )}
      <button onClick={() => { setExiting(true); setTimeout(onClose, 350) }} style={{
        background: 'none',
        border: 'none',
        color: '#666',
        cursor: 'pointer',
        fontSize: '1.1rem',
        padding: '0 0.2rem',
        lineHeight: 1,
        flexShrink: 0,
      }}>
        ×
      </button>
    </div>
  )
}

// ── useToast hook ──────────────────────────────────────────
export const useToast = () => {
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message, type = 'info', action = null) => {
    setToast({ message, type, action, key: Date.now() })
  }, [])

  const hideToast = useCallback(() => setToast(null), [])

  const ToastContainer = toast ? (
    <Toast
      key={toast.key}
      message={toast.message}
      type={toast.type}
      action={toast.action}
      onClose={hideToast}
    />
  ) : null

  return { showToast, ToastContainer }
}

export default Toast
