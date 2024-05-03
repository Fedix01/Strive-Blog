import React, { useEffect, useState, useRef, useContext } from 'react';
import MyNavbar from '../MyNavbar/MyNavbar';
import AddBlogPost from '../AddBlogPost/AddBlogPost';
import AddAuthor from '../AddAuthor/AddAuthor';
import TableBackoffice from '../TableBackoffice/TableBackoffice';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { alertContext } from '../AlertProvider/AlertProvider';


export default function Backoffice() {

    const [id, setId] = useState("");

    const [data, setData] = useState([]);

    const { alert, setAlert } = useContext(alertContext);

    const endpoint = "http://localhost:3001/api/blogPosts";

    const ref = useRef(null);

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const handleScroll = () => {
        return ref.current.scrollIntoView({ behavior: 'smooth' })
    }

    const getFromApi = async () => {
        try {
            const response = await fetch(endpoint);
            if (response.ok) {
                const results = await response.json();
                setData(results);
                console.log("fetch get ok")
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            getFromApi()
        } else {
            setAlert("Per scrivere un nuovo post devi fare il login")
            setTimeout(() => {
                setAlert("")
            }, 4000);
            navigate("/signUp")
        }
    }, [])


    return (
        <>
            <MyNavbar />
            <Container>
                <AddBlogPost id={id} getFromApi={getFromApi} reference={ref} open={open} setOpen={setOpen} />
                {/* <TableBackoffice setId={setId} data={data} setData={setData} getFromApi={getFromApi} handleScroll={handleScroll} setOpen={setOpen} /> */}
                {/* <AddAuthor /> */}
            </Container>
        </>
    )
}
