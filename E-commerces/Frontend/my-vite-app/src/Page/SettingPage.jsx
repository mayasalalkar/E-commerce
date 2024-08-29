import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUser ,updateUser } from "../api/auth";
import './SettingsPage.css';


const SettingsPage = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        role:'',
        confirmPassword: ''
    });
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async() => {
            try {
                const userId = sessionStorage.getItem('id');
                if (userId) {
                    const response = await getUser(userId);
                    const fetchedUser = response.data;
                    setUser({
                        name: fetchedUser.name,
                        email: fetchedUser.email,
                        role: fetchedUser.role,
                        password: '',
                        confirmPassword: '',
                    });
                } else {
                    navigate('/login');
                }
            } catch (err) {
                console.log("Error while Fetching the data.");
            }
        };
    
        fetchUserData();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleDelete = async () => {
        try {
            const userId = sessionStorage.getItem('id');
            await axios.delete(`/api/users/${userId}`);
            sessionStorage.removeItem('name');
            sessionStorage.removeItem('role');
            sessionStorage.removeItem('id');
            navigate('/login');
        } catch (err) {
            console.log('Error happened during delete.');
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (user.password !== user.confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        try {
            const userId = sessionStorage.getItem('id');
            await axios.put(`/api/users/${userId}`, {
                name: user.name,
                email: user.email,
                password: user.password,
                role:user.role,
            });
            setSuccess("Profile updated successfully");
        } catch (err) {
            console.log('Failed to update profile');
        }
    };

    return (
        <div className="setting-page">
            <h1>Settings</h1>
            {success && <div className="success-message">{success}</div>}
            <form onSubmit={handleUpdate} className="setting-form">
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Confirm Password:
                    <input
                        type="password"
                        name="confirmPassword"
                        value={user.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Update Profile</button>
            </form>
            <button className="delete-account" onClick={handleDelete}>
                Delete Account:
            </button>
        </div>
    );
};

export default SettingsPage;
