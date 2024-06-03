import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './NavBar';
import styled from 'styled-components';
import Footer from './Footer';

const UserPurchasesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const PurchaseItem = styled.div`
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
`;

const Price = styled.p`
  margin: 5px 0;
  font-size: 1rem;
  font-weight: bold;
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

const UserPurchases = () => {
  const { userId } = useParams();
  const [purchases, setPurchases] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/users/${userId}/`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  useEffect(() => {
    const fetchUserPurchases = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/purchases/user/${userId}/`);
        setPurchases(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user purchases:', error);
      }
    };

    fetchUserPurchases();
  }, [userId]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (purchases.length > 0) {
        try {
          const productIds = purchases.map((purchase) => purchase.product.id);
          const uniqueProductIds = [...new Set(productIds)];
          const productPromises = uniqueProductIds.map((productId) =>
            axios.get(`http://127.0.0.1:8000/products/${productId}/`)
          );
          const productResponses = await Promise.all(productPromises);
          const productsData = productResponses.reduce((acc, productResponse) => {
            acc[productResponse.data.id] = productResponse.data;
            return acc;
          }, {});
          setProducts(productsData);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      }
    };

    fetchProducts();
  }, [purchases]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar user={user} />
      <UserPurchasesContainer>
        <h1>User Purchases</h1>
        <Grid>
          {purchases.map((purchase) => {
            const product = products[purchase.product.id];
            return (
              <PurchaseItem key={purchase.id} background={product ? product.image : ''}>
                {product && <ProductImage src={product.image} alt={product.name} />}
                <Details>
                  <ProductName>{product ? product.name : 'Loading...'}</ProductName>
                  <Price>Price: ${product ? product.price : '0.00'}</Price>
                  <p>Quantity: {purchase.quantity}</p>
                  <p>Address: {purchase.address}</p>
                  <p>Payment Method: {purchase.payment_method}</p>
                  <p>Purchased At: {purchase.purchased_at}</p>
                </Details>
              </PurchaseItem>
            );
          })}
        </Grid>
      </UserPurchasesContainer>
      <Footer user={user} />
    </div>
  );
};

export default UserPurchases;
