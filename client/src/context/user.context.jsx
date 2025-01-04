/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {createContext, useState, useContext} from "react";

//create userContext
// eslint-disable-next-line react-refresh/only-export-components
export const userContext = createContext(null);

//create a Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  return (
    <userContext.Provider value={{user, setUser}}>
        {children}
    </userContext.Provider>
  )
};
