import {Routes,Route} from 'react-router' ;
import { useEffect,useState } from 'react';
import axios from 'axios' ;
import { HomePage } from './pages/homepage' ;
import { CheckoutPage } from './pages/checkoutpage' ;
import { OrdersPage } from './pages/orderspage' ;
import './App.css'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function App() {
const [cart, setCart]=useState([]);
const [error, setError] = useState(null);

const LoadCart = async () => {  
  try {
    const response = await axios.get(`${API_BASE}/api/cart-items?expand=product`);
    setCart(response.data);
  } catch(err) {
    console.log('Backend API not available:', err.message);
    setError('Backend service unavailable. Please ensure the backend is running.');
    setCart([]);
  }
};

useEffect(() => {
  LoadCart();
}, []);


  return (
    <>
      {error && <div style={{padding: '20px', backgroundColor: '#fee', color: '#c00'}}>{error}</div>}
      <Routes>
        <Route index element={<HomePage cart={cart} LoadCart={LoadCart}/>}></Route>
        <Route path="checkout" element={<CheckoutPage cart={cart} LoadCart={LoadCart} />}></Route>
        <Route path="orders" element={<OrdersPage cart={cart} LoadCart={LoadCart}/>}></Route>
      </Routes>
    </>
  );
}

export default App;
