import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './NavBar';
import styled from 'styled-components';
import Footer from './Footer';

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const CartItem = styled.div`
  position: relative;
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: ${({ background }) => `url(${background})`};
    background-size: cover;
    background-position: center;
    filter: blur(15px);
    z-index: -1;
    opacity: 0.6;
  }
`;

const ProductImage = styled.img`
  width: 150px;
  height: auto;
  object-fit: cover;
  z-index: 1;
`;

const Details = styled.div`
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1;
`;

const ProductName = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  color:#000;
`;

const Price = styled.p`
  margin: 5px 0;
  font-size: 1rem;
  font-weight: bold;
  color:#000;
`;

const Quantity = styled.span`
  margin: 0 10px;
  font-size: 1rem;
`;

const Total = styled.p`
  margin: 5px 0;
  font-size: 1rem;
  font-weight: bold;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #748d92; /* Updated color */
  color: #fff;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const RemoveButton = styled.button`
  padding: 5px 10px;
  margin-top: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #dc3545;
  color: #fff;

  &:hover {
    background-color: #c82333;
  }
`;

const BuyNowButton = styled.button`
  padding: 10px 20px;
  font-size: 1.25rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #748d92; /* Updated color */
  color: #fff;
  margin-top: 20px;

  &:hover {
    background-color: #556b72; /* Darker shade for hover */
  }
`;

const CartPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (userId !== 'Guest') {
          const response = await axios.get(`http://127.0.0.1:8000/users/${userId}/`);
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/carts/user/${userId}/`);
        setCartItems(response.data);

        // Fetch details of each product in the cart
        const productIds = response.data.map(item => item.product);
        const uniqueProductIds = [...new Set(productIds)];
        const productPromises =uniqueProductIds.map(id => axios.get(`http://127.0.0.1:8000/products/${id}/`));
        const productResponses = await Promise.all(productPromises);
        const productsData = productResponses.reduce((acc, productResponse) => {
          acc[productResponse.data.id] = productResponse.data;
          return acc;
        }, {});
        setProducts(productsData);

        // Calculate total price
        const totalPrice = response.data.reduce((total, item) => {
          const product = productsData[item.product];
          return total + (product ? product.price * item.quantity : 0);
        }, 0);
        setTotalPrice(totalPrice);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchUserDetails();
    fetchCartItems();
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUser(null);
    navigate('/home');
  };

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/carts/${cartItemId}/`, { quantity: newQuantity });
      setCartItems(cartItems.map(item => item.id === cartItemId ? { ...item, quantity: newQuantity } : item));

      // Update total price
      const updatedTotalPrice = cartItems.reduce((total, item) => {
        const product = products[item.product];
        return total + (item.id === cartItemId ? product.price * newQuantity : product.price * item.quantity);
      }, 0);
      setTotalPrice(updatedTotalPrice);
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/carts/${cartItemId}/`);
      setCartItems(cartItems.filter(item => item.id !== cartItemId));

      // Update total price
      const updatedTotalPrice = cartItems.reduce((total, item) => {
        if (item.id !== cartItemId) {
          const product = products[item.product];
          return total + (product ? product.price * item.quantity : 0);
        }
        return total;
      }, 0);
      setTotalPrice(updatedTotalPrice);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleBuyNow = () => {
    const cartItemsWithProductDetails = cartItems.map(item => ({
      ...item,
      product: products[item.product],
    }));
    navigate('/purchase', { state: { cartItems: cartItemsWithProductDetails, userId } });
  };
  

  return (
    <div>
      <Navbar user={user} handleLogout={handleLogout} />
      <CartContainer>
       
        <h1>Your Cart</h1>
        <Grid>
          {cartItems.map(item => {
            const product = products[item.product];
            return (
              <CartItem key={item.id} background={product ? product.image : ''}>
                {product && <ProductImage src={product.image} alt={product.name} />}
                <Details>
                  <ProductName>{product ? product.name : 'Loading...'}</ProductName>
                  <Price>Price: ${product ? product.price : '0.00'}</Price>
                  <p style={{color:'#000'}}>Size: {item.size}</p> {/* Display the size */}
                  <QuantityControl>
                    <QuantityButton onClick={() => handleQuantityChange(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</QuantityButton>
                    <Quantity>{item.quantity}</Quantity>
                    <QuantityButton onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</QuantityButton>
                  </QuantityControl>
                  <Total>Total: ${(product ? product.price * item.quantity : 0).toFixed(2)}</Total>
                  <RemoveButton onClick={() => handleRemoveItem(item.id)}>Remove</RemoveButton>
                </Details>
              </CartItem>
            );
          })}
        </Grid>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
        <BuyNowButton onClick={handleBuyNow}>Buy Now</BuyNowButton>
      </CartContainer>
      <Footer user={user} />
    </div>
  );
};

export default CartPage;
