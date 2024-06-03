import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './NavBar';
import HeroSection from './HeroSection';
import FeaturedSection from './FeaturedSection';
import SuggestedSection from './SuggestedSection';
import Footer from './Footer';
import ParallaxSection from './ParallaxSection';
import Category from './Category';
import { SectionWrapper, SectionTitle, ViewAllLink, GridProductList, RowContainer,ToggleButton, ProductList} from './styles';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      axios.get(`http://127.0.0.1:8000/users/${userId}/`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
        });
    }
    
    axios.get('http://127.0.0.1:8000/products/')
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
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUser(null);
    navigate('/home');
  };

  return (
    <div>
      <Navbar user={user} handleLogout={handleLogout} />
      <HeroSection 
        text="Welcome to S&M" 
        subText="Explore our amazing and products"
        user={user}
      />
      <FeaturedSection 
        products={products} 
        user={user}
      />
      <SectionWrapper>
        <RowContainer>
        <SectionTitle>Categories</SectionTitle>
        <ToggleButton to={`/categories`} state={{ userId: user ? user.id : null }}>category All</ToggleButton></RowContainer>
        <ProductList>
        <GridProductList style={{display:'flex'}}>
          {categories.map((category, index) => (
            <Category key={category.id} category={category} userId={user ? user.id : null} />
          ))}
        </GridProductList></ProductList>
      </SectionWrapper>
      <SuggestedSection 
        products={products} 
        user={user}
      />
      <Footer user={user} />
    </div>
  );
};

export default Home;
