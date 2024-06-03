import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './NavBar';
import { SectionWrapper, RowContainer, ProductImageContainer, ProductDetailsContainer, ProductInfo, SizeButton } from './styles';
import SuggestedSection from './SuggestedSection';
import styled from 'styled-components';

const ProductCard = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
  background-color: white;
  padding: 40px;
  border-radius: 20px;
`;

const ProductDetailsPage = () => {
    const { productId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const userId = location.state?.userId || 'Guest';
    const [product, setProduct] = useState(null);
    const [user, setUser] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [products, setProducts] = useState([]);
    const [showSizes, setShowSizes] = useState(false);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/products/${productId}/`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [productId]);

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

        fetchUserDetails();
    }, [userId]);

    const handleAddToCart = async () => {
        if (!selectedSize) {
            alert('Please select a size.');
            return;
        }

        try {
            const cartData = {
                product: productId,
                quantity: quantity,
                size: selectedSize,
                user: userId !== 'Guest' ? userId : null,
            };
            const response = await axios.post('http://127.0.0.1:8000/carts/', cartData);
            if (response.status === 201) {
                console.log('Product added to cart');
            } else {
                console.error('Failed to add product to cart');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const handlePurchase = () => {
        if (userId === 'Guest') {
            navigate('/login');
        } else {
            navigate(`/purchase`, { state: { productIds: [productId], userId, quantity, size: selectedSize } });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userId');
        setUser(null);
        navigate('/home');
    };


    return (
        <div>
            <Navbar user={user} handleLogout={handleLogout} />
            {product ? (
                <SectionWrapper>
                    <RowContainer>
                        <ProductCard>
                            <ProductImageContainer>
                                <img src={product.image} alt={product.name} />
                            </ProductImageContainer>
                            <ProductDetailsContainer>
                                <h1>{product.name}</h1>
                                <ProductInfo>
                                    <p>Description: {product.description}</p>
                                    <p>Price: ${product.price}</p>
                                    <div style={{display:'flex'}}>
                                        {product.sizes.map((size) => (
                                            <SizeButton
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                style={{ backgroundColor: selectedSize === size ? '#124e66' : '#748d92' }}
                                            >
                                                {size}
                                            </SizeButton>
                                        ))}
                                    </div>
                                    <div>
                                        <div onClick={() => setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1))}>-</div>
                                        <>{quantity}</>
                                        <div onClick={() => setQuantity(prevQuantity => prevQuantity + 1)}>+</div>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <button onClick={handleAddToCart}>Add to Cart</button>
                                        <button onClick={handlePurchase}>Purchase</button>
                                    </div>
                                </ProductInfo>
                            </ProductDetailsContainer>
                        </ProductCard>
                    </RowContainer>
                    <SuggestedSection products={products} user={user} />
                </SectionWrapper>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );

};

export default ProductDetailsPage;
