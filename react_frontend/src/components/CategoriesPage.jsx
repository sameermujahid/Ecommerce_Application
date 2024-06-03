import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from './NavBar';
import { SectionWrapper, SectionTitle, ProductList, ProductItem, GridProductList } from './styles'; // Import styled components or stylesheets
import Category from './Category'; // Import the Category component

const CategoriesPage = () => {
  const location = useLocation();
  const userId = location.state?.userId || 'Guest';
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userId && userId !== 'Guest') {
      axios.get(`http://127.0.0.1:8000/users/${userId}/`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
        });
    }

    axios.get('http://127.0.0.1:8000/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, [userId]);

  return (
    <div>
      <Navbar user={user} />
      <SectionWrapper>
        <SectionTitle>Categories</SectionTitle>
        <GridProductList >
  {categories.map((category, index) => (
    <Category
      key={category.id}
      category={category}
      userId={user ? user.id : null}
      showAllCategoriesButton={index === 0}
    />
  ))}
</GridProductList>

      </SectionWrapper>
      
    </div>
  );
};

export default CategoriesPage;
