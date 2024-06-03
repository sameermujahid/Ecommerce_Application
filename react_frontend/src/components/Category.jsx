import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled, { css } from 'styled-components';
import Footer from './Footer';

export const ProductItem = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 0 0 auto;
  width: 250px;
  margin: 10px;
  padding: 20px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
  height: 100px;
  gap: 5px;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    color: #fff;
    background-color: #748d92;
  }

  ${(props) =>
    props.active &&
    css`
      border: 2px solid #748d92;
    `}

  h3 {
    font-size: 20px;
    margin-top: 20px;
    color: #333;
  }

  p {
    margin: 10px 0;
    color: #666;
  }

  .text-overlay {
    font-weight: bold;
    font-size: 60px;
    overflow: hidden;
    align-items: center;
    display: flex;
    justify-content: center;
  }
`;
const Category = ({ category, userId, showAllCategoriesButton }) => {

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/products/category/${category.id}/`)
      .then((response) => {
      });
  }, [category.id]);

  return (
    <>
      <ProductItem
        to={`/products`}
        state={{ userId: userId, categoryId: category.id }}
        key={category.id}
      >
        <div className="text-overlay">{category.name}</div>
      </ProductItem>
      {showAllCategoriesButton && (
        <ProductItem to={`/products`} state={{ userId: userId }}>
          <div className="text-overlay">All</div>
        </ProductItem>
      )}
    </>
  );
};


export default Category;
