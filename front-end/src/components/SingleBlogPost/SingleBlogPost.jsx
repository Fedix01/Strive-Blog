import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function SingleBlogPost(props) {

    const { id, category, title, cover, timeValue, timeUnit, authorName, authorAvatar, content, deleteBlog, setMod, setId } = props;


    const handleModify = async () => {
        setId(id);
        setMod(false)
    };
    return (
        <>
            <Card className='mt-4'>
                <Card.Img variant="top" src={cover} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>

                    <div className='d-flex'>
                        <div>
                            {authorAvatar}
                        </div>
                        <div>
                            <h4>Autore: {authorName}</h4>
                            <h4>Categoria: {category}</h4>
                        </div>
                    </div>
                    <div>
                        {content}
                    </div>

                </Card.Body>
                <Card.Footer>
                    {timeValue}, {timeUnit}
                </Card.Footer>
                <Button variant='danger' onClick={() => deleteBlog(id)}>Elimina</Button>
                <Button variant='primary' onClick={() => handleModify(id)}>Modifica</Button>

            </Card>
        </>
    )
}
