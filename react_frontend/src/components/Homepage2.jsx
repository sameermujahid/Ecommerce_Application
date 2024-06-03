// src/pages/Homepage.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Homepage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/products/');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>All Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <p>{product.quantity_in_stock}</p>
      <p>{product.image}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
