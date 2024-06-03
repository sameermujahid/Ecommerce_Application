import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './NavBar';
import styled from 'styled-components';
import { ToggleButton } from './styles';
import Footer from './Footer';

const PageContainer = styled.div`
  font-family: Arial, sans-serif;
`;

const SectionWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top:10px;
`;

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductImageContainer = styled.div`
  flex: 0 0 200px;
  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
`;

const ProductDetailsContainer = styled.div`
  flex: 1;
  padding-left: 20px;
`;

const ProductInfo = styled.div`
  margin-top: 10px;
`;

const TextAreaField = styled.textarea`
  width: calc(100% - 20px); /* Adjust width to fit within the container */
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical; /* Allow vertical resizing */
`;

const SelectField = styled.select`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const PurchaseButton = styled.button`
  padding: 15px 30px;
  background-color: #0070c9;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #005aa3;
  }
`;

const LoadingText = styled.p`
  text-align: center;
`;

const PurchasePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { productIds, userId, quantity, size, cartItems } = location.state || {};
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsDetails = async () => {
      try {
        if (productIds && productIds.length > 0) {
          const productPromises = productIds.map(id => axios.get(`http://127.0.0.1:8000/products/${id}/`));
          const productResponses = await Promise.all(productPromises);
          const productsData = productResponses.map(response => response.data);
          setProducts(productsData);
        } else if (cartItems && cartItems.length > 0) {
          setProducts(cartItems.map(item => item.product));
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products details:', error);
      }
    };

    fetchProductsDetails();
  }, [productIds, cartItems]);

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

  const handlePurchase = async () => {
    try {
      if (cartItems && cartItems.length > 0) {
        const purchasePromises = cartItems.map(item => {
          const purchaseData = {
            product: item.product.id,
            quantity: item.quantity,
            size: item.size,
            address: address,
            payment_method: paymentMethod,
            user: userId,
          };
          return axios.post('http://127.0.0.1:8000/purchases/', purchaseData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
        });
        await Promise.all(purchasePromises);
      } else if (products && products.length > 0) {
        const purchasePromises = products.map(product => {
          const purchaseData = {
            product: product.id,
            quantity: quantity,
            size: size,
            address: address,
            payment_method: paymentMethod,
            user: userId,
          };
          return axios.post('http://127.0.0.1:8000/purchases/', purchaseData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
        });
        await Promise.all(purchasePromises);
      }
      navigate('/confirmation');
    } catch (error) {
      console.error('Error completing purchase:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUser(null);
    navigate('/home');
  };

  return (
    <PageContainer>
      <Navbar user={user} handleLogout={handleLogout} />
      <SectionWrapper>
        {loading ? (
          <LoadingText>Loading...</LoadingText>
        ) : (
          <>
            {products && products.length > 0 ? (
              <>
                {products.map((product, index) => (
                  <RowContainer key={product.id}>
                    <ProductImageContainer>
                      <img src={product.image} alt={product.name} />
                    </ProductImageContainer>
                    <ProductDetailsContainer>
                      <h1>Purchase {product.name}</h1>
                      <ProductInfo>
                        <p>Price: ${product.price}</p>
                        <p>Quantity: {cartItems ? cartItems[index].quantity : quantity}</p>
                        <p>Size: {cartItems ? cartItems[index].size : size}</p>
                        {user && (
                          <div>
                            <h3>User Details</h3>
                            <p>Name: {user.name}</p>
                            <p>Email: {user.email}</p>
                          </div>
                        )}
                      </ProductInfo>
                    </ProductDetailsContainer>
                  </RowContainer>
                ))}
                <TextAreaField
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                  rows={4}
                />
                <SelectField
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="credit_card">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="bank_transfer">Bank Transfer</option>
                </SelectField>
                <ToggleButton style={{ marginTop: '10px' }} onClick={handlePurchase}>Complete Purchase</ToggleButton>
              </>
            ) : (
              <p>No products found</p>
            )}
          </>
        )}
      </SectionWrapper>
    </PageContainer>
  );
};

export default PurchasePage;
