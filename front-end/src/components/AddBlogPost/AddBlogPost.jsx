import React, { useContext, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { alertContext } from '../AlertProvider/AlertProvider';

export default function AddBlogPost({ id, getFromApi, reference, open, setOpen }) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");

    const [cover, setCover] = useState(null);
    const [readUnit, setReadUnit] = useState("");
    const [readValue, setReadValue] = useState(0);

    const { setAlert } = useContext(alertContext);


    const [content, setContent] = useState("");

    const endpoint = "http://localhost:3001/api/blogPosts";

    const token = localStorage.getItem("token");

    const postBlog = async (e, title, cover, readValue, readUnit, content, category) => {
        e.preventDefault();
        const payload = {
            "category": category,
            "title": title,
            "readTime": {
                "value": readValue,
                "unit": readUnit
            },
            "content": content
        };

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                const newBlog = await res.json();
                const formData = new FormData();
                formData.append("cover", cover);
                const patch = await fetch(`${endpoint}/${newBlog._id}/cover`, {
                    method: "PATCH",
                    body: formData
                });
                if (patch.ok) {
                    const posted = await patch.json();
                    console.log(posted)
                    setAlert("Blog post aggiunto correttamente");
                    setInterval(() => {
                        setAlert("")
                    }, 3000);
                    getFromApi();
                    console.log("Blog Post creato")

                }
            }
        } catch (error) {
            console.error(error)
        }
    };


    const modifyBlog = async (e, title, cover, readValue, readUnit, content, category, id) => {
        e.preventDefault()
        const payload = {
            "category": category,
            "title": title,
            "readTime": {
                "value": readValue,
                "unit": readUnit
            },
            "content": content
        };
        try {
            let res = await fetch(`${endpoint}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                const newPost = await res.json();
                console.log(newPost)
                const formData = new FormData();
                formData.append("cover", cover);
                const coverRes = await fetch(`${endpoint}/${id}/cover`, {
                    method: "PATCH",
                    body: formData
                })

                setAlert("Blog post modificato correttamente");
                setInterval(() => {
                    setAlert("")
                }, 3000);
                getFromApi();
                if (!coverRes.ok) {
                    throw new Error("Errore nell'aggiornamento della copertina");
                }

                console.log("Blog modificato");
            }
        } catch (error) {
            console.error(error)
        }
    }


    const handleFormPost = (e, title, cover, readValue, readUnit, content, category) => {
        postBlog(e, title, cover, readValue, readUnit, content, category);
        setTitle("");
        setCover("");
        setReadValue(0);
        setReadUnit("");
        setContent("");
        setCategory("");
    }

    const handleFormPut = (e, title, cover, readValue, readUnit, content, category, id) => {
        modifyBlog(e, title, cover, readValue, readUnit, content, category, id);
        setTitle("");
        setCover("");
        setReadValue(0);
        setReadUnit("");
        setContent("");
        setCategory("");
    }

    return (
        <>
            <div className='d-flex justify-content-center' >
                <Button className='my-3' ref={reference} variant='secondary' onClick={() => setOpen(!open)}>{open ? "Chiudi Form" : "Apri Form"}</Button>
            </div>
            {open &&

                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} >
                            <Form.Label>Titolo del blog Post</Form.Label>
                            <Form.Control type="text" placeholder="Inserisci il titolo..." value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>


                        <Form.Group className="mb-3" >
                            <Form.Label>Cover</Form.Label>
                            <Form.Control type='file' placeholder='Inserisci la cover...' onChange={(e) => setCover(e.target.files[0])} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Tempo di lettura</Form.Label>
                            <Form.Control type='number' placeholder='Inserisci il tempo di lettura in numero' value={readValue} onChange={(e) => setReadValue(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Minuti o ore</Form.Label>
                            <Form.Control type='text' placeholder='Inserisci il minuti oppure ore' value={readUnit} onChange={(e) => setReadUnit(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Contenuto</Form.Label>
                            <Form.Control type='text' placeholder='Inserisci il contenuto' value={content} onChange={(e) => setContent(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Categoria</Form.Label>
                            <Form.Control type='text' placeholder='Inserisci la categoria' value={category} onChange={(e) => setCategory(e.target.value)} />
                        </Form.Group>
                    </Row>
                    {id ? <Button variant="primary" type="submit" onClick={(e) => handleFormPut(e, title, cover, readValue, readUnit, content, category, id)}>
                        Modifica
                    </Button> : <Button variant="success" type="submit" onClick={(e) => handleFormPost(e, title, cover, readValue, readUnit, content, category)}>
                        Aggiungi
                    </Button>}


                </Form>}
        </>

    )
}
