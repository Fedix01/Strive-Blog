import React, { useState } from 'react'
import MyNavbar from '../MyNavbar/MyNavbar';
import MyFooter from '../MyFooter/MyFooter';
import { Row, Col, Button, Container } from 'react-bootstrap';
import { FaRegComment } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";
import { IoPlayCircleOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";

export default function BlogDetailsContent(props) {

    const { cover, authorName, authorSurname, authorAvatar, title, readValue, readUnit, content } = props;

    const [comment, setComment] = useState(false);

    return (
        <>
            <MyNavbar />
            <div className='d-flex justify-content-center'>
                <div>
                    <Row className='mt-4'>
                        <Col md={12}>
                            <h1 style={{ fontSize: "65px" }}>{title}</h1>
                        </Col>
                    </Row>
                    <div className='mt-3'>
                        <Row>
                            <Col md={1}>
                                <img src={authorAvatar ? authorAvatar : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgGCgkGBwoHBwYGBg8UFQYWIB0WIhURHxMYHSggGBolGx8fITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMgAyAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwQFAgEH/8QANBABAQACAAMGAgYLAQAAAAAAAAIBAwQREiEiMTJSYhNyBTNTgqHBI0FCUWFxgZGSk7EU/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD6oAqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8qpic1WcYmfNVM/fxV3nOIzmY/GwXNvEa9XZVc6+znxVb4+s57kTj5u1UAWP/bu/fH+t1PHbMeM6s/d5KoC/HHRnzxc/L2rWM4zjGceFMZJp33pz3c85+zrwBrDjVsnbGKn70+h2AAAAAAAAAAAAAAABnPLGc58J7wM/j9ma2/D59kT5f4qr26zV5rPjVdTxQAAAAABZ4C8zu6OfZctFkaKzO/XnHrlroAAAAAAAAAAAAAACPfnlo2fJSRHvxz0bMeygZICgAAAAADqM9NzXpqabDFbWPBAAAAAAAAAAAAAAARb9k69ec3z5V3e6lVuPxz0Yz6bkGcAoAAAAAA9xy545+DW1XOyMXPVyr1Mhp8Hjlw8e7qr8UE4AAAAAAAAAAAAACHip6+HvHpnq/smeVOKnM58KnpoGMJeI0fAqcdXVivL3USgAAAAAA19U9GqJ9MqHDcN8bHVnPKZr/JpIAAAAAAAAAAAAAAAAKv0hHVqm8fsV/wBZ7ZqcXOZrwqemmTu151bMxnt6fLXqwDgBQAABJw+v4u3E58vmr+QL/CR0aJxnxr9JX9U4IAAAAAAAAAAAAAAAADP+kfrp+T8167iJ53Uzj3MzitmNu3qnyzPTIIgFAABa+jvrq+T81VNwuzGrdiq8tT00DUHMXFzzisVj2ukAAAAAAAAAAAAAEezdr1+e5xn0z25BI52XGueq6xjClt47OeeNU8vdStV1ddVVnOfVQGy6u81Wc573d6nIKAAAAAAOtd1F4qc5x3u90tbXcbJ6orGcMd1N1FdU1nGfVKDYFDVx2ccsbZ5+6VvXu17PJc5z6a7MgkAAAAAABDxO74Mc8dt13YkHW3dGrHO6+WZ8aVL4+s/VxOPds7VWqq6zVZznNeaqeAkviNt+a88vTPYjBQAAAAAAAAAAAAABJHEbY8t55emu1PHH1j6yJz7tfYqANbVujbjnFfNNeMpGNNVFYqc5xmfLUtPht3xo557Lnu3KCYABm8dWa35x+qJmQBXAUAAAAAAAAAAAAAAAAAAFjgazO/GP1XNSCDSAB//Z"}
                                    alt="author" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                            </Col>
                            <Col md={6}>
                                <h6>{authorName} {authorSurname} <b className='ms-2' style={{ color: "#186E15" }}> Follow</b> </h6>
                                <h6 style={{ color: "#6C6C6C" }}>{readValue} {readUnit}</h6>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <div>
                                    <Button variant='transparent' onClick={() => setComment(!comment)}>
                                        <FaRegComment style={{ fontSize: "20px" }} />
                                    </Button>
                                </div>

                            </Col>
                            <Col md={6} className='d-flex justify-content-end'>
                                <div>
                                    <FaRegBookmark className='mx-2' style={{ fontSize: "20px" }} />
                                    <IoPlayCircleOutline className='mx-2' style={{ fontSize: "20px" }} />
                                    <FiUpload className='mx-2' style={{ fontSize: "20px" }} />
                                </div>
                            </Col>

                        </Row>
                    </div>
                </div>
            </div>
            <Row>
                <Col md={12} className='d-flex justify-content-center'>
                    <img src={cover} alt="cover" style={{ width: "70%" }} />
                </Col>
            </Row>
            <Row>
                <Col md={12} className='d-flex justify-content-start'>
                    <p>{content}</p>
                </Col>
            </Row>
            <MyFooter />
        </>
    )
}
