import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from './NavBar'; // Import NavBar component
import { SectionWrapper, ProductList, ProductItem } from './styles'; // Import styled components or stylesheets

const CategoryProductsPage = () => {
  const { categoryId } = useParams();
  const location = useLocation();
  const userId = location.state?.userId || 'Guest';
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/products/category/${categoryId}/`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });

    axios.get('http://127.0.0.1:8000/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, [categoryId]);

  return (
    <div>
      <Navbar /> {/* Render NavBar */}
      <SectionWrapper>
        <h1>Products for Category</h1>
        <p>User ID: {userId}</p>
        <ProductList>
          {products.map(product => (
            <ProductItem key={product.id}>
              <img src={`${product.image}`} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Description: {product.description}</p>
              <p>Price: ${product.price}</p>
              {/* Add other product details */}
            </ProductItem>
          ))}
        </ProductList>
    
      </SectionWrapper>
    </div>
  );
};

export default CategoryProductsPage;
