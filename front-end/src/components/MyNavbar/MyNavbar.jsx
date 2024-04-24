import React, { useContext, useState, useEffect } from 'react';
import { Container, Nav, Navbar, Alert, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { alertContext } from '../AlertProvider/AlertProvider';
import { FaComments } from "react-icons/fa";


export default function MyNavbar({ searchTerm, setSearchTerm }) {
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
            <Navbar bg="light" data-bs-theme="light" style={{ position: "sticky", top: 0, zIndex: 2 }}>
                <Container>
                    <Navbar.Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
                        <FaComments />
                        <span className='ms-3'>Strive Blog</span>
                    </Navbar.Brand>
                    <Nav className="me-auto d-none d-lg-flex">
                        <Nav.Link onClick={() => navigate("/authors")}>Autori</Nav.Link>
                        <Nav.Link onClick={() => navigate("/blogPosts")}>Blog Posts</Nav.Link>
                        <Nav.Link href="pricing">Pricing</Nav.Link>
                    </Nav>
                    <Form className="d-flex" >
                        <Form.Control className="form-control me-2" type="search" placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm}></Form.Control>
                    </Form>
                    <div>
                        <Button variant='transparent'>Iscriviti</Button>
                        <Button variant='success' onClick={() => navigate("/newPost")}>Scrivi nuovo post</Button>
                        <Button variant='transparent'>Log In</Button>
                    </div>
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
