import React, { useContext } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { ModifyAuthors } from '../ModifyAuthorsProvider/ModifyAuthorsProvider';

export default function SingleAuthor(props) {
    const { name, surname, email, birth, avatar, deleteAuthor, id, setId } = props;

    const { modify, setModify } = useContext(ModifyAuthors);

    const handleModify = (id) => {
        setModify(!modify);
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
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Email: {email}</ListGroup.Item>
                    <ListGroup.Item>Data di nascita: {birth}</ListGroup.Item>
                </ListGroup>
                <div>
                    <Button variant="primary" onClick={() => handleModify(id)}>Modifica</Button>
                    <Button variant="danger" onClick={() => deleteAuthor(id)}>Elimina</Button>
                </div>
            </Card>

        </>
    )
}
