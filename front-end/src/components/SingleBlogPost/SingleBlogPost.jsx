import React from 'react';
import Card from 'react-bootstrap/Card';

export default function SingleBlogPost(props) {

    const { category, title, cover, timeValue, timeUnit, authorName, authorAvatar, content } = props;

    return (
        <>
            <Card className='mt-4'>
                <Card.Img variant="top" src={cover} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        <div className='d-flex'>
                            <div>
                                {authorAvatar}
                            </div>
                            <div>
                                <h4>Autore: {authorName}</h4>
                                <h4>Categoria: {category}</h4>
                            </div>
                        </div>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    {timeValue}, {timeUnit}
                </Card.Footer>
            </Card>
        </>
    )
}
