import React, { createContext, useState } from 'react';

export const SearchBarContext = createContext();

export default function SearchBarProvider({ children }) {

    const [searchBar, setSearchBar] = useState(false);

    const value = {
        searchBar,
        setSearchBar
    }
    return (
        <SearchBarContext.Provider value={value}>{children}
        </SearchBarContext.Provider>
    )
}
