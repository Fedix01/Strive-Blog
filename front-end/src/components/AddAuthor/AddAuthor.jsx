import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function AddAuthor({ post, put, mod }) {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");

    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [avatar, setAvatar] = useState("");

    const handleFormPost = (e) => {
        post(e, name, surname, email, date, avatar);
        setName("");
        setSurname("");
        setEmail("");
        setDate("");
        setAvatar("");
    }

    const handleFormPut = (e) => {
        put(e, name, surname, email, date, avatar);
        setName("");
        setSurname("");
        setEmail("");
        setDate("");
        setAvatar("");
    }
    return (
        <Form>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" placeholder="Inserisci il tuo nome..." value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridSurname">
                    <Form.Label>Cognome</Form.Label>
                    <Form.Control type="text" placeholder="Inserisci il tuo cognome..." value={surname} onChange={(e) => setSurname(e.target.value)} />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' placeholder="Inserisci la tue email..." value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridDate">
                <Form.Label>Data Di Nascita</Form.Label>
                <Form.Control type='date' value={date} onChange={(e) => setDate(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridDate">
                <Form.Label>Avatar</Form.Label>
                <Form.Control type='text' placeholder='Inserisci il link dell avatar' value={avatar} onChange={(e) => setAvatar(e.target.value)} />
            </Form.Group>

            {mod ? <Button variant="success" type="submit" onClick={(e) => handleFormPost(e, name, surname, email, date, avatar)}>
                Aggiungi
            </Button> : <Button variant="primary" type="submit" onClick={(e) => handleFormPut(e, name, surname, email, date, avatar)}>
                Modifica
            </Button>}

        </Form>

    )
}
