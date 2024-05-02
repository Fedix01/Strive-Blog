import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import MyNavbar from '../MyNavbar/MyNavbar';
import MyFooter from '../MyFooter/MyFooter';

export default function SignUp() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

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
            console.error(error)
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


                    <Button type='submit'>Loggati</Button>
                </Form>
            </Container>
            <MyFooter />
        </>
    )
}
