import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaRegComment } from "react-icons/fa6";
import CommentArea from '../CommentArea/CommentArea';

export default function SingleBlogPost(props) {

    const { id, category, title, cover, timeValue, timeUnit, authorName, authorAvatar, content } = props;

    const [comment, setComment] = useState(false)

    return (
        <>
            <Card className='mt-4' style={{ border: "none" }}>
                <Card.Img variant="top" className='img-fluid' src={cover} style={{ height: "400px" }} />
                <Card.Body>
                    <div className='my-3 d-flex align-items-center'>
                        <Card.Img src={authorAvatar} style={{ width: "30px" }} />
                        <span className='ms-2'>Autore: {authorName}</span>
                    </div>
                    <Card.Title>{title}</Card.Title>

                    <div>
                        <h4>Categoria: </h4>
                    </div>

                    {content}


                </Card.Body>
                <Card.Footer style={{ borderTop: "none", backgroundColor: "transparent" }}>
                    <div>
                        {timeValue}
                        <span> {timeUnit}
                        </span>
                        <span className='ms-3' style={{ padding: "5px 10px", backgroundColor: "lightgrey", borderRadius: "20px" }}>{category}</span>
                    </div>
                    <Button onClick={() => setComment(!comment)}>
                        <FaRegComment />
                    </Button>

                    {comment &&
                        <CommentArea id={id} />}
                </Card.Footer>


            </Card>
        </>
    )
}
