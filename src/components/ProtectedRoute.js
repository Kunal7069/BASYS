// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Check if token exists

    // If not authenticated, redirect to login
    if (!token) {
        return <Navigate to="/" />;
    }

    // If authenticated, render the children (protected component)
    return children;
};

export default ProtectedRoute;
