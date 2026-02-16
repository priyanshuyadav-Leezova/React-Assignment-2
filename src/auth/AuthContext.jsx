import { createContext, useContext, useState } from 'react';

import { storageService } from '../storage/storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => storageService.getActiveUser());

  const isAuthenticated = !!user;

  const register = (userData) => {
    try {
      const existingUsers = storageService.getUsers();
      const userExists = existingUsers.some(u => u.email === userData.email);
      if (userExists) {
        return { success: false, message: "User already exists!" };
      }
      storageService.saveUser(userData);
      return { success: true };

    } catch (error) {
      return { success: false, message: "Registration failed." };
    }
  };

  const login = (email, password) => {
    const allUsers = storageService.getUsers();
    const foundUser = allUsers.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const session = { name: foundUser.name, email: foundUser.email };
      storageService.setActiveUser(session);
      setUser(session);
      return { success: true };
    }
    return { success: false, message: "Invalid email or password!" };
  };

  const logout = () => {
    storageService.removeActiveUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);