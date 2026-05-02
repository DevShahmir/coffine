import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../Hooks/useAuth'
import { useCart } from '../Hooks/useCart'

const Navbar = () => {
  const { user, logout } = useAuth()
  const { cart, clearCart } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  const cartCount = cart.reduce((total, item) => total + item.qty, 0)

  const handleLogout = () => {
    clearCart()
    logout()
    setMenuOpen(false)
  }

  return (
    <nav className="navbar" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.2rem 3rem',
      backgroundColor: '#0a0a0a',
      borderBottom: '1px solid #2a2a2a',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      flexWrap: 'wrap',
    }}>
      <Link to="/" style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: '1.6rem',
        fontWeight: '700',
        color: '#c9a84c',
        textDecoration: 'none',
        letterSpacing: '0.05em',
      }}>
        Coffine
      </Link>

      {/* Hamburger button — hidden on desktop via CSS */}
      <button
        className="hamburger-btn"
        onClick={() => setMenuOpen(prev => !prev)}
        aria-label="Toggle menu"
        style={{
          display: 'none', /* shown via CSS on mobile */
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0.4rem',
          flexDirection: 'column',
          gap: '5px',
        }}
      >
        <span style={{
          display: 'block', width: 24, height: 2, backgroundColor: '#c9a84c',
          transition: 'all 0.3s',
          transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
        }} />
        <span style={{
          display: 'block', width: 24, height: 2, backgroundColor: '#c9a84c',
          transition: 'all 0.3s',
          opacity: menuOpen ? 0 : 1,
        }} />
        <span style={{
          display: 'block', width: 24, height: 2, backgroundColor: '#c9a84c',
          transition: 'all 0.3s',
          transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
        }} />
      </button>

      {/* Nav links + auth — wrapped in a collapsible container for mobile */}
      <div className={`nav-collapse ${menuOpen ? 'nav-open' : ''}`} style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
      }}>
        <div className="nav-links" style={{ display: 'flex', gap: '2rem' }}>
          {['/', '/menu', '/cart', '/orders'].map((path, i) => {
            const labels = ['Home', 'Menu', `Cart (${cartCount})`, 'Orders']
            if (path === '/orders' && !user) return null
            return (
              <NavLink key={path} to={path} onClick={() => setMenuOpen(false)} style={({ isActive }) => ({
                color: isActive ? '#c9a84c' : '#f5f5f5',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: '400',
                letterSpacing: '0.03em',
                borderBottom: isActive ? '1px solid #c9a84c' : '1px solid transparent',
                paddingBottom: '2px',
              })}>
                {labels[i]}
              </NavLink>
            )
          })}
        </div>

        <div className="nav-auth" style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          {user ? (
            <>
              <span style={{ color: '#888', fontSize: '0.9rem' }}>
                Hi, {user.name || user.email}
              </span>
              <button onClick={handleLogout} style={{
                backgroundColor: 'transparent',
                border: '1px solid #c9a84c',
                color: '#c9a84c',
                padding: '0.4rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontFamily: 'Inter, sans-serif',
              }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={() => setMenuOpen(false)} style={{ color: '#888', textDecoration: 'none', fontSize: '0.9rem' }}>
                Login
              </NavLink>
              <NavLink to="/signup" onClick={() => setMenuOpen(false)} style={{
                backgroundColor: '#c9a84c',
                color: '#0a0a0a',
                padding: '0.4rem 1.1rem',
                borderRadius: '4px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: '600',
              }}>
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar