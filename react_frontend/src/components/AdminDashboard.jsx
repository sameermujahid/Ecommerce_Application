// AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = ({ userId }) => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUser(null);
    navigate('/home');
  };
  return (
    <div>
      <h2>Welcome Admin</h2>
      <nav>
        <ul>
        <li><button onClick={handleLogout}>Logout</button></li>
          <li><Link to={`/admin/home`}>Dashboard</Link></li>
          <li><Link to="/admin/products/add">Add Product</Link></li>
          <li><Link to="/admin/category/add">Add Category</Link></li>
          <li><Link to="/admin/category/edit">Edit Category</Link></li>
        </ul>
      </nav>
      <h3>Products</h3>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <img style={{height:'auto',width:'200px'}} src={`${product.image}`} alt={product.name} />
            <h4>{product.name}</h4>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <Link to={`/admin/products/edit/${product.id}`}>Edit</Link>
            <button>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
