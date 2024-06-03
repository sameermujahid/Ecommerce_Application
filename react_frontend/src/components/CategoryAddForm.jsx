// CategoryAddForm.jsx
import React, { useState } from 'react';

const CategoryAddForm = () => {
  const [formData, setFormData] = useState({
    name: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.name) {
        alert('Please enter a category name');
        return;
      }

      const response = await fetch('http://127.0.0.1:8000/categories/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add category');
      }

      setFormData({ name: '' });

      alert('Category added successfully!');
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Failed to add category. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Category Name" />
      <button type="submit">Add Category</button>
    </form>
  );
};

export default CategoryAddForm;
