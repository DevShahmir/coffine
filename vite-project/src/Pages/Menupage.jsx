import { useCallback, useMemo, useState } from 'react'
import { menuItems } from '../Data/menuItems'
import { useCart } from '../Hooks/useCart'
import { useAuth } from '../Hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../Components/Toast'
import MenuCard from '../Components/MenuCard'

const categories = ['All', 'Coffee', 'Tea', 'Food', 'Energy Drink']

const styles = {
  subtitle: {
      color: '#c9a84c',
          fontSize: '0.8rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: '0.8rem',
  },
  header:{
     textAlign: 'center', marginBottom: '3rem' 
  },
  headerH1: {fontFamily: 'Playfair Display, serif',
          fontSize: '3rem',
          color: '#f5f5f5',},
  categoryContainer: {
    display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '3rem',
        flexWrap: 'wrap',

  },
  itemsGrid: {
    display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '2rem',
        maxWidth: '1100px',
        margin: '0 auto',
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
  imageContainer2: { padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }
}

const Menupage = () => {
  const { addItem } = useCart()
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const { showToast, ToastContainer } = useToast()
  const [category, setCategory] = useState('All')
  const [addedItems, setAddedItems] = useState({})
  
  const filteredItems = useMemo(() => {
    return category === 'All' ? menuItems : menuItems.filter(item => item.category === category)
  }, [category])

  const handleAddToCart = useCallback((item) => {
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
  }, [addItem,  showToast, navigate, isLoggedIn])

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', padding: '4rem 3rem' }}>

      {/* Header */}
      <div style={styles.header}>
        <p style={styles.subtitle}>
          Our Selection
        </p>
        <h1 style={styles.headerH1}>
          The Menu
        </h1>
      </div>

      {/* Category Filters */}
      <div style={styles.categoryContainer}>
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
      <div style={styles.itemsGrid}>
        {filteredItems.map(item => (
          <MenuCard
            key={item.id}
            item={item}
            isAdded={Boolean(addedItems[item.id])}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {ToastContainer}
    </div>
  )
}




export default Menupage