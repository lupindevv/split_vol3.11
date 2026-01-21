import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const dummyUser = {
    id: 1,
    email: 'admin@restaurant.com',
    name: 'Admin User',
    role: 'admin',
    restaurantId: 1
};

export const AuthProvider = ({ children }) => {
    // Initialize with the dummy admin user immediately
    const [user] = useState(dummyUser);
    const [token] = useState('bypass-token');
    const [loading] = useState(false);

    const login = async () => ({ success: true });
    const register = async () => ({ success: true });
    const logout = () => { console.log("Logout disabled"); };

    const value = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: true // Always authenticated
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};