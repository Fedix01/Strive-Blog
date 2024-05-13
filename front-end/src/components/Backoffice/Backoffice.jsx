import React, { useEffect, useState, useRef, useContext } from 'react';
import MyNavbar from '../MyNavbar/MyNavbar';
import AddBlogPost from '../AddBlogPost/AddBlogPost';
import AddAuthor from '../AddAuthor/AddAuthor';
import TableBackoffice from '../TableBackoffice/TableBackoffice';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { alertContext } from '../AlertProvider/AlertProvider';
import UserProfile from '../UserProfile/UserProfile';
import { GoogleContext } from '../GoogleUserProvider/GoogleUserProvider';


export default function Backoffice() {

    const [id, setId] = useState("");

    const [data, setData] = useState([]);

    const { alert, setAlert } = useContext(alertContext);

    const { googleUser } = useContext(GoogleContext);

    const endpoint = "http://localhost:3001/api/blogPosts";

    const ref = useRef(null);

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const handleScroll = () => {
        return ref.current.scrollIntoView({ behavior: 'smooth' })
    }

    const getFromApi = async (user) => {
        try {
            const response = await fetch(endpoint);
            if (response.ok) {
                const results = await response.json();
                const filtered = results.filter((el) => {
                    return (el.author && el.author._id) && el.author._id.includes(user?._id)
                });
                return filtered;
            }
        } catch (error) {
            console.error(error);
            return [];
        }
    }


    useEffect(() => {
        console.log(data);
    }, [data]);

    useEffect(() => {
        // Utilizza una variabile locale per visualizzare il risultato corretto
        const fetchData = async () => {
            const user = localStorage.getItem("user");
            const googleUser = localStorage.getItem("googleUser");
            if (user || googleUser) {
                const newUser = JSON.parse(user || googleUser);
                const filteredData = await getFromApi(newUser);
                setData(filteredData);
            } else {
                navigate("/signUp");
                setAlert("Per scrivere un nuovo Blog devi effettuare il login");
                setTimeout(() => {
                    setAlert("")
                }, 4000);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <MyNavbar />
            <Container>
                <AddBlogPost id={id} getFromApi={getFromApi} reference={ref} open={open} setOpen={setOpen} />
                {data.length > 0 ?

                    <TableBackoffice setId={setId} data={data} setData={setData} getFromApi={getFromApi} handleScroll={handleScroll} setOpen={setOpen} />
                    :
                    <div>Nessun contenuto, puoi aggiungere post</div>
                }

            </Container>
        </>
    )
}
