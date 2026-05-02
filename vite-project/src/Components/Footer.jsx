import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#080808',
      borderTop: '1px solid #1a1a1a',
      padding: '4rem 3rem 2rem',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '3rem',
        marginBottom: '3rem',
      }}>
        {/* Brand */}
        <div>
          <h3 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.5rem',
            color: '#c9a84c',
            marginBottom: '1rem',
          }}>
            Coffine
          </h3>
          <p style={{
            color: '#666',
            fontSize: '0.88rem',
            lineHeight: 1.7,
            maxWidth: 280,
          }}>
            Premium coffee, handcrafted and delivered fresh. Every sip, a moment worth savouring.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{
            color: '#c9a84c',
            fontSize: '0.72rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '1.2rem',
          }}>
            Quick Links
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            {[
              { to: '/', label: 'Home' },
              { to: '/menu', label: 'Menu' },
              { to: '/cart', label: 'Cart' },
              { to: '/orders', label: 'Order History' },
            ].map(link => (
              <Link key={link.to} to={link.to} style={{
                color: '#888',
                textDecoration: 'none',
                fontSize: '0.88rem',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = '#c9a84c'}
              onMouseLeave={e => e.target.style.color = '#888'}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{
            color: '#c9a84c',
            fontSize: '0.72rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '1.2rem',
          }}>
            Contact
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', color: '#888', fontSize: '0.88rem' }}>
            <span>hello@coffine.com</span>
            <span>+1 (555) 123-4567</span>
            <span>123 Bean Street, Brew City</span>
          </div>
        </div>

        {/* Hours */}
        <div>
          <h4 style={{
            color: '#c9a84c',
            fontSize: '0.72rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '1.2rem',
          }}>
            Hours
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', color: '#888', fontSize: '0.88rem' }}>
            <span>Mon - Fri: 6am – 9pm</span>
            <span>Sat - Sun: 7am – 10pm</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid #1a1a1a',
        paddingTop: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <p style={{ color: '#555', fontSize: '0.8rem' }}>
          © {new Date().getFullYear()} Coffine. All rights reserved.
        </p>
        <p style={{ color: '#555', fontSize: '0.8rem' }}>
          Crafted with ☕ and passion
        </p>
      </div>
    </footer>
  )
}

export default Footer
