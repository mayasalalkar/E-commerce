import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import './Navbar.css';

const Navbar = () => {
    const userName = sessionStorage.getItem('name');
    const userRole =sessionStorage.getItem('role')
    const navigate = useNavigate();
    const { cartCount } = useCart();

    const handleLogout = () => {
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <nav className='navbar'>
            <div className='navbar-container'>
                <div className='navbar-logo'>
                    <Link to="/" className='navbar-links'>Ecommerce</Link>
                </div>
                <ul className='navbar-menu'>
                    <li className='navbar-item'>
                        <Link to="/" className='navbar-links'>Home</Link>
                    </li>
                    <li className='navbar-item'>
                        <Link to="/cart" className='navbar-links'>
                            Cart {cartCount > 0 && `(${cartCount})`}
                        </Link>
                    </li>

                    {userName ? (
                        <>
                            <li className='navbar-user'>
                                <span>{userName}</span>
                                <div className='navbar-user-menu'>
                                    {userRole==='admin' && (
                                     <>
                                         <Link to="/admin">Admin</Link>
                                         <div className='dropdown-division'></div>
                                     </>    
                                    )}
                                    {userRole==='enteaitener' && (
                                     <>
                                         <Link to="/enteaitener">Enteaitener</Link>
                                         <div className='dropdown-division'></div>
                                     </>    
                                    )}
                                    <Link to="/settings">Settings</Link>
                                    <div className='dropdown-division'></div>
                                    <button onClick={handleLogout}>LogOut</button>
                                </div>
                            </li>
                        </>
                    ) : (
                        <li className='navbar-item'>
                            <Link to="/login" className='navbar-link'>login</Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
