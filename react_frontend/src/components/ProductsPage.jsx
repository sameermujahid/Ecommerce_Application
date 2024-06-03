import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './NavBar';
import {
  SectionWrapper,
  SectionTitle,
  GridProductList,
  ProductItem,
  ProductImageContainer,
  ProductDetailsContainer,
  ProductInfo,
  FilterContainer,
  FilterButton,
  PriceRangeInput,
  PriceInput,
  PriceRangeButton,
  SortContainer,
  SortButton,
  PaginationContainer,
  PaginationButton,
  ArrowButton
} from './styles';
import Category from './Category';
import Footer from './Footer';

const ProductsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId || 'Guest';
  const categoryId = location.state?.categoryId || null;
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [sortByPrice, setSortByPrice] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

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

    const fetchCategories = () => {
      axios.get('http://127.0.0.1:8000/categories/')
        .then(response => {
          setCategories(response.data);
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
        });
    };

    const fetchProducts = () => {
      const url = categoryId
        ? `http://127.0.0.1:8000/products/category/${categoryId}`
        : 'http://127.0.0.1:8000/products/';
      axios.get(url)
        .then(response => {
          setProducts(response.data);
          setFilteredProducts(response.data);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    };

    fetchCategories();
    fetchProducts();

    console.log('categoryId:', categoryId, 'userId:', userId);

  }, [userId, categoryId]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUser(null);
    navigate('/home');
  };

  const handleSortByPrice = (order) => {
    const sortedProducts = [...filteredProducts];
    sortedProducts.sort((a, b) => {
      if (order === 'asc') {
        return parseFloat(a.price) - parseFloat(b.price);
      } else {
        return parseFloat(b.price) - parseFloat(a.price);
      }
    });
    setFilteredProducts(sortedProducts);
    setSortByPrice(order);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  const handleFilterByPriceRange = () => {
    let filtered = products;
    if (minPrice) {
      filtered = filtered.filter(product => parseFloat(product.price) >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter(product => parseFloat(product.price) <= parseFloat(maxPrice));
    }
    setFilteredProducts(filtered);
  };

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handlePreviousPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  const handleNextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(filteredProducts.length / productsPerPage)));

  return (
    <div>
      <Navbar user={user} handleLogout={handleLogout} />
      <SectionWrapper>
        {/* {user && (
          <div>
            <p>Welcome, {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        )}
        <p>User ID: {userId}</p> */}
        <SectionTitle>Products</SectionTitle>
        <FilterContainer>
          <PriceRangeInput>
            <PriceInput
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
            />
            <span>-</span>
            <PriceInput
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
            />
            <PriceRangeButton onClick={handleFilterByPriceRange}>Apply</PriceRangeButton>
          </PriceRangeInput>
          <SortContainer>
            <SortButton onClick={() => handleSortByPrice('asc')}>Low to High</SortButton>
            <SortButton onClick={() => handleSortByPrice('desc')}>High to Low</SortButton>
          </SortContainer>
        </FilterContainer>
        <GridProductList>
          {currentProducts.map(product => (
            <ProductItem key={product.id}>
              <ProductImageContainer>
                <img src={product.image} alt={product.name} />
              </ProductImageContainer>
              <ProductDetailsContainer>
                <h3>{product.name}</h3>
                <ProductInfo>
                  <p>Description: {product.description}</p>
                  <p>Price: ${product.price}</p>
                  <p>Quantity Left: {product.quantity_in_stock}</p>
                  <p>Category: {product.category}</p>
                  <Link to={`/products/${product.id}`} state={{ userId }}>
                    View Details
                  </Link>
                  {user && user.is_admin && (
                    <Link to={`/products/update/${product.id}`} state={{ userId }}>
                      Update
                    </Link>
                  )}
                </ProductInfo>
              </ProductDetailsContainer>
            </ProductItem>
          ))}
        </GridProductList>
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
        <PaginationContainer>
          {currentPage > 1 && (
            <ArrowButton left onClick={handlePreviousPage}>←</ArrowButton>
          )}
          {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
            <PaginationButton key={index + 1} onClick={() => paginate(index + 1)}>
              {index + 1}
            </PaginationButton>
          ))}
          {currentPage < Math.ceil(filteredProducts.length / productsPerPage) && (
            <ArrowButton onClick={handleNextPage}>→</ArrowButton>
          )}
        </PaginationContainer>
      </SectionWrapper>
      <Footer user={user} />

    </div>
  );
};

export default ProductsPage;
