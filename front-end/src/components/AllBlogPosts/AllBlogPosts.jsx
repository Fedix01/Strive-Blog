import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import SingleBlogPost from '../SingleBlogPost/SingleBlogPost';

export default function AllBlogPosts({ data }) {

    // const [data, setData] = useState([]);


    // const handleSearch = async () => {
    //     try {
    //         const response = await fetch(`${endpoint}?title=${searchTerm}`);
    //         if (response.ok) {
    //             const results = await response.json();
    //             setData(results);
    //             console.log("Risultati ricerca:", results);
    //         } else {
    //             console.error('Errore nella risposta:', response.statusText);
    //         }
    //     } catch (error) {
    //         console.error('Errore durante la ricerca:', error);
    //     }
    // };

    return (
        <>

            <Container>
                <Row>
                    <Col md={12}>
                        <h2>Tutti i Blog</h2>
                    </Col>

                    {data &&
                        data.map((el) => (
                            <Col md={6} key={el._id}>
                                <SingleBlogPost key={el._id}
                                    id={el._id}
                                    category={el.category}
                                    title={el.title}
                                    cover={el.cover}
                                    timeValue={el.readTime.value}
                                    timeUnit={el.readTime.unit}
                                    authorName={el.author.name}
                                    authorAvatar={el.author.avatar}
                                    content={el.content}

                                />
                            </Col>))}

                </Row>
            </Container >
        </>
    )
}
