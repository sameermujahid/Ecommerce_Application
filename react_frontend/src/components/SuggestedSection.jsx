import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { SectionWrapper, RowContainer, ProductList, ProductItem, ArrowButton, SectionTitle, ArrowButtonContainer } from './styles';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'; // Importing react-icons for arrow icons

const SuggestedSection = ({ user }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const productListRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/categories/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSuggestedProducts = async () => {
      try {
        let response;
        if (!selectedCategory) {
          response = await axios.get(`http://127.0.0.1:8000/products/`);
        } else {
          response = await axios.get(`http://127.0.0.1:8000/products/category/${selectedCategory}/`);
        }
        setSuggestedProducts(shuffleArray(response.data));
      } catch (error) {
        console.error('Error fetching suggested products:', error);
      }
    };
    fetchSuggestedProducts();
  }, [selectedCategory]);

  const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const scrollLeft = () => {
    productListRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    productListRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <SectionWrapper>
      <RowContainer>
        <SectionTitle>Best Rated Products</SectionTitle>
        </RowContainer>
      <div style={{ position: 'relative' }}>
        <ProductList ref={productListRef}>
          {suggestedProducts.map(product => (
            <ProductItem key={product.id}>
              <img src={`${product.image}`} alt={product.name} />
              <Link to={`/products/${product.id}`} state={{ userId: user ? user.id : null }}>{product.name}</Link>
              <p>{product.description}</p>
              <p>${product.price}</p>
            </ProductItem>
          ))}
        </ProductList>
        <ArrowButtonContainer style={{marginBottom:'10px'}}>
          <ArrowButton left onClick={scrollLeft}><RiArrowLeftSLine /></ArrowButton>
          <ArrowButton right onClick={scrollRight}><RiArrowRightSLine /></ArrowButton>
        </ArrowButtonContainer>     
      </div>
    </SectionWrapper>
  );
};

export default SuggestedSection;
