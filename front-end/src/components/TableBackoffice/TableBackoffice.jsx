import React, { useEffect, useContext } from 'react';
import { Table } from 'react-bootstrap';
import SingleRow from '../SingleRow/SingleRow';
import { alertContext } from '../AlertProvider/AlertProvider';
import { useNavigate } from 'react-router-dom';

export default function TableBackoffice({ setId, data, getFromApi, handleScroll, setOpen }) {

    const endpoint = "http://localhost:3001/api/blogPosts";

    const { alert, setAlert } = useContext(alertContext);

    const navigate = useNavigate();

    const deleteBlog = async (id) => {
        try {
            let res = await fetch(`${endpoint}/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "Application/json" },

            });
            if (res.ok) {
                getFromApi();
                setAlert("Blog post cancellato correttamente");
                setInterval(() => {
                    setAlert("")
                }, 4000);
                navigate("/")
                console.log("il blog post è stato cancellato")
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getFromApi()
    }, [])

    return (
        <Table striped>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Autore</th>
                    <th>Titolo</th>
                    <th>Categoria</th>
                    <th>Modifica/Cancella</th>
                </tr>
            </thead>
            <tbody>

                {data !== null ?
                    data.map((el, index) => <SingleRow
                        key={el._id}
                        id={el._id}
                        index={index + 1}
                        author={el.author ? (el.author.nome ? el.author.nome : "Nessun nome autore") : "Nessun autore"}
                        title={el.title}
                        category={el.category}
                        deleteBlog={deleteBlog}
                        setId={setId}
                        handleScroll={handleScroll}
                        setOpen={setOpen} />)
                    :
                    <>
                        <h2>Nessun dato</h2>
                    </>}

            </tbody>
        </Table>
    );
}
