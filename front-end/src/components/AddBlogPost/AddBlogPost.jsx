import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function AddBlogPost({ post }) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");

    const [cover, setCover] = useState("");
    const [readUnit, setReadUnit] = useState("");
    const [readValue, setReadValue] = useState("");

    const [authorName, setAuthorName] = useState("");
    const [authorAvatar, setAuthorAvatar] = useState("");

    const [content, setContent] = useState("");

    const handleFormPost = (e, title, authorName, authorAvatar, cover, readValue, readUnit, content, category) => {
        post(e, title, authorName, authorAvatar, cover, readValue, readUnit, content, category);
        setTitle("");
        setAuthorName("");
        setAuthorAvatar("");
        setCover("");
        setReadValue("");
        setReadUnit("");
        setContent("");
        setCategory("");
    }

    // const handleFormPut = (e) => {
    //     put(e, name, surname, email, date, avatar);
    //     setName("");
    //     setSurname("");
    //     setEmail("");
    //     setDate("");
    //     setAvatar("");
    // }

    return (
        <Form>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>Titolo del blog Post</Form.Label>
                    <Form.Control type="text" placeholder="Inserisci il titolo..." value={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridSurname">
                    <Form.Label>Autore</Form.Label>
                    <Form.Control type="text" placeholder="Inserisci l'autore..." value={authorName} onChange={(e) => setAuthorName(e.target.value)} />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridEmail">
                <Form.Label>Avatar dell'autore</Form.Label>
                <Form.Control type='text' placeholder="Inserisci l'avatar..." value={authorAvatar} onChange={(e) => setAuthorAvatar(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridDate">
                <Form.Label>Cover</Form.Label>
                <Form.Control type='text' placeholder='Inserisci la cover...' value={cover} onChange={(e) => setCover(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridDate">
                <Form.Label>Tempo di lettura</Form.Label>
                <Form.Control type='text' placeholder='Inserisci il tempo di lettura' value={readValue} onChange={(e) => setReadValue(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridDate">
                <Form.Label>Minuti o secondi</Form.Label>
                <Form.Control type='text' placeholder='Inserisci il tempo di lettura' value={readUnit} onChange={(e) => setReadUnit(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridDate">
                <Form.Label>Contenuto</Form.Label>
                <Form.Control type='text' placeholder='Inserisci il contenuto' value={content} onChange={(e) => setContent(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridDate">
                <Form.Label>Categoria</Form.Label>
                <Form.Control type='text' placeholder='Inserisci la categoria' value={category} onChange={(e) => setCategory(e.target.value)} />
            </Form.Group>

            <Button variant="success" type="submit" onClick={(e) => handleFormPost(e, title, authorName, authorAvatar, cover, readValue, readUnit, content, category)}>
                Aggiungi
            </Button>
            {/* <Button variant="primary" type="submit" onClick={(e) => handleFormPut(e, name, surname, email, date, avatar)}>
                Modifica
            </Button> */}

        </Form>

    )
}
