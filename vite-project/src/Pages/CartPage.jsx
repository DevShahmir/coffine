import { useEffect, useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../Hooks/useCart'
import { useOrder } from '../Hooks/useOrder'

const CartPage = () => {
  const navigate = useNavigate()
  const { cart, clearCart, addItem, removeItem } = useCart()
  const { placeOrder } = useOrder()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const checkoutTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (checkoutTimerRef.current) clearTimeout(checkoutTimerRef.current)
    }
  }, [])

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  const handleCheckout = () => {
    if (cart.length === 0 || isCheckingOut) return
    setIsCheckingOut(true)
    checkoutTimerRef.current = setTimeout(() => {
      placeOrder({ id: Date.now(), date: new Date().toLocaleDateString(), items: [...cart], total })
      clearCart()
      navigate('/orders')
      checkoutTimerRef.current = null
    }, 1000)
  }

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', padding: '4rem 3rem' }}>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* Header */}
        <p style={{
          color: '#c9a84c',
          fontSize: '0.8rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: '0.8rem',
        }}>
          Your Order
        </p>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '3rem',
          color: '#f5f5f5',
          marginBottom: '3rem',
        }}>
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '5rem',
            border: '1px solid #2a2a2a',
            borderRadius: '8px',
          }}>
            <p style={{ color: '#888', fontSize: '1rem', marginBottom: '1.5rem' }}>Your cart is empty</p>
            <Link to="/menu" style={{
              backgroundColor: '#c9a84c',
              color: '#0a0a0a',
              padding: '0.7rem 2rem',
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '600',
              fontFamily: 'Inter, sans-serif',
              display: 'inline-block',
            }}>
              Browse Menu
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {cart.map(item => (
                <div key={item.id} style={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #2a2a2a',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <div>
                    <h3 style={{
                      fontFamily: 'Playfair Display, serif',
                      color: '#f5f5f5',
                      fontSize: '1.1rem',
                      marginBottom: '0.3rem',
                    }}>
                      {item.name}
                    </h3>
                    <span style={{ color: '#888', fontSize: '0.85rem' }}>
                      ${item.price.toFixed(2)} each
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {/* Qty Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <button onClick={() => removeItem(item.id)} style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: 'transparent',
                        border: '1px solid #2a2a2a',
                        color: '#f5f5f5',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                      }}>
                        −
                      </button>
                      <span style={{ color: '#f5f5f5', fontSize: '0.95rem', minWidth: '20px', textAlign: 'center' }}>
                        {item.qty}
                      </span>
                      <button onClick={() => addItem(item)} style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: 'transparent',
                        border: '1px solid #2a2a2a',
                        color: '#f5f5f5',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                      }}>
                        +
                      </button>
                    </div>

                    {/* Item Total */}
                    <span style={{
                      color: '#c9a84c',
                      fontWeight: '600',
                      fontSize: '1rem',
                      minWidth: '60px',
                      textAlign: 'right',
                    }}>
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div style={{
              backgroundColor: '#1a1a1a',
              border: '1px solid #2a2a2a',
              borderRadius: '8px',
              padding: '2rem',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem',
                paddingBottom: '1.5rem',
                borderBottom: '1px solid #2a2a2a',
              }}>
                <span style={{ color: '#888', fontSize: '0.95rem' }}>Total</span>
                <span style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.8rem',
                  color: '#c9a84c',
                  fontWeight: '600',
                }}>
                  ${total.toFixed(2)}
                </span>
              </div>

              <button onClick={handleCheckout} disabled={isCheckingOut} style={{
                width: '100%',
                backgroundColor: isCheckingOut ? '#888' : '#c9a84c',
                color: '#0a0a0a',
                border: 'none',
                padding: '1rem',
                borderRadius: '4px',
                cursor: isCheckingOut ? 'not-allowed' : 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.05em',
              }}>
                {isCheckingOut ? 'Placing Order...' : 'Checkout'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CartPage