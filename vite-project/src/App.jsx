
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import Menupage from './Pages/Menupage'
import ItemDetailPage from './Pages/ItemDetailPage'
import CartPage from './Pages/CartPage'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import OrderHistoryPage from './Pages/OrderHistoryPage'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { AuthProvider } from './Context/AuthProvider'
import { CartProvider } from './Context/CartProvider'
import ProtectedRoute from './Components/ProtectedRout'
import { OrderProvider } from './Context/OrderProvider'

function App() {
  

  return (
    <>
    <AuthProvider>
    <CartProvider>
    <OrderProvider>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/menu" element={<Menupage />} />
      <Route path="/item/:id" element={<ItemDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
   <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
<Route path="/orders" element={<ProtectedRoute><OrderHistoryPage /></ProtectedRoute>} />
    </Routes>
    <Footer />
    </OrderProvider>
    </CartProvider>
    </AuthProvider>
    </>
  )
}

export default App
