import React, { useState, useEffect } from 'react';
import AllBlogPosts from '../AllBlogPosts/AllBlogPosts';
import MyNavbar from '../MyNavbar/MyNavbar';
import MyFooter from '../MyFooter/MyFooter';

export default function Homepage() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const endpoint = "http://localhost:3001/api/blogPosts";

    const getFromApi = async () => {
        try {
            const response = await fetch(endpoint);
            if (response.ok) {
                const results = await response.json();
                setData(results);
                console.log("fetch get ok")
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getFromApi()
    }, [])

    useEffect(() => {
        if (searchTerm) {
            const filteredTitle = data.filter((el) => el.title.toLowerCase().includes(searchTerm.toLowerCase()));
            setData(filteredTitle)
        } else {
            getFromApi()
        }
    }, [searchTerm])

    return (
        <>
            <MyNavbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <AllBlogPosts data={data} getFromApi={getFromApi} />
            <MyFooter />
        </>
    )
}
