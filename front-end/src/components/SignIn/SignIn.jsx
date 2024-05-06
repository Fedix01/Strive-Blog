import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MyNavbar from '../MyNavbar/MyNavbar';
import { alertContext } from '../AlertProvider/AlertProvider';
import '../SignIn/SignIn.css'
import { SearchBarContext } from '../SearchBarProvider/SearchBarProvider';


export default function SignIn() {


    const navigate = useNavigate();

    const { setAlert } = useContext(alertContext);

    const { setSearchBar } = useContext(SearchBarContext);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        nome: '',
        cognome: '',
        date: '',
        avatar: null
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
            console.log(formData.avatar)

            const post = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            if (post.ok) {
                const response = await post.json();
                if (formData.avatar) {
                    const formDataFile = new FormData();
                    console.log(response.user._id)
                    formDataFile.append("avatar", formData.avatar);
                    const patch = await fetch(`${endpoint}/${response.user._id}/avatar`, {
                        method: "PATCH",
                        body: formDataFile
                    });
                    if (patch.ok) {
                        const newAuthor = await patch.json();
                        console.log(newAuthor);
                        console.log(newAuthor.token);
                        localStorage.setItem("token", newAuthor.token);
                        localStorage.setItem("user", JSON.stringify(newAuthor.user))
                        console.log(newAuthor);
                        setAlert(`Benvenuto ${newAuthor.user.nome}!`);
                        setInterval(() => {
                            setAlert("")
                        }, 4000);
                        navigate("/")

                    }
                } else {
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("user", JSON.stringify(response.user))
                    console.log(response);
                    setAlert(`Benvenuto ${response.user.nome}!`);
                    setInterval(() => {
                        setAlert("")
                    }, 4000);
                    navigate("/")
                }

            }
        } catch (error) {
            console.error(error);
            setAlert("Errore nella creazione del profilo");
            setInterval(() => {
                setAlert("")
            }, 4000);
        }

    };

    useEffect(() => {
        setSearchBar(false)
    }, [])


    return (
        <>
            <MyNavbar />
            <Row>
                <Col md={4} className='left-reg d-flex flex-column justify-content-center align-items-center'>
                    <h2><b>Hai gia un account?</b></h2>
                    <p className='my-3'>Esegui il login per accedere alla creazioni di Blog e Commenti</p>
                    <Button variant='light' className='mt-2' onClick={() => navigate("/signUp")}>Log In</Button>
                </Col>
                <Col md={8} className='d-flex flex-column justify-content-center align-items-center'>
                    <h2>Registrazione</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='my-3'>
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

                        <Form.Group className='my-3'>
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

                        <Form.Group className='my-3'>
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

                        <Form.Group className='my-3'>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Inserisci Nome"
                                value={formData.nome}
                                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group className='my-3'>
                            <Form.Label>Cognome</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Inserisci Nome"
                                value={formData.cognome}
                                onChange={(e) => setFormData({ ...formData, cognome: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group className='my-3'>
                            <Form.Label>Data Di Nascita</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Inserisci data di nascita"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group className='my-3'>
                            <Form.Label>Avatar</Form.Label>
                            <Form.Control
                                type="file"
                                placeholder="Inserisci Avatar"
                                onChange={(e) => setFormData({ ...formData, avatar: e.target.files[0] })}

                            />
                        </Form.Group>
                        <div className='d-flex justify-content-center'>
                            <Button variant="primary" type="submit" className='sign-in mt-3'>
                                Registrati
                            </Button>
                        </div>
                    </Form>

                </Col>

            </Row>
        </>
    );
};


