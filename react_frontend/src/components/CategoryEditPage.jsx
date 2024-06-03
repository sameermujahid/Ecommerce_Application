// CategoryEditPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CategoryEditPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/categories/`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryUpdate = async (categoryId, newName) => {
    try {
      await axios.put(`http://localhost:8000/categories/${categoryId}/`, { name: newName });
      alert('Category updated successfully!');
    } catch (error) {
      console.error('Error updating category:', error);
      alert('Failed to update category. Please try again.');
    }
  };

  return (
    <div>
      <h2>Edit Categories</h2>
      {categories.map(category => (
        <div key={category.id}>
          <h3>Category ID: {category.id}</h3>
          <p>Name: {category.name}</p>
          <form onSubmit={(e) => {
            e.preventDefault();
            const newName = e.target.name.value;
            handleCategoryUpdate(category.id, newName);
          }}>
            <label htmlFor="name">New Name:</label>
            <input type="text" id="name" name="name" defaultValue={category.name} required />
            <button type="submit">Update Category</button>
          </form>
        </div>
      ))}
    </div>
  );
}

export default CategoryEditPage;
