import React, { useContext, useState, useEffect } from 'react';
import { Container, Nav, Navbar, Alert, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { alertContext } from '../AlertProvider/AlertProvider';
import { FaComments } from "react-icons/fa";
import '../MyNavbar/MyNavbar.css';
import { PiNotePencilLight } from "react-icons/pi";
import { SearchBarContext } from '../SearchBarProvider/SearchBarProvider';


export default function MyNavbar({ searchTerm, setSearchTerm }) {
    const navigate = useNavigate();
    const { alert } = useContext(alertContext);
    const [variant, setVariant] = useState("");

    const [user, setUser] = useState([]);

    const { searchBar } = useContext(SearchBarContext);

    useEffect(() => {
        if (alert === "Valore aggiunto") {
            setVariant("success")
        } else if (alert === "Autore eliminato") {
            setVariant("danger")
        } else if (alert === "Autore modificato") {
            setVariant("primary")
        }
    }, [alert])

    useEffect(() => {
        const userString = localStorage.getItem("user");
        if (userString) {
            const newUser = JSON.parse(userString);
            setUser(newUser);
            console.log(newUser);

        }
    }, []);

    return (
        <>
            <Navbar bg="light" data-bs-theme="light" style={{ position: "sticky", top: 0, zIndex: 2, borderBottom: "1px solid lightgray" }} className='justify-content-between'>
                <div className='left-nav d-flex justify-content-center align-items-center'>

                    <Navbar.Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
                        <FaComments />
                        <span className='ms-3'>Strive Blog</span>
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Link onClick={() => navigate("/authors")}>Autori</Nav.Link>
                        {/* <Nav.Link onClick={() => navigate("/blogPosts")}>Blog Posts</Nav.Link>
                        <Nav.Link href="pricing">Pricing</Nav.Link> */}
                    </Nav>
                </div>
                {searchBar &&
                    <Form className="d-flex justify-content-center" >
                        <Form.Control className="nav-input form-control me-2" type="search" placeholder="Cerca" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm}></Form.Control>
                    </Form>
                }

                <div>
                    {user.length !== 0 ? (
                        <>
                            <div className='right-nav d-flex justify-content-center align-items-center'>
                                <Button variant='success' onClick={() => navigate("/newPost")}>Scrivi nuovo post</Button>
                                <Button variant='transparent' onClick={() => navigate("/me")}>{user.nome} {user.cognome}
                                    <img src={user.avatar ? user.avatar : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAL0AyAMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAABAUDAQIH/8QAMBABAAIBAgQEBAQHAAAAAAAAAAECEQMhBDFBYQUSIlEyUnGRE7Hh8BQzU2JygaH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwD9UAVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeTON3HU4vSp180+0A7iP+Pj+nP3fdON0rfFFq/WAUjnTX0rz6dSHT9wAAAAAAAAAAAAAAAAAAD1PxHE10YxztPKPY4vX/C09vityZszM280zmfcH3qa+pqRi1vT8scnP8vYCAfQCBtzxuo0OKtpTFb+qv5JzJBsxaJiJjfbOXqHgNXEzpT13r2XAAAAAAAAAAAAAAAA8mcRM+2QZvG6nn17Y5V2/24E7zMz1nIQAFAAAAH1S00vFoneGxE5jPZi9GxT4K/SEH0AAAAAAAAAAAAAA+NXbS1J/tl9uet/KvEfLIMkBQAAAAAAa2jOdGn+MMlraGfwqRPywg6AAAAAAAAAAAAAAI/EZmPJGdt1iTxGudOto6TuCABQAAAAAAW+HTOLxmcRhEv8ADqzGneZ6ygrAAAAAAAAAAAAAAc+IpOpoWrHOY2dDqDGtW1Z9UTHbDxd4hTNa3xvHplCtAAAAAAHta2tPpiZ7YavD0nT0KVnnEbp/D6Yra+N59MLOqAAAAAAAAAAAAAAAADy9IvSa25TGGRek6dprbnDYReI1jGnbrmYBEAoAAPqlJ1LxWvOf+Plb4dWMaluuYgFlKRSkVryiMPQQAAAAAAAAAAAAAAAO3UDP6ofELVmKVi0Zicz2ecbrXi3kpbFMb46pPfuQAFAABZ4fesRqVmYznMd0Yg2s/oIOC1rzbyXtmmNs9F/bqAAAAAAAAAAAHLnjHWU2rxlKbU9du3IFMe2N3ze9aR67Vr2lnanFa14x5vLHtDhO85mcz3IL9TjqR8Eeb67JtXidXUjFrYj2jZxCAAoAAAAAAO2lxOrpxitsx7Tu4iQX6fHUn448v03U0vW8ei1bdoY5G05icT2INqfbG4zNPitakY83mj2lVpcZS+1/RbvyIKQ58sY6SAAAAZ2+4M/jteZtOnWZ8sbT3lK9mZm0zPOXhAAUAAAAAAAAAAAAAAAAVcFrzFo07Zms7RnpLQY0TMWiY6NnO32QAAf/2Q=="} alt=""
                                        style={{ width: "40px", borderRadius: "50%", marginLeft: "1rem" }} />
                                </Button>
                            </div>
                        </>) : (
                        <>
                            <div className='right-nav d-flex justify-content-center align-items-center'>
                                <Button variant='transparent' className='d-flex align-items-center' onClick={() => navigate("/newPost")}>
                                    <PiNotePencilLight className='me-1' style={{ fontSize: "30px" }} />
                                    <span> Scrivi</span></Button>
                                <Button variant='success' className='sign-up' onClick={() => navigate("/signIn")}>Registrati</Button>
                                <Button variant='transparent' onClick={() => navigate("/signUp")}>Log In
                                    <span className='ms-3'>
                                        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAL0AyAMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAABAUDAQIH/8QAMBABAAIBAgQEBAQHAAAAAAAAAAECEQMhBDFBYQUSIlEyUnGRE7Hh8BQzU2JygaH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwD9UAVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeTON3HU4vSp180+0A7iP+Pj+nP3fdON0rfFFq/WAUjnTX0rz6dSHT9wAAAAAAAAAAAAAAAAAAD1PxHE10YxztPKPY4vX/C09vityZszM280zmfcH3qa+pqRi1vT8scnP8vYCAfQCBtzxuo0OKtpTFb+qv5JzJBsxaJiJjfbOXqHgNXEzpT13r2XAAAAAAAAAAAAAAAA8mcRM+2QZvG6nn17Y5V2/24E7zMz1nIQAFAAAAH1S00vFoneGxE5jPZi9GxT4K/SEH0AAAAAAAAAAAAAA+NXbS1J/tl9uet/KvEfLIMkBQAAAAAAa2jOdGn+MMlraGfwqRPywg6AAAAAAAAAAAAAAI/EZmPJGdt1iTxGudOto6TuCABQAAAAAAW+HTOLxmcRhEv8ADqzGneZ6ygrAAAAAAAAAAAAAAc+IpOpoWrHOY2dDqDGtW1Z9UTHbDxd4hTNa3xvHplCtAAAAAAHta2tPpiZ7YavD0nT0KVnnEbp/D6Yra+N59MLOqAAAAAAAAAAAAAAAADy9IvSa25TGGRek6dprbnDYReI1jGnbrmYBEAoAAPqlJ1LxWvOf+Plb4dWMaluuYgFlKRSkVryiMPQQAAAAAAAAAAAAAAAO3UDP6ofELVmKVi0Zicz2ecbrXi3kpbFMb46pPfuQAFAABZ4fesRqVmYznMd0Yg2s/oIOC1rzbyXtmmNs9F/bqAAAAAAAAAAAHLnjHWU2rxlKbU9du3IFMe2N3ze9aR67Vr2lnanFa14x5vLHtDhO85mcz3IL9TjqR8Eeb67JtXidXUjFrYj2jZxCAAoAAAAAAO2lxOrpxitsx7Tu4iQX6fHUn448v03U0vW8ei1bdoY5G05icT2INqfbG4zNPitakY83mj2lVpcZS+1/RbvyIKQ58sY6SAAAAZ2+4M/jteZtOnWZ8sbT3lK9mZm0zPOXhAAUAAAAAAAAAAAAAAAAVcFrzFo07Zms7RnpLQY0TMWiY6NnO32QAAf/2Q=="
                                            alt="" style={{ width: "45px", borderRadius: "50%" }} />
                                    </span></Button>
                            </div>
                        </>
                    )
                    }
                </div>
            </Navbar>
            <div style={{ position: "sticky", top: "56px", zIndex: 2 }}>
                {alert &&
                    <Alert variant='info'>
                        {alert}
                    </Alert>}

            </div>
        </>
    );

}
