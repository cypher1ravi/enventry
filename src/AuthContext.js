// AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    // for production setAuthenticated is false
    const [authenticated, setAuthenticated] = useState(false);
    const [loginUser, setLoginUser] = useState("")

    const login = () => setAuthenticated(true);
    const logout = () => {
        setAuthenticated(false);
        setLoginUser("")
    }


    return (
        <AuthContext.Provider value={{ authenticated, login, logout, loginUser, setLoginUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
