import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import SingleAuthor from '../SingleAuthor/SingleAuthor';
import MyNavbar from '../MyNavbar/MyNavbar';
import MyFooter from '../MyFooter/MyFooter';
import { SearchBarContext } from '../SearchBarProvider/SearchBarProvider';

export default function AllAuthors() {
    const [data, setData] = useState([]);

    const endpoint = "http://localhost:3001/api/authors";

    const [searchAuthors, setSearchAuthors] = useState("");

    const { setSearchBar } = useContext(SearchBarContext);


    const getFromApi = async () => {
        try {
            const res = await fetch(endpoint);
            if (res.ok) {
                const results = await res.json();
                setData(results);
                console.log(results)
            }
        } catch (error) {
            console.error(error)
        }
    };

    const filteredAuthors = () => {
        if (searchAuthors) {
            const filtered = data.filter((el) => el.nome.toLowerCase().includes(searchAuthors.toLowerCase()));
            setData(filtered)
        } else {
            getFromApi()
        }
    }


    useEffect(() => {
        setSearchBar(false);
        getFromApi()
    }, [])

    useEffect(() => {
        filteredAuthors()
    }, [searchAuthors])



    return (
        <>

            <MyNavbar setSearchAuthors={setSearchAuthors} searchAuthors={searchAuthors} authorPage={true} />
            <div className='mt-3'>

                <Container>

                    <Row>
                        <Col md={12} className='mt-3 mb-2'>
                            <h2>Tutti gli autori</h2>
                            <p>{data.length === 0 ? "Nessun risultato trovato" : `Risultati trovati: ${data.length}`}</p>
                        </Col>
                    </Row>
                    <Row>

                        {data &&
                            data.map((el) => (
                                <Col md={4} key={el._id}>
                                    <SingleAuthor key={el._id}
                                        id={el._id}
                                        name={el.nome}
                                        surname={el.cognome}
                                        email={el.email}
                                        birth={el.dataDiNascita}
                                        avatar={el.avatar} />
                                </Col>))}

                    </Row>
                </Container>
            </div>
            <MyFooter />
        </>
    )
}
