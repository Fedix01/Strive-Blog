import React, { createContext, useState } from 'react';


export const alertContext = createContext("");
export default function AlertProvider({ children }) {
    const [alert, setAlert] = useState("");

    const value = {
        alert,
        setAlert
    }
    return (
        <alertContext.Provider value={value}>{children}</alertContext.Provider>
    )
}
