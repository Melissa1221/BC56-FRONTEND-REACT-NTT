import React, { createContext, useState, ReactNode, useContext } from 'react';

interface UserContextType {
  firstName: string | null;
  lastName: string | null;
  userImage: string | null;
  setUser: (name: string, lastName: string, image: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [firstName, setFirstName] = useState<string | null>(sessionStorage.getItem('firstName'));
  const [lastName, setLastName] = useState<string | null>(sessionStorage.getItem('lastName'));
  const [userImage, setUserImage] = useState<string | null>(sessionStorage.getItem('userImage'));

  const setUser = (name: string, lastName: string, image: string) => {
    setFirstName(name);
    setLastName(lastName);
    setUserImage(image);
    sessionStorage.setItem('firstName', name);
    sessionStorage.setItem('lastName', lastName);
    sessionStorage.setItem('userImage', image);
  };

  const logout = () => {
    setFirstName(null);
    setLastName(null);
    setUserImage(null);
    sessionStorage.removeItem('firstName');
    sessionStorage.removeItem('lastName');
    sessionStorage.removeItem('userImage');
  };

  return (
    <UserContext.Provider value={{ firstName, lastName, userImage, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
