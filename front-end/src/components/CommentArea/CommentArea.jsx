import React, { useEffect, useState } from 'react';
import SingleComment from '../SingleComment/SingleComment';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



export default function CommentArea({ id }) {

    const [data, setData] = useState([]);

    const [text, setText] = useState("");
    const [user, setUser] = useState([]);

    const [mod, setMod] = useState(false);

    const [commentId, setCommentId] = useState("");
    const [authorId, setAuthorId] = useState("");

    const navigate = useNavigate();

    const endpoint = `http://localhost:3001/api/blogPosts/${id}/comments`;

    const endpointPOST = `http://localhost:3001/api/blogPosts/${id}`;


    const token = localStorage.getItem("token");

    const getFromApi = async () => {
        try {
            const response = await fetch(endpoint);
            if (response.ok) {
                const results = await response.json();
                setData(results)
                console.log(results)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getFromApi()
    }, [])

    useEffect(() => {
        const stor = localStorage.getItem("user");
        if (stor) {
            const userOk = JSON.parse(stor);
            setUser(userOk)
        }
    }, [])


    const addComment = async (e) => {
        e.preventDefault();
        // if (user._id === authorId) {
        try {
            const payload = {
                "text": text
            };
            const res = await fetch(endpointPOST, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                const posted = await res.json();
                console.log(posted);
                getFromApi();
                setText("");
            }
        } catch (error) {
            console.error(error)
        }

        // } else {
        //     navigate("/signIn")
        // }
    }

    const deleteComment = async (commentId, authorId) => {
        if (user._id === authorId) {
            try {
                const res = await fetch(`${endpoint}/${commentId}`, {
                    method: "DELETE",
                    headers:
                    {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (res.ok) {
                    const deleted = await res.json();
                    console.log(deleted);
                    getFromApi()
                }
            } catch (error) {
                console.error(error)
            }

        } else {
            console.log("Non sei autorizzato a gestire questo commento")
        }

    }

    const modifyComment = (idComment, authorId) => {
        setCommentId(idComment);
        setAuthorId(authorId);
        setMod(true);
    }

    const handleModifyComment = async (e) => {
        e.preventDefault();
        if (user._id === authorId) {
            try {
                const payload = {
                    "text": text
                };

                const res = await fetch(`${endpoint}/${commentId}`, {
                    method: "PUT",
                    headers:
                    {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(payload)
                });
                if (res.ok) {
                    const modified = await res.json();
                    console.log(modified);
                    getFromApi();
                    setText("");
                    setMod(false);
                }
            } catch (error) {
                console.error(error)
            }

        }
    }

    return (
        <>
            <div className='my-3'>
                {data &&
                    data.map((el) => <SingleComment key={el._id}
                        comment={el.text}
                        avatar={el.author ? el.author.avatar : null}
                        authorName={el.author ? el.author.nome : null}
                        authorLastName={el.author ? el.author.cognome : null}
                        commentId={el._id}
                        authorId={el.author ? el.author._id : null}
                        deleteComment={deleteComment}
                        currentUser={user}
                        modifyComment={modifyComment} />)}

                <div className='d-flex align-items-center'>
                    <img src={user.avatar ? user.avatar : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAL0AyAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwQFAQIH/8QAMhABAAIBAwIDBAgHAAAAAAAAAAECAwQRITFBElFxBTJCgRMUIiNSYaHhNENykZKxwf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/APqgCoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAivqMVJ5vHy5BKK/13D52/xeq6rDP8zb1jYEw5W9b+7aLekugAAAAAAAAAAAAAAAAAAeqvn1VMUzWI8V/KOzzrdROOPo8fFpjeZ8mfv+vUgly6jJl9632fwx0Q7OhAAIEcdOPRdwayJ2rljw7fF2Ugg2u0THSe4paDNM/d27RwugAAAAAAAAAAAAAAOuPOW22K894iQZefJ9Jntbtvt8kYKAAAAAAJdLfw6mkz3mIarHxbRlpM9ItDYQAAAAAAAAAAAAAAEWo/h8n9MpXjJHix3jzjYGQAoAAAAAAbtqOjGiN5iGzG/wAkAAAAAAAAAAAAAABV1+/0MbT3jdaQa2N9NO3baQZgCgAAAAABu09Hv9Xrv+f+2Y1dPXw4McT5IJQAAAAAAAAAAAAAHjJWbYr1jras7PYDGmtqztas1n84cXfaVZ+7t12md1JaAAAAAAPVMdrzEVjflsbcRHkraCu2Dfbm0ysoAAAAAAAAAAAAAAAAI8+P6XDNI67RMerJmJidp4mOJj820zvaFYjPEx8Uc/3BWAUAAHaVm9opXrM7OLPs+InNO/av/QaFaRWsVjpERDoIAAAAAAAAAAAAAAAHIDN19t88R5V5es2svMzXHM0iJ6qszM9Z3nzIACgAAs6CdtRt+KvCs7EzExMcTANnkZ+HWXiYrk+3Ez1aHKAAAAAAAAAAAG/7osmoxY/evHy5BKb+XPop319elKzPrwr5NVlycTbaPKvBBfy6jHiifFaPSFTNrL3+zXetf1Ve+/cjggAKAAAAAAC1h1l6fZtvav6qp1SDVxajHliPDaPSUu+3Xj1Yvffumx6rLj4i28eVuSDUFOmvr0vWY9OU+PUYsnu3j58EEob/ALAAADze8UrNrcVh6UfaN58VafDtE7Ai1Gqvl3rEzWnaPNXiNnegQAFAAAAAAAAAAAAAAByY3dAT6fVXxbVmZtTvHk0aXi9YtXmssdc9nXnxWp8O0zsgvAA//9k="}
                        alt=""
                        style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                        className='me-2' />
                    <Form.Control type='text' className='flex-grow-1' placeholder='Inserisci un commento' required value={text} onChange={(e) => setText(e.target.value)}>
                    </Form.Control>
                    {mod ? (
                        <Button variant='primary' type='submit' onClick={(e) => handleModifyComment(e)}>Modifica</Button>)
                        :
                        (<Button variant='outline-dark' type='submit' onClick={(e) => addComment(e)}>Commenta</Button>)
                    }
                </div>
            </div>
        </>
    )
}
