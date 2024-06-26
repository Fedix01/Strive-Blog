import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Alert, Row, Col } from 'react-bootstrap';
import MyNavbar from '../MyNavbar/MyNavbar';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import '../SignUp/SignUp.css';
import { SearchBarContext } from '../SearchBarProvider/SearchBarProvider';

export default function SignUp() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [alert, setAlert] = useState("");

    const { setSearchBar } = useContext(SearchBarContext);

    const navigate = useNavigate();

    const endpoint = "http://localhost:3001/api/authors/login";

    const endpointGoogle = "http://localhost:3001/api/authors/googleLogin";

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                "email": formData.email,
                "password": formData.password
            };
            const res = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            if (res.ok) {
                const login = await res.json();
                localStorage.setItem("user", JSON.stringify(login.user));
                localStorage.setItem("token", login.token);
                console.log(login);
                setAlert(`Benvenuto ${login.user.nome}!`);
                setInterval(() => {
                    setAlert("")
                }, 4000);
                navigate("/")
            }
        } catch (error) {
            console.error(error);
            setAlert("Email o password errati");
            setTimeout(() => {
                setAlert("")
            }, 4000);
        }
    }

    const googleLogin = () => {
        window.open(endpointGoogle, "_self");
    }

    useEffect(() => {
        setSearchBar(false);
    }, [])


    return (
        <>
            <MyNavbar />
            <Row>
                <Col md={8} className='left d-flex flex-column justify-content-center align-items-center'>
                    <h2 className='ms-3'>Log In al Tuo Account</h2>
                    <p>Login usando Social Networks</p>
                    <Button variant='transparent' className='google-btn p-2' onClick={googleLogin}>
                        <FcGoogle />
                        <span className='ms-2'>Login con Google</span>
                    </Button>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='my-3'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group className='my-3'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <div className='d-flex justify-content-center'>
                            <button type='submit' className='log mt-3 p-2'>Loggati</button>
                        </div>
                        <div className='d-flex d-md-none justify-content-center mt-2'>
                            <h6>oppure</h6>
                        </div>
                        <div className='d-flex d-md-none justify-content-center'>

                            <Button variant='light' className='mt-2' onClick={() => navigate("/signIn")}>Registrati</Button>

                        </div>
                    </Form>

                    {alert &&
                        <Alert className='my-2' variant='danger'>
                            {alert}
                        </Alert>
                    }
                </Col>
                <Col md={4} className='d-none d-md-flex right flex-column justify-content-center align-items-center'>
                    <h2><b>Non hai un account?</b></h2>
                    <p className='my-3'>Registrati per accedere alla creazione dei blog e poter scrivere commenti!</p>
                    <Button variant='light' className='mt-2' onClick={() => navigate("/signIn")}>Registrati</Button>
                </Col>
            </Row>
        </>
    )
}
