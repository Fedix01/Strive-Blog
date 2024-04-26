import React from 'react'
import { Button } from 'react-bootstrap'

export default function SingleComment({ comment }) {
    return (
        <>
            <div className='d-flex justify-content-between align-items-center'>
                <div>{comment}</div>
                <div>
                    <Button variant='primary'></Button>
                    <Button variant='danger'></Button></div>
            </div>

        </>
    )
}
