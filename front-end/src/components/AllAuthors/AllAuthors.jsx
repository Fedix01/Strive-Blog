import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';

export default function AllAuthors() {
    const [data, setData] = useState([]);

    const endpoint = "http://localhost:3001"

    const getFromApi = async () => {
        try {
            let res = await fetch(endpoint);
            if (res.ok) {
                let result = await res.json();
                setData(result);
                console.log(result)
            }
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        getFromApi()
    }, [])

    return (
        <div className='mt-3'>
            <Container>
                <h4>Tutti gli autori</h4>
            </Container>
        </div>
    )
}
