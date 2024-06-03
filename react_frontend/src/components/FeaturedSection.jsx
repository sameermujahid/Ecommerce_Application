import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ToggleButton, SectionWrapper, RowContainer, ProductList, ProductItem, ArrowButton, SectionTitle, ViewAllLink, ArrowButtonContainer } from './styles';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

const FeaturedSection = ({ products, user }) => {
  const productListRef = useRef(null);

  const scrollLeft = () => {
    productListRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    productListRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const randomProducts = products.slice(0, 6);
  return (
    <SectionWrapper>
      <RowContainer>
        <SectionTitle>Featured Products</SectionTitle>
        <ToggleButton to={`/products`} state={{ userId: user ? user.id : null }}>
      View All
    </ToggleButton>        {/* <ViewAllLink to={`/categories`} state={{ userId: user ? user.id : null }}>category All</ViewAllLink> */}
      </RowContainer>
      <div style={{ position: 'relative' }}>
        <ProductList ref={productListRef}>
          {randomProducts.map(product => (
            <ProductItem key={product.id}>
              <img src={product.image} alt={product.name} />
              <Link to={`/products/${product.id}`} state={{ userId: user ? user.id : null }}>{product.name}</Link>
              <p>{product.description}</p>
              <p>${product.price}</p>
            </ProductItem>
          ))}
        </ProductList>
        <ArrowButtonContainer>
          <ArrowButton left onClick={scrollLeft}><RiArrowLeftSLine /></ArrowButton>
          <ArrowButton right onClick={scrollRight}><RiArrowRightSLine /></ArrowButton>
        </ArrowButtonContainer>
      </div>
    </SectionWrapper>
  );
};

export default FeaturedSection;
