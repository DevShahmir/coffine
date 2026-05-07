import React, { memo } from 'react'
import { Link } from 'react-router-dom'

const styles = {
  card: {
    backgroundColor: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: '8px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  imageContainer: {
    backgroundColor: '#111',
    height: '180px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '1px solid #2a2a2a',
    overflow: 'hidden',
  },
  content: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  footer: {
    padding: '0 1.5rem 1.5rem',
  },
}

const MenuCard = ({ item, isAdded, onAddToCart }) => {
  return (
    <div style={styles.card}>
      <Link to={`/item/${item.id}`} style={{ textDecoration: 'none' }}>
        <div style={styles.imageContainer}>
          <img
            src={item.image}
            alt={item.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </Link>

      <div style={styles.content}>
        <span
          style={{
            color: '#c9a84c',
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          {item.category}
        </span>
        <h3
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.3rem',
            color: '#f5f5f5',
            margin: '0.4rem 0',
          }}
        >
          {item.name}
        </h3>
        <p
          style={{
            color: '#888',
            fontSize: '0.85rem',
            lineHeight: '1.6',
            marginBottom: '1rem',
            flexGrow: 1,
          }}
        >
          {item.description}
        </p>
        <span
          style={{
            color: '#c9a84c',
            fontSize: '1.1rem',
            fontWeight: '600',
          }}
        >
          ${item.price.toFixed(2)}
        </span>
      </div>

      <div style={styles.footer}>
        <button
          onClick={() => onAddToCart(item)}
          style={{
            width: '100%',
            backgroundColor: isAdded ? '#4caf7d' : 'transparent',
            border: '1px solid',
            borderColor: isAdded ? '#4caf7d' : '#c9a84c',
            color: isAdded ? '#0a0a0a' : '#c9a84c',
            padding: '0.6rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '600',
            transition: 'all 0.3s ease',
          }}
        >
          {isAdded ? 'Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}

export default memo(MenuCard)
