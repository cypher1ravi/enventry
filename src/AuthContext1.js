// // AuthContext.js
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { useCookies } from 'react-cookie';
// import { jwtDecode } from 'jwt-decode';
 
// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [cookies, setCookie, removeCookie] = useCookies(['token', 'authenticated']);
//     const [token, setToken] = useState(cookies.token || '');
//     const [authenticated, setAuthenticated] = useState(cookies.authenticated === 'true');

//     const login = (token) => {
//         setCookie('token', token);
//         setCookie('authenticated', 'true');
//         setToken(token);
//         setAuthenticated(true);
//     };

//     const logout = () => {
//         removeCookie('token');
//         removeCookie('authenticated');
//         setToken('');
//         setAuthenticated(false);
//     };

//     const checkTokenExpiration = () => {
//         if (token) {
//             const decodedToken = decodeToken(token);
//             if (decodedToken.exp < Date.now() / 1000) {
//                 // Token has expired
//                 logout();
//                 return false;
//             }
//             return true;
//         }
//         return false;
//     };

//     const decodeToken = (token) => {
//         try {
//             const decoded = jwtDecode(token);
//             return decoded;
//         } catch (error) {
//             // Token is invalid
//             return null;
//         }
//     };

//     const redirectToLogin = () => {
//         // Implement your logic to navigate to the login page here
//         // This could involve using React Router or any other navigation library
//         // For example, if you are using React Router:
//         // history.push('/login');
//     };

//     useEffect(() => {
//         if (!authenticated && !checkTokenExpiration()) {
//             redirectToLogin();
//         }
//     }, [authenticated, token]);

//     return (
//         <AuthContext.Provider value={{ token, login, logout, authenticated }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
// export const useAuth = () => useContext(AuthContext);


