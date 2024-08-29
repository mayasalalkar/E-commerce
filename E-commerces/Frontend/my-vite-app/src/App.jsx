import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Page/HomePage';
import ProductPage from './Page/ProductPage';
import Navbar from './component/Navbar';
import LoginPage from './Page/LoginPage';
import RegisterPage from './Page/RegisterPage';
import SettingsPage from './Page/SettingPage';
import CartPage from './Page/CartPage';
import { CartProvider } from './CartContext';

function App() {
  return (
    <CartProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/"
         element={
         <HomePage />} 
         />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/cart" element={<CartPage />} />

      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;
