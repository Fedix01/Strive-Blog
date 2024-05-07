import React from 'react';
import { Card } from 'react-bootstrap';

export default function SingleAuthor(props) {
    const { name, surname, email, birth, avatar } = props;


    return (
        <>
            <Card className='mx-1 my-2' style={{ width: '20rem', border: "none" }}>
                <Card.Img variant="top" src={avatar} style={{ height: '15rem' }} />
                <Card.Body>
                    <Card.Title>
                        <h4>{name} {surname}</h4>
                    </Card.Title>
                    <Card.Text>
                        <h5>Email: {email}</h5>
                        <h5>Data di nascita: {birth}</h5>
                    </Card.Text>
                </Card.Body>
            </Card>

        </>
    )
}
