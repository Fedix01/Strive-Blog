import React, { useContext, useState, useEffect } from 'react';
import { Container, Nav, Navbar, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { alertContext } from '../AlertProvider/AlertProvider';

export default function MyNavbar() {
    const navigate = useNavigate();
    const { alert } = useContext(alertContext);
    const [variant, setVariant] = useState("");
    useEffect(() => {
        if (alert === "Valore aggiunto") {
            setVariant("success")
        } else if (alert === "Autore eliminato") {
            setVariant("danger")
        } else if (alert === "Autore modificato") {
            setVariant("primary")
        }
    }, [alert])


    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" style={{ position: "sticky", top: 0, zIndex: 2 }}>
                <Container>
                    <Navbar.Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }}>Homepage</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => navigate("/authors")}>Autori</Nav.Link>
                        <Nav.Link onClick={() => navigate("/blogPosts")}>Blog Posts</Nav.Link>
                        <Nav.Link href="pricing">Pricing</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <div style={{ position: "sticky", top: "56px", zIndex: 2 }}>
                {alert &&
                    <Alert variant={variant}>
                        {alert}
                    </Alert>}
            </div>
        </>
    );

}
