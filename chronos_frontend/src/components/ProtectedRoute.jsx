import { useState, useEffect } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api"; 
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [isAdminUser, setIsAdminUser] = useState(false);
    const location = useLocation(); // Tracks which path the user is trying to reach

    useEffect(() => {
        auth().catch(() => {
            setIsAuthorized(false);
            setIsAdminUser(false);
        });
    }, [location.pathname]); // Re-verify if they switch paths

    // Silent token background refresher
    async function refreshToken() {
        const refresh = localStorage.getItem(REFRESH_TOKEN);
        if (!refresh) {
            setIsAuthorized(false);
            return;
        }

        try {
            const res = await api.post("/api/token/refresh/", { refresh });

            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                
                // Decode the brand new token to set roles
                const decoded = jwtDecode(res.data.access);
                setIsAdminUser(decoded.is_superuser || decoded.is_staff || false);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.error("Token refreshing failed:", error);
            setIsAuthorized(false);
        }
    }

    // Guard authentication inspector
    async function auth() {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }

        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000; 

        // Extract user roles right out of the JWT token
        const hasAdminPrivileges = decoded.is_superuser || decoded.is_staff || false;

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAdminUser(hasAdminPrivileges);
            setIsAuthorized(true);
        }
    }

    // Show clean loading wrapper while verifying token status
    if (isAuthorized === null) {
        return <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: '#6b7280', 
            fontFamily: 'sans-serif' 
        }}>Verifying system credentials...</div>;
    }

    // If token is invalid or missing, send them back to the absolute root login path
    // if (!isAuthorized) {
    //     return <Navigate to="/login" replace />;
    // }

    // ROLE MATRIX FILTER: If trying to access admin views but they aren't staff/superuser, redirect to user dashboard
    if (location.pathname === '/admin-dashboard' && !isAdminUser) {
        alert("Access Denied: Admin privileges required.");
        return <Navigate to="/dashboard" replace />;
    }

    // Access approved! Render the page cleanly
    return children;
}

export default ProtectedRoute;
