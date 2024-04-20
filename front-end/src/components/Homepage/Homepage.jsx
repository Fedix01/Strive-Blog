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
            <div className="container col-xxl-8 px-4 py-5">
                <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                    <div className="col-10 col-sm-8 col-lg-6">
                        <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8anBnJTIwYmxvZ3xlbnwwfHwwfHx8MA%3D%3D" alt="" />
                    </div>
                    <div className="col-lg-6">
                        <h1 className="display-5 fw-bold lh-1 mb-3">Responsive left-aligned hero with image</h1>
                        <p className="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                            <Button variant="primary" className='btn-lg px-4 me-md-2' onClick={() => navigate("/authors")}>Vai alla pagina Autori</Button>
                            <Button variant='secondary' className='btn-lg px-4' onClick={() => navigate("/blogPosts")}>Vai alla pagina Blog Posts</Button>
                        </div>
                    </div>
                </div>
            </div>
            <MyFooter />
        </>
    )
}
