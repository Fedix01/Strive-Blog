import React, { useContext, useEffect, useState } from 'react'
import MyNavbar from '../MyNavbar/MyNavbar';
import MyFooter from '../MyFooter/MyFooter';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ModifyUser from '../ModifyUser/ModifyUser';
import { alertContext } from '../AlertProvider/AlertProvider';
import { SearchBarContext } from '../SearchBarProvider/SearchBarProvider';
import { GoogleContext } from '../GoogleUserProvider/GoogleUserProvider';

export default function UserProfile() {

    const [data, setData] = useState([]);

    const [mod, setMod] = useState(false);

    const { setAlert } = useContext(alertContext);

    const { setSearchBar } = useContext(SearchBarContext);

    const { googleUser, setGoogleUser } = useContext(GoogleContext);

    const endpoint = "http://localhost:3001/api/authors/me";

    const endpointPATCH = `http://localhost:3001/api/authors`;

    const endpointId = `http://localhost:3001/api/authors/${data._id}`

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
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            navigate("/signUp");
        }
    }

    const handleLogOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setGoogleUser([]);
        localStorage.removeItem("googleUser");
        setAlert("Logout effettuato correttamente!");
        setInterval(() => {
            setAlert("")
        }, 4000);
        navigate("/")
    }

    useEffect(() => {
        setSearchBar(false);
        getProfile();
    }, [])

    const handleModify = async (nome, cognome, email, username, password, avatar) => {
        try {
            const payload = {
                "nome": nome,
                "cognome": cognome,
                "email": email,
                "username": username,
                "password": password
            };
            const res = await fetch(endpointId, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                const response = await res.json();
                console.log(response)
                if (avatar) {
                    const formDataFile = new FormData();
                    formDataFile.append("avatar", avatar);
                    const patch = await fetch(`${endpointPATCH}/${response.user._id}/avatar`, {
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
                        getProfile();
                        setMod(false);
                        navigate("/")
                    }
                } else {
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("user", JSON.stringify(response.user))
                    console.log(response);
                    getProfile();
                    setMod(false);
                    navigate("/")

                }

            }
        } catch (error) {
            console.error(error)
        }
    }



    const handleDelete = async () => {
        try {
            const res = await fetch(endpointId, {
                method: "DELETE",
                headers: {
                    "Content-Type": "Application/json"
                }
            });
            if (res.ok) {
                const deleted = await res.json();
                console.log("oggetto eliminato", deleted);
                localStorage.removeItem("user");
                localStorage.removeItem("googleUser");
                localStorage.removeItem("token");
                setAlert("Profilo cancellato correttamente!");
                setInterval(() => {
                    setAlert("")
                }, 4000);
                navigate("/")
            } else {
                console.error("Errore durante l eliminazione", res.status);

            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>

            <MyNavbar />

            {data &&
                <Container>
                    <Row className='mt-5'>
                        <Col md={6}>
                            <img src={data.avatar ? data.avatar : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAL0AyAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwQFAQIH/8QAMhABAAIBAwIDBAgHAAAAAAAAAAECAwQRITFBElFxBTJCgRMUIiNSYaHhNENykZKxwf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/APqgCoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAivqMVJ5vHy5BKK/13D52/xeq6rDP8zb1jYEw5W9b+7aLekugAAAAAAAAAAAAAAAAAAeqvn1VMUzWI8V/KOzzrdROOPo8fFpjeZ8mfv+vUgly6jJl9632fwx0Q7OhAAIEcdOPRdwayJ2rljw7fF2Ugg2u0THSe4paDNM/d27RwugAAAAAAAAAAAAAAOuPOW22K894iQZefJ9Jntbtvt8kYKAAAAAAJdLfw6mkz3mIarHxbRlpM9ItDYQAAAAAAAAAAAAAAEWo/h8n9MpXjJHix3jzjYGQAoAAAAAAbtqOjGiN5iGzG/wAkAAAAAAAAAAAAAABV1+/0MbT3jdaQa2N9NO3baQZgCgAAAAABu09Hv9Xrv+f+2Y1dPXw4McT5IJQAAAAAAAAAAAAAHjJWbYr1jras7PYDGmtqztas1n84cXfaVZ+7t12md1JaAAAAAAPVMdrzEVjflsbcRHkraCu2Dfbm0ysoAAAAAAAAAAAAAAAAI8+P6XDNI67RMerJmJidp4mOJj820zvaFYjPEx8Uc/3BWAUAAHaVm9opXrM7OLPs+InNO/av/QaFaRWsVjpERDoIAAAAAAAAAAAAAAAHIDN19t88R5V5es2svMzXHM0iJ6qszM9Z3nzIACgAAs6CdtRt+KvCs7EzExMcTANnkZ+HWXiYrk+3Ez1aHKAAAAAAAAAAAG/7osmoxY/evHy5BKb+XPop319elKzPrwr5NVlycTbaPKvBBfy6jHiifFaPSFTNrL3+zXetf1Ve+/cjggAKAAAAAAC1h1l6fZtvav6qp1SDVxajHliPDaPSUu+3Xj1Yvffumx6rLj4i28eVuSDUFOmvr0vWY9OU+PUYsnu3j58EEob/ALAAADze8UrNrcVh6UfaN58VafDtE7Ai1Gqvl3rEzWnaPNXiNnegQAFAAAAAAAAAAAAAAByY3dAT6fVXxbVmZtTvHk0aXi9YtXmssdc9nXnxWp8O0zsgvAA//9k="}
                                alt=""
                                style={{ borderRadius: "50%", width: "300px", height: "300px" }} />
                        </Col>
                        <Col md={6}>
                            {mod ?
                                <ModifyUser data={data} handleModify={handleModify} />
                                :
                                <>
                                    <h3>Nome: <b>{data.nome}</b></h3>
                                    <h3>Cognome: <b>{data.cognome}</b></h3>
                                    <h3>Email: <b>{data.email}</b></h3>
                                    <h3>Username: <b>{data.username}</b></h3>
                                    <h3>Data di nascita: <b>{data.dataDiNascita}</b></h3>
                                    {
                                        googleUser.length === 0 ? (
                                            <>
                                                <Button variant='warning' onClick={() => setMod(true)}>Modifica profilo</Button>
                                                <Button variant='danger' className='ms-3' onClick={() => handleDelete()}>Cancella Profilo</Button>
                                            </>
                                        ) : null
                                    }
                                </>
                            }
                        </Col>
                        <Button className='mt-3' onClick={() => handleLogOut()}>Effettua il logout</Button>
                    </Row>

                </Container>
            }

            <MyFooter />
        </>

    )
}
