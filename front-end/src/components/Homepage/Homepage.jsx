import React, { useState, useEffect } from 'react';
import AllBlogPosts from '../AllBlogPosts/AllBlogPosts';
import MyNavbar from '../MyNavbar/MyNavbar';
import MyFooter from '../MyFooter/MyFooter';
import AllTopics from '../AllTopics/AllTopics';

export default function Homepage() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchTopic, setSearchTopic] = useState("");
    const [filteredTopic, setFilteredTopic] = useState("");

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

    // Ricerca dalla barra navbar di ricerca
    useEffect(() => {
        if (searchTerm) {
            const filteredTitle = data.filter((el) => el.title.toLowerCase().includes(searchTerm.toLowerCase()));
            setData(filteredTitle)
        } else {
            getFromApi()
        }
    }, [searchTerm])

    // Ricerca dalla Barra Topic
    useEffect(() => {
        if (searchTopic) {
            const filteredTitle = data.filter((el) => el.title.toLowerCase().includes(searchTopic.toLowerCase()));
            setData(filteredTitle)
            console.log(searchTopic)
        } else {
            getFromApi()
        }
    }, [searchTopic])
    // Filtro dai bottoni topics
    useEffect(() => {
        if (filteredTopic) {
            const filtered = data.filter((el) => el.category.toLowerCase().includes(filteredTopic.toLowerCase()));
            setData(filtered)
            console.log(filtered)
        } else {
            getFromApi()
        }
    }, [filteredTopic])

    return (
        <>
            <MyNavbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <AllTopics setFilteredTopic={setFilteredTopic} filteredTopic={filteredTopic} searchTopic={searchTopic} setSearchTopic={setSearchTopic} />
            <AllBlogPosts data={data} getFromApi={getFromApi} />
            <MyFooter />
        </>
    )
}
