import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import SingleRow from '../SingleRow/SingleRow';

export default function TableBackoffice({ setId, data, getFromApi, handleScroll, setOpen }) {

    const endpoint = "http://localhost:3001/api/blogPosts";


    const deleteBlog = async (id) => {
        try {
            let res = await fetch(`${endpoint}/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "Application/json" },

            });
            if (res.ok) {
                getFromApi();
                // setAlert("Blog post cancellato correttamente");
                // setInterval(() => {
                //     setAlert("")
                // }, 3000);
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

                {data &&
                    data.map((el, index) => <SingleRow
                        key={el._id}
                        id={el._id}
                        index={index + 1}
                        author={el.author.name}
                        title={el.title}
                        category={el.category}
                        deleteBlog={deleteBlog}
                        setId={setId}
                        handleScroll={handleScroll}
                        setOpen={setOpen} />)}

            </tbody>
        </Table>
    );
}
