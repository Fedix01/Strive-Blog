import React, { useEffect, useState } from 'react';
import MyNavbar from '../MyNavbar/MyNavbar';
import { Row, Col, Container, Alert, Button } from 'react-bootstrap';
import SingleBlogPost from '../SingleBlogPost/SingleBlogPost';
import AddBlogPost from '../AddBlogPost/AddBlogPost';

export default function AllBlogPosts() {

    const [data, setData] = useState([]);

    const endpoint = "http://localhost:3001/api/blogPosts";

    const [id, setId] = useState("");

    const [mod, setMod] = useState(true)

    const [alert, setAlert] = useState("");

    const [searchTerm, setSearchTerm] = useState([]);

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

    const postBlog = async (e, category, title, cover, readUnit, readValue, authorName, authorAvatar, content) => {
        e.preventDefault();
        const payload = {
            "category": category,
            "title": title,
            "cover": cover,
            "readTime": {
                "value": readValue,
                "unit": readUnit
            },
            "author": {
                "name": authorName,
                "avatar": authorAvatar
            },
            "content": content
        };

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "Application/json" },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                getFromApi();
                setAlert("Blog post aggiunto correttamente");
                setInterval(() => {
                    setAlert("")
                }, 3000);
                console.log("Blog Post creato")
            }
        } catch (error) {
            console.error(error)
        }
    };

    const deleteBlog = async (id) => {
        try {
            let res = await fetch(`${endpoint}/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "Application/json" },

            });
            if (res.ok) {
                getFromApi();
                setAlert("Blog post cancellato correttamente");
                setInterval(() => {
                    setAlert("")
                }, 3000);
                console.log("il blog post è stato cancellato")
            }
        } catch (error) {
            console.error(error)
        }
    }

    const modifyBlog = async (e, category, title, cover, readUnit, readValue, authorName, authorAvatar, content, id) => {
        e.preventDefault()
        const payload = {
            "category": category,
            "title": title,
            "cover": cover,
            "readTime": {
                "value": readValue,
                "unit": readUnit
            },
            "author": {
                "name": authorName,
                "avatar": authorAvatar
            },
            "content": content
        };
        try {
            let res = await fetch(`${endpoint}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "Application/json" },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                getFromApi();
                setAlert("Blog post modificato correttamente");
                setInterval(() => {
                    setAlert("")
                }, 3000);

                console.log("Blog modificato")
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleSearch = async () => {
        try {
            const response = await fetch(`${endpoint}?title=${searchTerm}`);
            if (response.ok) {
                const results = await response.json();
                setData(results);
                console.log("Risultati ricerca:", results);
            } else {
                console.error('Errore nella risposta:', response.statusText);
            }
        } catch (error) {
            console.error('Errore durante la ricerca:', error);
        }
    };

    return (
        <>
            <MyNavbar />
            {alert &&
                <Alert variant='info'>
                    {alert}
                </Alert>}

            <div>
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <Button variant='primary' onClick={() => handleSearch()}>Cerca Blog</Button>
            </div>
            <Container>
                <Row>
                    {data &&
                        <AddBlogPost post={postBlog} put={modifyBlog} mod={mod} id={id} />}

                    {data &&
                        data.map((el) => (
                            <Col md={6} key={el._id}>
                                <SingleBlogPost key={el._id}
                                    id={el._id}
                                    category={el.category}
                                    title={el.title}
                                    cover={el.cover}
                                    timeValue={el.readTime.value}
                                    timeUnit={el.readTime.unit}
                                    authorName={el.author.name}
                                    authorAvatar={el.author.avatar}
                                    content={el.content}
                                    deleteBlog={deleteBlog}
                                    setMod={setMod}
                                    setId={setId}
                                />
                            </Col>))}

                </Row>
            </Container>
        </>
    )
}
