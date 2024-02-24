import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(sessionStorage.getItem('token'));
    const [authenticated, setAuthenticated] = useState(
        sessionStorage.getItem('authenticated') === 'true'
    );

    const login = (token) => {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('authenticated', 'true');
        setToken(token);
        setAuthenticated(true);
    };

    const logout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('authenticated');
        setToken(null);
        setAuthenticated(false);
    };

    const checkTokenExpiration = () => {
        if (!token) {
            return true; // No token available, consider it expired
        }

        try {
            const decodedToken = jwtDecode(token);
            return decodedToken.exp < Date.now() / 1000; // Compare expiration time with current time
        } catch (error) {
            console.error('Error decoding token:', error);
            return true; // Treat decoding error as expired token
        }
    };

    useEffect(() => {
        if (checkTokenExpiration() && authenticated) {
            logout(); // Token has expired and user is authenticated, logout the user
            // Redirect to the login page
            // You can use your preferred routing library or method here
            window.location.href = '/';
        }
    }, [token, authenticated]); // Re-check expiration when token or authenticated state changes

    return (
        <AuthContext.Provider value={{ token, login, logout, authenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
