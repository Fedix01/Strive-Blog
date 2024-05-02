import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MyNavbar from '../MyNavbar/MyNavbar';
import MyFooter from '../MyFooter/MyFooter';


export default function SignIn() {


    const navigate = useNavigate();



    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        nome: '',
        cognome: '',
        date: '',
        avatar: ''
    });

    const endpoint = "http://localhost:3001/api/authors";

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                "nome": formData.nome,
                "cognome": formData.cognome,
                "email": formData.email,
                "password": formData.password,
                "dataDiNascita": formData.date,
                "username": formData.username
            }
            console.log(payload);

            const post = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            if (post.ok) {
                const response = await post.json();
                console.log(response.token);
                localStorage.setItem("token", response.token);
                localStorage.setItem("user", JSON.stringify(response.user))

                console.log(response);
                navigate("/")

            }
        } catch (error) {
            console.error(error)
        }

    };

    return (
        <>
            <MyNavbar />
            <Container>
                <h2>Registrazione</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            name="username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Inserisci Nome"
                            value={formData.nome}
                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Cognome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Inserisci Nome"
                            value={formData.cognome}
                            onChange={(e) => setFormData({ ...formData, cognome: e.target.value })}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Data Di Nascita</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Inserisci data di nascita"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Avatar</Form.Label>
                        <Form.Control
                            type="file"
                            placeholder="Inserisci Avatar"
                            value={formData.avatar}
                            onChange={(e) => setFormData({ ...formData, avatar: e.target.files[0] })}

                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Registrati
                    </Button>
                </Form>
            </Container>
            <MyFooter />
        </>
    );
};


