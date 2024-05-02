import React, { useEffect, useState } from 'react'
import MyNavbar from '../MyNavbar/MyNavbar';
import MyFooter from '../MyFooter/MyFooter';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {

    const [data, setData] = useState([]);

    const endpoint = "http://localhost:3001/api/authors/me"

    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    const getProfile = async () => {

        try {
            let res = await fetch(endpoint, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (res.ok) {
                const result = await res.json();
                console.log(result)
                setData(result)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleLogOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/")
    }

    useEffect(() => {
        getProfile()
    }, [])
    return (
        <>

            <MyNavbar />

            {data &&
                <Container>
                    <Row className='mt-3'>
                        <Col md={4}>
                            <img src={data.avatar ? data.avatar : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAL0AyAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwQFAQIH/8QAMhABAAIBAwIDBAgHAAAAAAAAAAECAwQRITFBElFxBTJCgRMUIiNSYaHhNENykZKxwf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/APqgCoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAivqMVJ5vHy5BKK/13D52/xeq6rDP8zb1jYEw5W9b+7aLekugAAAAAAAAAAAAAAAAAAeqvn1VMUzWI8V/KOzzrdROOPo8fFpjeZ8mfv+vUgly6jJl9632fwx0Q7OhAAIEcdOPRdwayJ2rljw7fF2Ugg2u0THSe4paDNM/d27RwugAAAAAAAAAAAAAAOuPOW22K894iQZefJ9Jntbtvt8kYKAAAAAAJdLfw6mkz3mIarHxbRlpM9ItDYQAAAAAAAAAAAAAAEWo/h8n9MpXjJHix3jzjYGQAoAAAAAAbtqOjGiN5iGzG/wAkAAAAAAAAAAAAAABV1+/0MbT3jdaQa2N9NO3baQZgCgAAAAABu09Hv9Xrv+f+2Y1dPXw4McT5IJQAAAAAAAAAAAAAHjJWbYr1jras7PYDGmtqztas1n84cXfaVZ+7t12md1JaAAAAAAPVMdrzEVjflsbcRHkraCu2Dfbm0ysoAAAAAAAAAAAAAAAAI8+P6XDNI67RMerJmJidp4mOJj820zvaFYjPEx8Uc/3BWAUAAHaVm9opXrM7OLPs+InNO/av/QaFaRWsVjpERDoIAAAAAAAAAAAAAAAHIDN19t88R5V5es2svMzXHM0iJ6qszM9Z3nzIACgAAs6CdtRt+KvCs7EzExMcTANnkZ+HWXiYrk+3Ez1aHKAAAAAAAAAAAG/7osmoxY/evHy5BKb+XPop319elKzPrwr5NVlycTbaPKvBBfy6jHiifFaPSFTNrL3+zXetf1Ve+/cjggAKAAAAAAC1h1l6fZtvav6qp1SDVxajHliPDaPSUu+3Xj1Yvffumx6rLj4i28eVuSDUFOmvr0vWY9OU+PUYsnu3j58EEob/ALAAADze8UrNrcVh6UfaN58VafDtE7Ai1Gqvl3rEzWnaPNXiNnegQAFAAAAAAAAAAAAAAByY3dAT6fVXxbVmZtTvHk0aXi9YtXmssdc9nXnxWp8O0zsgvAA//9k="}
                                alt=""
                                style={{ borderRadius: "50%" }} />
                        </Col>
                        <Col md={8}>
                            <h3>Nome: <b>{data.nome}</b></h3>
                            <h3>Cognome: <b>{data.cognome}</b></h3>
                            <h3>Email: <b>{data.email}</b></h3>
                            <h3>Username: <b>{data.username}</b></h3>
                            <h3>Data di nascita: <b>{data.dataDiNascita}</b></h3>
                            <h3>Password: {data.password}</h3>
                        </Col>
                        <Button onClick={() => handleLogOut()}>Effettua il logout</Button>
                    </Row>

                </Container>
            }

            <MyFooter />
        </>

    )
}
