import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function SingleBlogPost(props) {

    const { id, category, title, cover, timeValue, timeUnit, authorName, authorAvatar, content } = props;


    return (
        <>
            <Card className='mt-4'>
                <Card.Img variant="top" src={cover} style={{ maxHeight: "400px" }} />
                <Card.Body>
                    <Card.Title>Titolo: {title}</Card.Title>


                    <Card.Img src={authorAvatar} style={{ width: "30px" }} />
                    <span className='ms-2'>Autore: {authorName}</span>
                    <div>
                        <h4>Categoria: {category}</h4>
                    </div>

                    {content}


                </Card.Body>
                <Card.Footer>
                    {timeValue} {timeUnit}
                </Card.Footer>


            </Card>
        </>
    )
}
