import React, { useState } from 'react'
import { menuItems } from '../Data/menuItems'
import { useCart } from '../Hooks/useCart'
import { useAuth } from '../Hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '../Components/Toast'

const categories = ['All', 'Coffee', 'Tea', 'Food', 'Energy Drink']

const Menupage = () => {
  const { addItem } = useCart()
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const { showToast, ToastContainer } = useToast()
  const [category, setCategory] = useState('All')
  const [addedItems, setAddedItems] = useState({})
  const filteredItems = category === 'All' ? menuItems : menuItems.filter(item => item.category === category)

  const handleAddToCart = (item) => {
    if (!isLoggedIn) {
      showToast('Please log in to add items to your cart', 'info', {
        label: 'Login',
        onClick: () => navigate('/login'),
      })
      return
    }
    addItem(item)
    setAddedItems(prev => ({ ...prev, [item.id]: true }))
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item.id]: false }))
    }, 2000)
    showToast(`${item.name} added to cart!`, 'success')
  }

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', padding: '4rem 3rem' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p style={{
          color: '#c9a84c',
          fontSize: '0.8rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: '0.8rem',
        }}>
          Our Selection
        </p>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '3rem',
          color: '#f5f5f5',
        }}>
          The Menu
        </h1>
      </div>

      {/* Category Filters */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '3rem',
        flexWrap: 'wrap',
      }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} style={{
            backgroundColor: category === cat ? '#c9a84c' : 'transparent',
            color: category === cat ? '#0a0a0a' : '#888',
            border: '1px solid',
            borderColor: category === cat ? '#c9a84c' : '#2a2a2a',
            padding: '0.5rem 1.4rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontFamily: 'Inter, sans-serif',
            fontWeight: category === cat ? '600' : '400',
          }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '2rem',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        {filteredItems.map(item => (
          <div key={item.id} style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '8px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <Link to={`/item/${item.id}`} style={{ textDecoration: 'none' }}>
              <div style={{
                backgroundColor: '#111',
                height: '180px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: '1px solid #2a2a2a',
                overflow: 'hidden',
              }}>
                <img src={item.image} alt={item.name} style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }} />
              </div>
            </Link>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <span style={{
                color: '#c9a84c',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}>
                {item.category}
              </span>
              <h3 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.3rem',
                color: '#f5f5f5',
                margin: '0.4rem 0',
              }}>
                {item.name}
              </h3>
              <p style={{
                color: '#888',
                fontSize: '0.85rem',
                lineHeight: '1.6',
                marginBottom: '1rem',
                flexGrow: 1,
              }}>
                {item.description}
              </p>
              <span style={{
                color: '#c9a84c',
                fontSize: '1.1rem',
                fontWeight: '600',
              }}>
                ${item.price.toFixed(2)}
              </span>
            </div>

            <div style={{ padding: '0 1.5rem 1.5rem' }}>
              <button onClick={() => handleAddToCart(item)} style={{
                width: '100%',
                backgroundColor: addedItems[item.id] ? '#4caf7d' : 'transparent',
                border: '1px solid',
                borderColor: addedItems[item.id] ? '#4caf7d' : '#c9a84c',
                color: addedItems[item.id] ? '#0a0a0a' : '#c9a84c',
                padding: '0.6rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '600',
                transition: 'all 0.3s ease',
              }}>
                {addedItems[item.id] ? 'Added!' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {ToastContainer}
    </div>
  )
}

export default Menupage