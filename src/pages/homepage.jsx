import { useEffect,useState } from 'react';
import axios from 'axios';
import { Header } from "../components/header";
 import './homepage.css';
 import { Product } from './products.jsx';
 
 export function HomePage({cart,LoadCart}){

  const [products, setProducts]=useState([]);  
  useEffect(()=>{
    const getHomeData=async()=>{  
      const response=await axios.get('/api/products');
      setProducts(response.data);
    };
    getHomeData();
  },[]);

    return(
        <>
        <title> Ecommerce Project</title>

        <Header cart={cart} />
        

    <div className="home-page">
      <div className="products-grid">
        {products.map((product)=>{
          return (
            <Product key={product.id} product={product} LoadCart={LoadCart} />
          );
        })}
      </div>
    </div>
    </>
    );
  }
