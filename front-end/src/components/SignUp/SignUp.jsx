import React, { useState } from 'react'
import { Button, Container, Form, Alert } from 'react-bootstrap';
import MyNavbar from '../MyNavbar/MyNavbar';
import MyFooter from '../MyFooter/MyFooter';
import { useNavigate } from 'react-router-dom';

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
                <h2>Log In</h2>
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
                <div className='d-flex align-items-center mt-3'>
                    <h6>Non hai un account?</h6>
                    <Button variant='transparent' style={{ color: "#0067BF", fontWeight: "bold" }} className='mb-2' onClick={() => navigate("/signIn")}>Registrati</Button>
                </div>
            </Container>
            <MyFooter />
        </>
    )
}
