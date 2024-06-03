import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './NavBar';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';

// Styled components and other constants...

const CartProductsPage = ({ state }) => {
    const navigate = useNavigate();
  const { userId, cartItems } = location.state || {};
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProductsDetails = async () => {
      try {
        const productPromises = cartItems.map(item => axios.get(`http://127.0.0.1:8000/products/${item.product}/`));
        const productResponses = await Promise.all(productPromises);
        const productsData = productResponses.map(response => response.data);
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductsDetails();
  }, [cartItems]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (userId) {
          const response = await axios.get(`http://127.0.0.1:8000/users/${userId}/`);
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUser(null);
    navigate('/home');
  };

  return (
    <div>
      <Navbar user={user} handleLogout={handleLogout} />
      {products.length > 0 ? (
        <SectionWrapper>
          {products.map(product => (
            <RowContainer key={product.id}>
              <ProductImageContainer>
                <img src={product.image} alt={product.name} />
              </ProductImageContainer>
              <ProductDetailsContainer>
                <h1>{product.name}</h1>
                <ProductInfo>
                  <p>Price: ${product.price}</p>
                  {/* Add other product details here */}
                </ProductInfo>
              </ProductDetailsContainer>
            </RowContainer>
          ))}
          {/* Add purchase button and other details here */}
        </SectionWrapper>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CartProductsPage;
