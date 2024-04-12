import React from 'react';
import MyNavbar from '../MyNavbar/MyNavbar';
import MyFooter from '../MyFooter/MyFooter';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function Homepage() {
    const navigate = useNavigate()

    return (
        <>
            <MyNavbar />
            <div>
                <h2>Benvenuto nella Homepage...</h2>
            </div>
            <div>
                <Button variant="primary" onClick={() => navigate("/authors")}>Vai alla pagina Autori</Button>
                <Button variant='secondary' className='ms-3' onClick={() => navigate("/blogPosts")}>Vai alla pagina Blog Posts</Button>
            </div>
            <MyFooter />
        </>
    )
}
