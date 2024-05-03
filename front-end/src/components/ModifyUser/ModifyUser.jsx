import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export default function ModifyUser({ data, handleModify }) {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        nome: '',
        cognome: '',
        date: '',
        avatar: null
    });

    const handleInputMod = (e) => {
        e.preventDefault();
        handleModify(formData.nome,
            formData.cognome,
            formData.email,
            formData.username,
            formData.password,
            formData.avatar)
    }

    return (
        <>
            <Form onSubmit={handleInputMod}>
                <Form.Group>
                    <Form.Label>Nome: </Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder={data.nome}
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Cognome: </Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder={data.cognome}
                        value={formData.cognome}
                        onChange={(e) => setFormData({ ...formData, cognome: e.target.value })}
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email: </Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder={data.email}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Username: </Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder={data.username}
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Data di nascita: </Form.Label>
                    <Form.Control
                        required
                        type='date'
                        placeholder={data.date}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password: </Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Inserisci nuova password'
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    ></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Avatar: </Form.Label>
                    <Form.Control
                        type='file'
                        onChange={(e) => setFormData({ ...formData, avatar: e.target.files[0] })}
                    ></Form.Control>
                </Form.Group>

                <Button variant='primary' className='mt-3' type='submit'>Accetta Modifiche</Button>
            </Form>
        </>
    )
}
