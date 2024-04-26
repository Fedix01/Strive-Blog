import React, { useEffect, useState } from 'react';
import SingleComment from '../SingleComment/SingleComment';

export default function CommentArea({ id }) {

    const [data, setData] = useState([]);

    const endpoint = `http://localhost:3001/api/blogPosts/${id}/comments`;

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

    return (
        <>
            {data &&
                data.map((el) => <SingleComment key={el._id} comment={el.comment} />)}
        </>
    )
}
