import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import BlogDetailsContent from '../BlogDetailsContent/BlogDetailsContent';


export default function BlogDetails() {

    const params = useParams();

    const [data, setData] = useState({});

    const endpoint = `http://localhost:3001/api/blogPosts/${params.id}`

    const handleDetails = async () => {
        try {
            const res = await fetch(endpoint);
            if (res.ok) {
                const result = await res.json();
                console.log(result);
                setData(result);
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        handleDetails()
    }, [])


    return (
        <>
            <Container>
                <Row>
                    <Col md={12}>
                        {(data.length !== 0 && data.author) &&
                            <BlogDetailsContent key={data._id}
                                cover={data.cover}
                                authorAvatar={data.author.avatar ? data.author.avatar : null}
                                authorName={data.author.nome ? data.author.nome : null}
                                authorSurname={data.author.cognome ? data.author.cognome : null}
                                title={data.title}
                                readValue={data.readTime.value}
                                readUnit={data.readTime.unit}
                                content={data.content}
                            />}
                    </Col>
                </Row>
            </Container>
        </>
    )
}
