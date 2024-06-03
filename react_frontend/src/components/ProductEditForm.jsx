import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProductEditForm = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity_in_stock: '',
    category: '',
    supplier: '',
    image: null,
    imageUrl: '', // Add imageUrl to store the existing image URL
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/products/${productId}/`);
        const productData = response.data;
        setFormData({
          name: productData.name,
          description: productData.description,
          price: productData.price,
          quantity_in_stock: productData.quantity_in_stock,
          category: productData.category,
          supplier: productData.supplier,
          image: null,
          imageUrl: productData.image, // Set imageUrl with the existing image URL
        });
      } catch (error) {
        setError('Error fetching product details: ' + error.message);
      }
    };
    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/categories/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithImage = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'image' && value === null) return;
        formDataWithImage.append(key, value);
      });
      await axios.patch(`http://localhost:8000/products/${productId}/`, formDataWithImage, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Product updated successfully!');
      navigate(`/admin/home`);
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Product Description" />
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
        <input type="number" name="quantity_in_stock" value={formData.quantity_in_stock} onChange={handleChange} placeholder="Quantity in Stock" />
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <input type="file" name="image" onChange={handleChange} />
        {formData.imageUrl && (
          <div>
            <h3>Current Product Image</h3>
            <img style={{ height: 'auto', width: '200px' }} src={formData.imageUrl} alt="Product" />
          </div>
        )}
        <button type="submit">Update Product</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default ProductEditForm;
