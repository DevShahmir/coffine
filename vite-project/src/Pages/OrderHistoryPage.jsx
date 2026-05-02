import { useOrder } from '../Hooks/useOrder'

const OrderHistoryPage = () => {
  const { order } = useOrder()
  const normalizedOrders = (Array.isArray(order) ? order : [])
    .slice()
    .sort((a, b) => Number(b.id) - Number(a.id))
    .map(singleOrder => {
      const items = Array.isArray(singleOrder.items) ? singleOrder.items : []
      const itemCount = items.reduce((sum, item) => sum + Number(item.qty ?? 1), 0)
      const subtotal = items.reduce(
        (sum, item) => sum + Number(item.price ?? 0) * Number(item.qty ?? 1),
        0
      )
      return { ...singleOrder, items, itemCount, total: Number(singleOrder.total ?? subtotal) }
    })

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
          History
        </p>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '3rem',
          color: '#f5f5f5',
          marginBottom: '0.5rem',
        }}>
          Your Orders
        </h1>
        <p style={{ color: '#888', fontSize: '0.95rem', marginBottom: '3rem' }}>
          Track recent purchases and view your order history.
        </p>

        {normalizedOrders.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '5rem',
            border: '1px solid #2a2a2a',
            borderRadius: '8px',
          }}>
            <h3 style={{
              fontFamily: 'Playfair Display, serif',
              color: '#f5f5f5',
              marginBottom: '0.8rem',
            }}>
              No orders yet
            </h3>
            <p style={{ color: '#888', fontSize: '0.9rem' }}>
              Place an order from the menu and it will appear here.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {normalizedOrders.map(singleOrder => (
              <div key={singleOrder.id} style={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #2a2a2a',
                borderRadius: '8px',
                overflow: 'hidden',
              }}>

                {/* Order Meta */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1.2rem 1.5rem',
                  borderBottom: '1px solid #2a2a2a',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}>
                  <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                      <span style={{ color: '#c9a84c', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        Placed on
                      </span>
                      <span style={{ color: '#f5f5f5', fontSize: '0.9rem' }}>
                        {singleOrder.date || 'N/A'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                      <span style={{ color: '#c9a84c', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        Order #
                      </span>
                      <span style={{ color: '#888', fontSize: '0.85rem' }}>
                        {singleOrder.id}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                    <span style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: '1.4rem',
                      color: '#c9a84c',
                      fontWeight: '600',
                    }}>
                      ${singleOrder.total.toFixed(2)}
                    </span>
                    <span style={{
                      backgroundColor: '#0f2a1a',
                      color: '#4caf7d',
                      fontSize: '0.75rem',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '20px',
                      border: '1px solid #1a4a2a',
                    }}>
                      Delivered
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {singleOrder.items.map(item => (
                    <div key={`${singleOrder.id}-${item.id}`} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                    }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        backgroundColor: '#111',
                        border: '1px solid #2a2a2a',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'Playfair Display, serif',
                        color: '#c9a84c',
                        fontSize: '1rem',
                        flexShrink: 0,
                      }}>
                        {String(item.name || 'C').charAt(0).toUpperCase()}
                      </div>
                      <div style={{ flexGrow: 1 }}>
                        <p style={{ color: '#f5f5f5', fontSize: '0.9rem', fontWeight: '500' }}>
                          {item.name}
                        </p>
                        <p style={{ color: '#888', fontSize: '0.8rem' }}>
                          Qty: {item.qty ?? 1} • ${Number(item.price ?? 0).toFixed(2)} each
                        </p>
                      </div>
                      <span style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: '600' }}>
                        ${(Number(item.price ?? 0) * Number(item.qty ?? 1)).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div style={{
                  padding: '1rem 1.5rem',
                  borderTop: '1px solid #2a2a2a',
                  color: '#888',
                  fontSize: '0.8rem',
                }}>
                  {singleOrder.itemCount} item(s) in this order
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderHistoryPage