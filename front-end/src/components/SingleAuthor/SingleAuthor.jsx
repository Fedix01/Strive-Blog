import React from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';

export default function SingleAuthor(props) {
    const { name, surname, email, birth, avatar, deleteAuthor, id, setId, setMod, mod } = props;


    const handleModify = (id) => {
        setMod(!mod);
        setId(id)
    }
    return (
        <>
            <Card className='ms-3' style={{ width: '20rem' }}>
                <Card.Img variant="top" src={avatar} />
                <Card.Body>
                    <Card.Title>
                        <h2> Nome: {name}</h2>
                        <h2>Cognome: {surname}</h2>
                    </Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush" style={{ borderBottom: "none" }}>
                    <ListGroup.Item>Email: {email}</ListGroup.Item>
                    <ListGroup.Item>Data di nascita: {birth}</ListGroup.Item>
                </ListGroup>
                <div className='ms-2 mt-2 mb-1'>
                    <Button variant="primary" onClick={() => handleModify(id)}>Modifica</Button>
                    <Button variant="danger" className='ms-3' onClick={() => deleteAuthor(id)}>Elimina</Button>
                </div>
            </Card>

        </>
    )
}
