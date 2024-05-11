import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import SingleBlogPost from '../SingleBlogPost/SingleBlogPost';

export default function AllBlogPosts({ data, filteredTopic }) {

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
                    {filteredTopic ?
                        <Col md={12}>
                            <h2>Tutti i Blog in: {filteredTopic}</h2>
                            <p>Risultati trovati: {data.length}</p>
                        </Col>
                        :
                        <Col md={12}>
                            <h2>Tutti i Blog</h2>
                            <p>{data.length === 0 ? "Nessun risultato trovato" : `Risultati trovati: ${data.length}`}</p>
                        </Col>
                    }

                    {data &&
                        data.map((el) => (
                            <Col md={6} xs={12} key={el._id}>
                                <SingleBlogPost key={el._id}
                                    id={el._id}
                                    category={el.category}
                                    title={el.title}
                                    cover={el.cover}
                                    timeValue={el.readTime.value}
                                    timeUnit={el.readTime.unit}
                                    authorName={el.author ? el.author.nome : "Nome Autore Non Disponibile"}
                                    authorLastName={el.author ? el.author.cognome : "Cognome Autore Non Disponibile"}
                                    authorAvatar={el.author ? el.author.avatar : "URL Autore Non Disponibile"}
                                    content={el.content}

                                />
                            </Col>))}

                </Row>
            </Container >
        </>
    )
}
