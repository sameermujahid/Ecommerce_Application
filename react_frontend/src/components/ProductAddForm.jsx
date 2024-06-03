import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ProductAddForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity_in_stock: '',
    category: '',
    image: null,
    sizes: [],  // Add sizes to the formData state
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];  // Define available sizes

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithImage = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'sizes') {
          value.forEach(size => formDataWithImage.append('sizes', size));  // Handle sizes array
        } else {
          formDataWithImage.append(key, value);
        }
      });
      await axios.post('http://127.0.0.1:8000/products/', formDataWithImage, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFormData({
        name: '',
        description: '',
        price: '',
        quantity_in_stock: '',
        category: '',
        image: null,
        sizes: [],  // Reset sizes
      });
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else if (e.target.name === 'sizes') {
      const { value, checked } = e.target;
      const newSizes = checked
        ? [...formData.sizes, value]
        : formData.sizes.filter(size => size !== value);
      setFormData({ ...formData, sizes: newSizes });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>User ID: {userId}</p>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Product Description" />
      <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
      <input type="number" name="quantity_in_stock" value={formData.quantity_in_stock} onChange={handleChange} placeholder="Quantity in Stock" />
      <input type="file" name="image" onChange={handleChange} />
      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
      <fieldset>
        <legend>Select Sizes:</legend>
        {availableSizes.map((size) => (
          <label key={size}>
            <input
              type="checkbox"
              name="sizes"
              value={size}
              checked={formData.sizes.includes(size)}
              onChange={handleChange}
            />
            {size}
          </label>
        ))}
      </fieldset>
      <button type="submit">Add Product</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default ProductAddForm;
