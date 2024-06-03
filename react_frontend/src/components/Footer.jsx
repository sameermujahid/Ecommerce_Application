import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: #000;
  padding: 50px 50px;
  color: #fff;
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const FooterSection = styled.div`
  flex: 1 1 300px;
  margin-right: 20px;
`;

const FooterHeading = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #fff;
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FooterListItem = styled.li`
  margin-bottom: 10px;
`;

const FooterQuote = styled.p`
  font-style: italic;
  font-size: 1.1rem;
  color: #999;
`;

const FooterLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #ccc;
  }
`;

const quotes = [
  "Fashion is the armor to survive the reality of everyday life.",
  "You can have anything you want in life if you dress for it.",
  "Fashion is about dressing according to what’s fashionable. Style is more about being yourself.",
  "In difficult times, fashion is always outrageous.",
  "I don't do fashion. I am fashion.",
  "Fashion is the mirror of history.",
];

const Footer = ({ user }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [quote, setQuote] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/categories/')
      .then(response => {
        setCategories(response.data.slice(0, 7)); // Display only the first 7 categories
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
    axios.get('http://127.0.0.1:8000/products/')
      .then(response => {
        setProducts(response.data.slice(0, 7)); // Display only the first 7 products
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterHeading>Categories</FooterHeading>
          <FooterList>
            {categories.map(category => (
              <FooterListItem key={category.id}>
                <FooterLink to={`/categories/${category.id}`} state={{ userId: user ? user.id : null }}>{category.name}</FooterLink>
              </FooterListItem>
            ))}
                <FooterLink to={`/categories`} state={{ userId: user ? user.id : null }}>View All ></FooterLink>
          </FooterList>
        </FooterSection>

        <FooterSection>
          <FooterHeading>Products</FooterHeading>
          <FooterList>
            {products.map(product => (
              <FooterListItem key={product.id}>
                <FooterLink to={`/products/${product.id}`} state={{ userId: user ? user.id : null }}>{product.name}</FooterLink>
              </FooterListItem>
            ))}
    
                <FooterLink to={`/products`} state={{ userId: user ? user.id : null }}>View All ></FooterLink>
            
          </FooterList>
        </FooterSection>

        <FooterSection>
          <FooterHeading>Contact Us</FooterHeading>
          <FooterList>
            <FooterListItem>sameerandcompanay@gmail.com</FooterListItem>
            <FooterListItem>RK Beach, New Street, Chennai, India</FooterListItem>
          </FooterList>
        </FooterSection>

        <FooterSection>
          <FooterHeading>Quote of the Day</FooterHeading>
          <FooterQuote>"{quote}"</FooterQuote>
        </FooterSection>

      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
