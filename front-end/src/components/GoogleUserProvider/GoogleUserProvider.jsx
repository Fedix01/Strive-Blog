import React, { createContext, useState } from 'react'


export const GoogleContext = createContext()
export default function GoogleUserProvider({ children }) {
    const [googleUser, setGoogleUser] = useState([]);

    const value = {
        googleUser,
        setGoogleUser
    }

    return (
        <GoogleContext.Provider value={value}>
            {children}
        </GoogleContext.Provider>
    )
}
