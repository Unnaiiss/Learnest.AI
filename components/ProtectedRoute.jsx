import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/auth';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const user = authService.getCurrentUser();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.user.role)) {
        console.log('Access denied. User role:', user.user.role, 'Allowed:', allowedRoles);
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
