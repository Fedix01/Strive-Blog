import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import SingleAuthor from '../SingleAuthor/SingleAuthor';
import AddAuthor from '../AddAuthor/AddAuthor';

export default function AllAuthors() {
    const [data, setData] = useState([]);

    const endpoint = "http://localhost:3001";
    // id passato per la richiesta put
    const [id, setId] = useState("");

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
            "dataDiNascita": date,
            "avatar": avatar
        }
        try {
            const post = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })
            if (post.ok) {
                console.log(post, "Chiamata post fatta");
                getFromApi()

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
                getFromApi()
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
                getFromApi()
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className='mt-3'>
            <Container>

                {data &&
                    <AddAuthor post={postAuthor} put={modifyAuthor} />}

                <Row>
                    <Col md={12}>
                        <h4>Tutti gli autori</h4>
                    </Col>
                </Row>
                <Row>

                    {data &&
                        data.map((el) => (
                            <Col md={4} key={el._id}>
                                <SingleAuthor key={el._id} id={el._id} name={el.nome} surname={el.cognome} email={el.email} birth={el.dataDiNascita} avatar={el.avatar} deleteAuthor={deleteAuthor} setId={setId} />
                            </Col>))}

                </Row>
            </Container>
        </div>
    )
}
