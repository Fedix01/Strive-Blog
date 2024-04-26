import React from 'react'
import { Button, InputGroup, Form } from 'react-bootstrap';
import './AllTopics.css';
import { IoIosSearch } from "react-icons/io";

export default function AllTopics({ setFilteredTopic, filteredTopic, searchTopic, setSearchTopic }) {

    const handleTopics = (topic) => {
        if (topic === "Esplora topic") {
            setFilteredTopic("")
        }
        setFilteredTopic("");
        setFilteredTopic(topic)
    }
    return (
        <>
            <div className='mt-4'>
                <button className='btn topic mx-1' value={'Esplora topic'} onClick={(e) => handleTopics(e.target.value)}>Esplora Topic</button>
                <button className='btn topic mx-1' value={'Programmazione'} onClick={(e) => handleTopics(e.target.value)}>Programmazione</button>
                <button className='btn topic mx-1' value={'Tecnologia'} onClick={(e) => handleTopics(e.target.value)}>Tecnologia</button>
                <button className='btn topic mx-1' value={'corse'} onClick={(e) => handleTopics(e.target.value)}>corse</button>
                <button className='btn topic mx-1' value={'Prova2'} onClick={(e) => handleTopics(e.target.value)}>Prova2</button>
                <button className='btn topic mx-1' value={'Prova3'} onClick={(e) => handleTopics(e.target.value)}>Prova3</button>
            </div>

            <div>
                {(filteredTopic === "Esplora topic") &&
                    <>
                        <div className='d-flex justify-content-center mt-3'>
                            <h2>Esplora categoria</h2>
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
                    </>
                }

                {(filteredTopic !== "Esplora topic") &&
                    <div className='d-flex justify-content-center mt-3'>
                        <h2>{filteredTopic}</h2>
                    </div>
                }
            </div>
        </>
    )
}
