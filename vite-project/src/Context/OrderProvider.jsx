import { useReducer, useEffect } from 'react'
import { OrderContext } from './OrderContext';
import { useAuth } from '../Hooks/useAuth';

// The reducer — lives OUTSIDE the Provider component
const reducer = (state, action) => {
  switch(action.type) {
    case 'SET_ORDERS':
      return action.payload;
    case 'PLACE_ORDER':
      return [...state, action.payload];
    default:
      return state;
  }
}

export const OrderProvider = ({ children }) => {
  const { user } = useAuth();
  const [order, dispatch] = useReducer(reducer, []);

  // Load user's orders when user changes (e.g. login/logout)
  useEffect(() => {
    if (user && user.email) {
      try {
        const savedOrder = localStorage.getItem(`coffee-order-${user.email}`);
        dispatch({ type: 'SET_ORDERS', payload: savedOrder ? JSON.parse(savedOrder) : [] });
      } catch {
        dispatch({ type: 'SET_ORDERS', payload: [] });
      }
    } else {
      // Clear orders if nobody is logged in
      dispatch({ type: 'SET_ORDERS', payload: [] });
    }
  }, [user]);

  // Save order to localStorage whenever the order state changes
  useEffect(() => {
    if (user && user.email) {
      localStorage.setItem(`coffee-order-${user.email}`, JSON.stringify(order));
    }
  }, [order, user]);

  const placeOrder = (item) => dispatch({ type: 'PLACE_ORDER', payload: item });
  
  return (
    <OrderContext.Provider value={{ order, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
