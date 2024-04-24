import React from 'react';
import { Button } from 'react-bootstrap';
import { TiPencil } from "react-icons/ti";
import { MdOutlineDeleteOutline } from "react-icons/md";

export default function SingleRow(props) {

    const { author, category, title, index, deleteBlog, id, setId, handleScroll, setOpen } = props;

    const handleModify = () => {
        setId(id);
        handleScroll();
        setOpen(true)
    }

    return (
        <>
            <tr>
                <td>{index}</td>
                <td>{author}</td>
                <td>{title}</td>
                <td>{category}</td>
                <td>
                    <Button variant='primary' onClick={() => handleModify()}>
                        <TiPencil />
                    </Button>
                    <Button variant='danger' onClick={() => deleteBlog(id)}>
                        <MdOutlineDeleteOutline />
                    </Button>
                </td>
            </tr>
        </>
    )
}
