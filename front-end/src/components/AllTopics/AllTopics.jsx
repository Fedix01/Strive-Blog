import React from 'react'
import { Button, InputGroup, Form, Container } from 'react-bootstrap';
import './AllTopics.css';
import { IoIosSearch } from "react-icons/io";

export default function AllTopics({ setFilteredTopic, filteredTopic, searchTopic, setSearchTopic, getFromApi, filteredBtnTopic, exploreTopic }) {

    const handleTopics = (value) => {
        if (value === "Esplora topic") {
            setFilteredTopic("Esplora topic")
            exploreTopic()
        }
        else {
            setFilteredTopic(value);
            filteredBtnTopic(value);
        }
    }
    return (
        <>
            <Container>
                <div className='mt-4'>
                    <button className='btn topic mx-1' value={'Esplora topic'} onClick={(e) => handleTopics(e.target.value)}>Esplora Topics</button>
                    <button className='btn topic mx-1' value={'Programmazione'} onClick={(e) => handleTopics(e.target.value)}>Programmazione</button>
                    <button className='btn topic mx-1' value={'Tecnologia'} onClick={(e) => handleTopics(e.target.value)}>Tecnologia</button>
                    <button className='btn topic mx-1' value={'corse'} onClick={(e) => handleTopics(e.target.value)}>corse</button>
                    <button className='btn topic mx-1' value={'Prova2'} onClick={(e) => handleTopics(e.target.value)}>Prova2</button>
                    <button className='btn topic mx-1' value={'Prova3'} onClick={(e) => handleTopics(e.target.value)}>Prova3</button>
                </div>

                <div>
                    {(filteredTopic === "Esplora topic") &&
                        <>
                            <div className='d-flex justify-content-center my-5'>
                                <h2><b>Esplora in tutte le categorie</b></h2>
                            </div>

                            <div className='container-search mt-3'>
                                <InputGroup className="mb-3 search-bar-topic">
                                    <Form.Control
                                        className='input-topic'
                                        placeholder={`Cerca in tutti i topic`}
                                        onChange={(e) => setSearchTopic(e.target.value)}
                                        value={searchTopic}
                                    />
                                    <Button variant="outline-secondary" className='button-topic' id="button-addon2">
                                        <IoIosSearch style={{ fontSize: "35px" }} />
                                    </Button>
                                </InputGroup>
                            </div>
                            <hr />
                        </>
                    }

                    {(filteredTopic !== "Esplora topic") &&
                        <>
                            <div className='d-flex justify-content-center my-5'>
                                <h1>{filteredTopic}</h1>
                            </div>
                            <hr />
                        </>
                    }
                </div>
            </Container>
        </>
    )
}
