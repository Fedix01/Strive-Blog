import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaRegComment } from "react-icons/fa6";
import CommentArea from '../CommentArea/CommentArea';

export default function SingleBlogPost(props) {

    const { id, category, title, cover, timeValue, timeUnit, authorName, authorAvatar, content, authorLastName } = props;

    const [comment, setComment] = useState(false)

    return (
        <>
            <Card className='mt-4' style={{ border: "none" }}>
                <Card.Img variant="top" className='img-fluid' src={cover} style={{ height: "400px" }} />
                <Card.Body>
                    <div className='my-3 d-flex align-items-center'>
                        <Card.Img src={authorAvatar ? authorAvatar : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAL0AyAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwQFAQIH/8QAMhABAAIBAwIDBAgHAAAAAAAAAAECAwQRITFBElFxBTJCgRMUIiNSYaHhNENykZKxwf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/APqgCoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAivqMVJ5vHy5BKK/13D52/xeq6rDP8zb1jYEw5W9b+7aLekugAAAAAAAAAAAAAAAAAAeqvn1VMUzWI8V/KOzzrdROOPo8fFpjeZ8mfv+vUgly6jJl9632fwx0Q7OhAAIEcdOPRdwayJ2rljw7fF2Ugg2u0THSe4paDNM/d27RwugAAAAAAAAAAAAAAOuPOW22K894iQZefJ9Jntbtvt8kYKAAAAAAJdLfw6mkz3mIarHxbRlpM9ItDYQAAAAAAAAAAAAAAEWo/h8n9MpXjJHix3jzjYGQAoAAAAAAbtqOjGiN5iGzG/wAkAAAAAAAAAAAAAABV1+/0MbT3jdaQa2N9NO3baQZgCgAAAAABu09Hv9Xrv+f+2Y1dPXw4McT5IJQAAAAAAAAAAAAAHjJWbYr1jras7PYDGmtqztas1n84cXfaVZ+7t12md1JaAAAAAAPVMdrzEVjflsbcRHkraCu2Dfbm0ysoAAAAAAAAAAAAAAAAI8+P6XDNI67RMerJmJidp4mOJj820zvaFYjPEx8Uc/3BWAUAAHaVm9opXrM7OLPs+InNO/av/QaFaRWsVjpERDoIAAAAAAAAAAAAAAAHIDN19t88R5V5es2svMzXHM0iJ6qszM9Z3nzIACgAAs6CdtRt+KvCs7EzExMcTANnkZ+HWXiYrk+3Ez1aHKAAAAAAAAAAAG/7osmoxY/evHy5BKb+XPop319elKzPrwr5NVlycTbaPKvBBfy6jHiifFaPSFTNrL3+zXetf1Ve+/cjggAKAAAAAAC1h1l6fZtvav6qp1SDVxajHliPDaPSUu+3Xj1Yvffumx6rLj4i28eVuSDUFOmvr0vWY9OU+PUYsnu3j58EEob/ALAAADze8UrNrcVh6UfaN58VafDtE7Ai1Gqvl3rEzWnaPNXiNnegQAFAAAAAAAAAAAAAAByY3dAT6fVXxbVmZtTvHk0aXi9YtXmssdc9nXnxWp8O0zsgvAA//9k="}
                            style={{ width: "30px" }} />
                        <span className='ms-2'>Autore: {authorName} {authorLastName}</span>
                    </div>
                    <Card.Title>{title}</Card.Title>
                    <div>
                        {content}
                    </div>
                </Card.Body>
                <Card.Footer style={{ borderTop: "none", backgroundColor: "transparent" }}>
                    <div>
                        {timeValue}
                        <span> {timeUnit}
                        </span>
                        <span className='ms-3' style={{ padding: "5px 10px", backgroundColor: "lightgrey", borderRadius: "20px" }}>{category}</span>
                    </div>
                    <Button variant='transparent' onClick={() => setComment(!comment)}>
                        <FaRegComment />
                    </Button>
                    {comment &&
                        <CommentArea id={id} />
                    }
                </Card.Footer>


            </Card>
        </>
    )
}
