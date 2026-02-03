import {Routes,Route} from 'react-router' ;
import { useEffect,useState } from 'react';
import axios from 'axios' ;
import { HomePage } from './pages/homepage' ;
import { CheckoutPage } from './pages/checkoutpage' ;
import { OrdersPage } from './pages/orderspage' ;
import './App.css'

function App() {
const [cart, setCart]=useState([]);

const LoadCart = async () => {  
  const response = await axios.get('/api/cart-items?expand=product');
  setCart(response.data);
};

useEffect(() => {
  LoadCart();
}, []);


  return (
    <Routes>
      <Route index element={<HomePage cart={cart} LoadCart={LoadCart}/>}></Route>
      <Route path="checkout" element={<CheckoutPage cart={cart} LoadCart={LoadCart} />}></Route>
      <Route path="orders" element={<OrdersPage cart={cart} LoadCart={LoadCart}/>}></Route>
    </Routes>
  );
}

export default App
