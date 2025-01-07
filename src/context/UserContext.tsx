// src/context/UserContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserService } from '../services/UserService';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user data from localStorage on mount
    const savedUser = UserService.getUser();
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = UserService.updateUser(updates);
      if (updatedUser) {
        setUser(updatedUser);
      }
    }
  };

  const logout = () => {
    UserService.clearUser();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}