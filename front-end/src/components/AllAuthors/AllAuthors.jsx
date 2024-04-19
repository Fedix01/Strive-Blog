import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Alert } from 'react-bootstrap';
import SingleAuthor from '../SingleAuthor/SingleAuthor';
import AddAuthor from '../AddAuthor/AddAuthor';
import MyNavbar from '../MyNavbar/MyNavbar';
import MyFooter from '../MyFooter/MyFooter';

export default function AllAuthors() {
    const [data, setData] = useState([]);

    const endpoint = "http://localhost:3001/api/authors";
    // id passato per la richiesta put
    const [id, setId] = useState("");

    const [mod, setMod] = useState(true)

    const [alert, setAlert] = useState("");

    const getFromApi = async () => {
        try {
            let res = await fetch(endpoint);
            if (res.ok) {
                let result = await res.json();
                setData(result);
                console.log(result)
            }
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        getFromApi()
    }, [])

    const postAuthor = async (e, name, surname, email, date, avatar) => {
        e.preventDefault();
        const payload = {
            "nome": name,
            "cognome": surname,
            "email": email,
            "dataDiNascita": date
        }
        try {
            const post = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })
            if (post.ok) {
                console.log(post, "Chiamata post fatta");
                const newUser = await post.json();
                console.log(newUser)
                const formData = new FormData();
                formData.append("avatar", avatar)
                const patch = await fetch(`${endpoint}/${newUser._id}/avatar`, {
                    method: "PATCH",
                    body: formData
                });
                const res = patch.json();
                console.log(res.json);
                getFromApi();
                setAlert("Autore aggiunto")
                setTimeout(() => {
                    setAlert("")
                }, 3000);

            }
        } catch (error) {
            console.error(error)
        }

    }


    const deleteAuthor = async (id) => {
        try {
            const response = await fetch(`${endpoint}/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "Application/json" }
            })
            if (response.ok) {
                console.log("L autore è stato eliminato");
                getFromApi();
                setAlert("Autore eliminato")
                setTimeout(() => {
                    setAlert("")
                }, 3000);
            }
        } catch (error) {
            console.error(error)
        }
    }

    const modifyAuthor = async (e, name, surname, email, date, avatar) => {
        e.preventDefault();
        const payload = {
            "nome": name,
            "cognome": surname,
            "email": email,
            "dataDiNascita": date,
            "avatar": avatar
        };
        try {
            const response = await fetch(`${endpoint}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "Application/json" },
                body: JSON.stringify(payload)
            })
            if (response.ok) {
                console.log("l Autore è stato cambiato");
                getFromApi();
                setMod(true);
                setAlert("Autore modificato")
                setTimeout(() => {
                    setAlert("")
                }, 3000);
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <MyNavbar />
            <div className='mt-3'>
                {alert && (
                    <Alert variant='success'>
                        {alert}
                    </Alert>)}
                <Container>

                    {data &&
                        <AddAuthor post={postAuthor} put={modifyAuthor} mod={mod} />}

                    <Row>
                        <Col md={12} className='mt-5'>
                            <h4>Tutti gli autori</h4>
                        </Col>
                    </Row>
                    <Row>

                        {data &&
                            data.map((el) => (
                                <Col md={4} key={el._id}>
                                    <SingleAuthor key={el._id} id={el._id} name={el.nome} surname={el.cognome} email={el.email} birth={el.dataDiNascita} avatar={el.avatar} deleteAuthor={deleteAuthor} setId={setId} setMod={setMod} mod={mod} />
                                </Col>))}

                    </Row>
                </Container>
            </div>
            <MyFooter />
        </>
    )
}
