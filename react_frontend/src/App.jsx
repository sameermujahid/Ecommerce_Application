import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminRegistration from './components/AdminRegistration';
import CategoryAddForm from './components/CategoryAddForm';
import ProductAddForm from './components/ProductAddForm';
import ProductEditForm from './components/ProductEditForm';
import CategoryEditPage from './components/CategoryEditPage';
import HomePage from './components/Home';
import ProductDetailsPage from './components/ProductDetailPage';
import ProductsPage from './components/ProductsPage';
import CategoriesPage from './components/CategoriesPage';
import CategoryProductsPage from './components/CategoryProductsPage';
import CartPage from './components/CartPage';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
// import GlobalStyle from './GlobalStyle';
import PurchasePage from './components/PurchasePage';
import './App.css';
import CartProductsPage from './components/CartProductsPage';
import UserPurchases from './components/UserPurchases';
import ConfirmationPage from './components/ConfirmationPage';

function App() {
  return (
    <Router>     
       {/* <GlobalStyle /> */}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegistration />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:categoryId" element={<CategoryProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/cart/:userId" element={<ProtectedRoute element={<CartPage />} />} />
        <Route path="/purchase/:productId"element={<ProtectedRoute element={<PurchasePage />} />} />
        <Route path="/purchase/"element={<ProtectedRoute element={<PurchasePage />} />} />
        <Route path="/purchases/user/:userId" element={<ProtectedRoute element={<UserPurchases />} />} />
        <Route path="/cartpurchase"element={<ProtectedRoute element={<CartProductsPage />} />} />
        <Route path="/confirmation"element={<ProtectedRoute element={<ConfirmationPage />} />} />

        <Route path="/admin/home" element={<ProtectedRoute element={<AdminDashboard />} />} />
        <Route path="/admin/products/add" element={<ProtectedRoute element={<ProductAddForm />} />} />
        <Route path="/admin/products/edit/:productId" element={<ProtectedRoute element={<ProductEditForm />} />} />
        <Route path="/admin/category/add" element={<ProtectedRoute element={<CategoryAddForm />} />} />
        <Route path="/admin/category/edit" element={<ProtectedRoute element={<CategoryEditPage />} />} />
      </Routes>
    </Router>
  );
}

export default App;
