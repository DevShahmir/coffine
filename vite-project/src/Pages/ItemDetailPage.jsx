
import { useCart } from '../Hooks/useCart'
import { useAuth } from '../Hooks/useAuth'
import { menuItems } from '../Data/menuItems'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useToast } from '../Components/Toast'

const ItemDetailPage = () => {
  const { id } = useParams()
  const item = menuItems.find(item => item.id === Number(id))
  const { addItem } = useCart()
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const { showToast, ToastContainer } = useToast()

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      showToast('Please log in to add items to your cart', 'info', {
        label: 'Login',
        onClick: () => navigate('/login'),
      })
      return
    }
    addItem(item)
    showToast(`${item.name} added to cart!`, 'success')
  }

  if (!item) return (
    <div style={{
      backgroundColor: '#0a0a0a',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <p style={{ color: '#888' }}>Item not found</p>
    </div>
  )

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', padding: '4rem 3rem' }}>

      {/* Back Link */}
      <Link to="/menu" style={{
        color: '#888',
        textDecoration: 'none',
        fontSize: '0.85rem',
        letterSpacing: '0.05em',
        display: 'inline-block',
        marginBottom: '3rem',
      }}>
        ← Back to Menu
      </Link>

      <div className="item-detail-grid" style={{
        maxWidth: '900px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center',
      }}>

        {/* Image Panel */}
        <div style={{
          backgroundColor: '#111',
          border: '1px solid #2a2a2a',
          borderRadius: '8px',
          height: '380px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <img src={item.image} alt={item.name} style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }} />
        </div>

        {/* Info Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <span style={{
            color: '#c9a84c',
            fontSize: '0.75rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}>
            {item.category}
          </span>

          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '2.8rem',
            color: '#f5f5f5',
            lineHeight: '1.2',
          }}>
            {item.name}
          </h1>

          <p style={{
            color: '#888',
            fontSize: '1rem',
            lineHeight: '1.7',
          }}>
            {item.description}
          </p>

          {/* Ingredients */}
          {item.ingredients && (
            <div>
              <p style={{
                color: '#c9a84c',
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '0.6rem',
              }}>
                Ingredients
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {item.ingredients.map((ing, i) => (
                  <span key={i} style={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #2a2a2a',
                    color: '#888',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                  }}>
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '1rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid #2a2a2a',
          }}>
            <span style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '2rem',
              color: '#c9a84c',
              fontWeight: '600',
            }}>
              ${item.price.toFixed(2)}
            </span>

            <button onClick={handleAddToCart} style={{
              backgroundColor: '#c9a84c',
              color: '#0a0a0a',
              border: 'none',
              padding: '0.8rem 2rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.95rem',
              fontWeight: '600',
              fontFamily: 'Inter, sans-serif',
            }}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {ToastContainer}
    </div>
  )
}

export default ItemDetailPage