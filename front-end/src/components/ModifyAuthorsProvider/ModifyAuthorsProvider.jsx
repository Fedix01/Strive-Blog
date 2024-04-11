import React, { createContext, useState } from 'react'

export const ModifyAuthors = createContext(null)
export default function ModifyAuthorsProvider({ children }) {
    const [modify, setModify] = useState(true);

    const value = {
        modify,
        setModify
    }
    return (
        <ModifyAuthors.Provider value={value}>
            {children}
        </ModifyAuthors.Provider>
    )
}
