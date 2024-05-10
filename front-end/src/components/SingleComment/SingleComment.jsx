import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { BsFillPencilFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";

export default function SingleComment({ comment, avatar, authorName, authorLastName, deleteComment, modifyComment, commentId, authorId, currentUser }) {

    const [editComment, setEditComment] = useState(false);

    useEffect(() => {
        console.log(authorId);
        console.log(currentUser._id)
        if (authorId === currentUser._id) {
            setEditComment(true)
        }
    }, [])


    return (
        <>
            <div className='my-2'>
                <div className='d-flex align-items-center'>
                    <img src={avatar ? avatar : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAL0AyAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwQFAQIH/8QAMhABAAIBAwIDBAgHAAAAAAAAAAECAwQRITFBElFxBTJCgRMUIiNSYaHhNENykZKxwf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/APqgCoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAivqMVJ5vHy5BKK/13D52/xeq6rDP8zb1jYEw5W9b+7aLekugAAAAAAAAAAAAAAAAAAeqvn1VMUzWI8V/KOzzrdROOPo8fFpjeZ8mfv+vUgly6jJl9632fwx0Q7OhAAIEcdOPRdwayJ2rljw7fF2Ugg2u0THSe4paDNM/d27RwugAAAAAAAAAAAAAAOuPOW22K894iQZefJ9Jntbtvt8kYKAAAAAAJdLfw6mkz3mIarHxbRlpM9ItDYQAAAAAAAAAAAAAAEWo/h8n9MpXjJHix3jzjYGQAoAAAAAAbtqOjGiN5iGzG/wAkAAAAAAAAAAAAAABV1+/0MbT3jdaQa2N9NO3baQZgCgAAAAABu09Hv9Xrv+f+2Y1dPXw4McT5IJQAAAAAAAAAAAAAHjJWbYr1jras7PYDGmtqztas1n84cXfaVZ+7t12md1JaAAAAAAPVMdrzEVjflsbcRHkraCu2Dfbm0ysoAAAAAAAAAAAAAAAAI8+P6XDNI67RMerJmJidp4mOJj820zvaFYjPEx8Uc/3BWAUAAHaVm9opXrM7OLPs+InNO/av/QaFaRWsVjpERDoIAAAAAAAAAAAAAAAHIDN19t88R5V5es2svMzXHM0iJ6qszM9Z3nzIACgAAs6CdtRt+KvCs7EzExMcTANnkZ+HWXiYrk+3Ez1aHKAAAAAAAAAAAG/7osmoxY/evHy5BKb+XPop319elKzPrwr5NVlycTbaPKvBBfy6jHiifFaPSFTNrL3+zXetf1Ve+/cjggAKAAAAAAC1h1l6fZtvav6qp1SDVxajHliPDaPSUu+3Xj1Yvffumx6rLj4i28eVuSDUFOmvr0vWY9OU+PUYsnu3j58EEob/ALAAADze8UrNrcVh6UfaN58VafDtE7Ai1Gqvl3rEzWnaPNXiNnegQAFAAAAAAAAAAAAAAByY3dAT6fVXxbVmZtTvHk0aXi9YtXmssdc9nXnxWp8O0zsgvAA//9k="}
                        alt=""
                        style={{ width: "30px", height: "30px", borderRadius: "50%" }} />

                    <h6 className='ms-3 mt-1'>{authorName} {authorLastName}</h6>
                </div>

                <div className='d-flex justify-content-between align-items-center'>
                    <div>{comment}</div>
                    {editComment &&
                        <div>
                            <Button variant='transparent' onClick={() => modifyComment(commentId, authorId)}>
                                <BsFillPencilFill />
                            </Button>
                            <Button variant='transparent' onClick={() => deleteComment(commentId, authorId)}>
                                <FaTrash />
                            </Button>
                        </div>

                    }
                </div>
            </div>

        </>
    )
}
