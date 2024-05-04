import React, { useState } from 'react'
import { Button, Container, Form, Alert, Row, Col } from 'react-bootstrap';
import MyNavbar from '../MyNavbar/MyNavbar';
import MyFooter from '../MyFooter/MyFooter';
import { useNavigate } from 'react-router-dom';
import backgroundSito from '../../assets/backgroundSito.jpg';

export default function SignUp() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [alert, setAlert] = useState("");

    const navigate = useNavigate();

    const endpoint = "http://localhost:3001/api/authors/login";

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
                localStorage.setItem("token", login.token)
                console.log(login)
            }
        } catch (error) {
            console.error(error);
            setAlert("Email o password errati");
            setTimeout(() => {
                setAlert("")
            }, 4000);
        }
    }

    return (
        <>
            <MyNavbar />
            <Container>
                <Row>
                    <Col md={8} style={{ height: "100vh" }} className='d-flex flex-column justify-content-center align-items-center'>
                        <h2>Log In al Tuo Account</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                            </Form.Group>

                            <Button type='submit' style={{ width: "100%" }}>Loggati</Button>
                        </Form>

                        {alert &&
                            <Alert className='my-2' variant='danger'>
                                {alert}
                            </Alert>
                        }
                    </Col>
                    <Col md={4} style={{ width: "100%", height: "100%", backgroundImage: `url(${backgroundSito})` }}>
                        <div className='d-flex flex-column justify-content-center'>
                            <h6>Non hai un account?</h6>
                            <Button variant='transparent' style={{ color: "#0067BF", fontWeight: "bold" }} className='mb-2' onClick={() => navigate("/signIn")}>Registrati</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
            <MyFooter />
        </>
    )
}
