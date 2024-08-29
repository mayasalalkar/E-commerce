import React, { useState } from 'react';
import { register } from "../api/auth";
import './RegisterPage.css';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await register(name, email, password, role);
            if (response.status === 201) {
                setMessage(response.data.message);
                setEmail('');
                setPassword('');
                setName('');
            
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            console.log('Registration Error', error);
        }
    };

    return (
        <div className="register-page">
            {message && <div className="message">{message}</div>}
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
        
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
