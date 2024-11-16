import React, { createContext, useState, useContext } from "react";

// Create Context
const ProfileContext = createContext();

// Custom Hook to Access Context
export const useProfile = () => useContext(ProfileContext);

// Provider Component
export const ProfileProvider = ({ children }) => {
  const [lastClick, setLastClick] = useState(null);

  return (
    <ProfileContext.Provider value={{ lastClick, setLastClick }}>
      {children}
    </ProfileContext.Provider>
  );
};
