import React, { useState, useEffect, useContext } from 'react';
import AllBlogPosts from '../AllBlogPosts/AllBlogPosts';
import MyNavbar from '../MyNavbar/MyNavbar';
import MyFooter from '../MyFooter/MyFooter';
import AllTopics from '../AllTopics/AllTopics';
import { SearchBarContext } from '../SearchBarProvider/SearchBarProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { GoogleContext } from '../GoogleUserProvider/GoogleUserProvider';

export default function Homepage() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchTopic, setSearchTopic] = useState("");
    const [filteredTopic, setFilteredTopic] = useState("");

    const { googleUser, setGoogleUser } = useContext(GoogleContext);

    const location = useLocation();
    const [spinner, setSpinner] = useState(false);
    const navigate = useNavigate();

    const { setSearchBar } = useContext(SearchBarContext);

    const endpoint = "http://localhost:3001/api/blogPosts";

    const getFromApi = async () => {
        setSpinner(true)
        try {
            const response = await fetch(endpoint);
            if (response.ok) {
                const results = await response.json();
                setData(results);
                console.log("fetch get ok", results)
                setSpinner(false)
            }
        } catch (error) {
            console.error(error)
            setSpinner(false)
        }
    }


    // useEffect(() => {
    //     const params = queryString.parse(window.location.search);
    //     if (params) {
    //         localStorage.setItem("token", params.accessToken)
    //     }
    // }, [])

    useEffect(() => {

        const params = queryString.parse(window.location.search);
        console.log(params);


        if (Object.keys(params).length > 0) {
            const userGoogle = {
                token: params.accessToken,
                user: {
                    _id: params._id || "",
                    nome: params.name || "",
                    cognome: params.surname || "",
                    avatar: params.avatar || "",
                    password: params.password || "",
                    dataDiNascita: params.birthday || "",
                    username: params.email || "",
                    email: params.email || ""
                }
            };


            if (Object.values(userGoogle.user).some(value => value !== "")) {
                setGoogleUser(userGoogle);
                localStorage.setItem("googleUser", JSON.stringify(userGoogle.user));
                localStorage.setItem("token", userGoogle.token);
                console.log(userGoogle);
            }
        }
    }, []);



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
        console.log(filteredTopic)
    }, [filteredTopic])


    useEffect(() => {
        setSearchBar(true)
    }, [])



    const filteredBtnTopic = async (topic) => {
        if (topic) {
            try {
                const response = await fetch(endpoint);
                if (response.ok) {
                    const results = await response.json();
                    const filtered = results.filter((el) => el.category.toLowerCase().includes(topic.toLowerCase()));
                    setData(filtered)
                    console.log(filtered)
                    console.log("filter ok")
                }
            }
            catch (error) {
                console.error(error)
            }
        }
    }


    const exploreTopic = async () => {
        try {
            const response = await fetch(endpoint);
            if (response.ok) {
                const results = await response.json();
                setData(results);
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <MyNavbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <AllTopics setFilteredTopic={setFilteredTopic} filteredTopic={filteredTopic} searchTopic={searchTopic} setSearchTopic={setSearchTopic} getFromApi={getFromApi} filteredBtnTopic={filteredBtnTopic} exploreTopic={exploreTopic} />
            <AllBlogPosts data={data} getFromApi={getFromApi} filteredTopic={filteredTopic} spinner={spinner} />
            <MyFooter />
        </>
    )
}
