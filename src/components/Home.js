import React, { useRef } from 'react';
import { useAuth } from '../AuthContext'
import { Button, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { Card, Container } from 'react-bootstrap'
import './login.css'

export default function Home() {

    const { currentUser } = useAuth()
    const { signOut } = useAuth()
    const { commentDatabase } = useAuth()
    const { addComment } = useAuth()
    const history = useHistory()
    const commentRef = useRef()

    async function signOutHandler() {
        await signOut()
        history.push('/')
    }

    const submitComment = () => {
        addComment(`${currentUser.email}: ${commentRef.current.value}`)
        commentRef.current.value = '';
    }

    let commentKey = Object.keys(commentDatabase);
    console.log(currentUser)
    return (
        <Container className='outer-box' fluid="true">
            <Row className='container-box1' fluid="true"></Row>
            <Row className='container-box2' fluid="true"></Row>
            <h1 className='w-100 pl-2'>HomePage </h1>
            <div className='pl-2 typing-effect'>
                <h3 >Hey {currentUser.email} ! </h3></div>
            <Card className='my-3 p-2'>
                <Card.Body className='comment-box'>
                    <h3>&nbsp;Discussion Board</h3>
                    {commentKey.length > 0 ? (commentKey.map(key => (
                        <div className='comment' style={{ backgroundColor: commentDatabase[key].UserAndComment.includes(`${currentUser.email}`) ? ' rgb(172, 209, 209, 0.4)' : 'white' }}
                            key={key}>
                            {commentDatabase[key].UserAndComment}
                        </div>))) : null}
                </Card.Body>
            </Card>



            <input ref={commentRef} placeholder='Share your thought' /> &nbsp;
            <Button onClick={submitComment} variant='outline-primary' size='sm'>Send</Button>


            <br />

            <Button className='mt-3' onClick={signOutHandler}>Sign Out</Button>

        </Container>
    )
}
