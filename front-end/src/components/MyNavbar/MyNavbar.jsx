import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

export default function MyNavbar() {
    const navigate = useNavigate();

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }}>Homepage</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={() => navigate("/authors")}>Autori</Nav.Link>
                    <Nav.Link onClick={() => navigate("/blogPosts")}>Blog Posts</Nav.Link>
                    <Nav.Link href="pricing">Pricing</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );

}
