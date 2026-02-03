import { Routes, Route } from 'react-router-dom'; // Changed to react-router-dom
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { HomePage } from './pages/homepage';
import { CheckoutPage } from './pages/checkoutpage';
import { OrdersPage } from './pages/orderspage';
import './App.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function App() {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 1. Added Loading State

  // 2. Memoize function to prevent unnecessary child re-renders
  const LoadCart = useCallback(async () => {
    try {
      setIsLoading(true); // Start loading
      // Ideally, use a dedicated axios instance, but this is fine for now
      const response = await axios.get(`${API_BASE}/api/cart-items?expand=product`);
      setCart(response.data);
      setError(null); // Clear errors on success
    } catch (err) {
      console.error('Backend API error:', err);
      setError('Backend service unavailable. Please ensure the backend is running.');
      // Don't necessarily clear the cart on error, keeping old data might be better depending on UX
    } finally {
      setIsLoading(false); // Stop loading regardless of success/fail
    }
  }, []); 

  useEffect(() => {
    LoadCart();
  }, [LoadCart]); // Added LoadCart to dependency array

  // 3. Early return for loading state (Optional, but cleaner)
  if (isLoading && cart.length === 0 && !error) {
     return <div className="loading-screen">Loading Store...</div>;
  }

  return (
    <>
      {error && (
        <div style={{ padding: '20px', backgroundColor: '#fee', color: '#c00', textAlign: 'center' }}>
          {error}
        </div>
      )}
      
      <Routes>
        <Route 
          index 
          element={<HomePage cart={cart} LoadCart={LoadCart} />} 
        />
        <Route 
          path="checkout" 
          element={<CheckoutPage cart={cart} LoadCart={LoadCart} />} 
        />
        <Route 
          path="orders" 
          element={<OrdersPage cart={cart} LoadCart={LoadCart} />} 
        />
      </Routes>
    </>
  );
}

export default App;