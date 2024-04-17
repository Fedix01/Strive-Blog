import React from 'react'
import { Container } from 'react-bootstrap'

export default function NotFound() {
    return (
        <Container style={{ marginTop: "30vh" }}>
            <div className='d-flex'>
                <div>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0dIO6EQrOXxyEce-wNgnnrr2o0ZN1hPp82Q&usqp=CAU" alt="" />
                </div>
                <div>
                    <h2>Error 404 Page Not Found</h2>
                    <ul>
                        <li>A misspelled URL</li>
                        <li>The page has been moved or deleted and there's no redirect set up</li>
                        <li>The URL wasn't correct when it was originally set up or it was linked incorretly</li>
                        <li>The server malfunctioned or has been shut down</li>
                    </ul>
                </div>
            </div>
        </Container>
    )
}