// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make a POST request to your login endpoint
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            localStorage.setItem('token', response.data.token); // Store the JWT in local storage
            navigate('/dashboard'); // Redirect to the dashboard after successful login
        } catch (err) {
            setError(err.response?.data?.msg || 'An error occurred'); // Handle error messages
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6">Login</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1">Username</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
