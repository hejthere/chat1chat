import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Form , Card , Alert , Image, Row , Col, Container} from 'react-bootstrap'; 
import { useAuth } from '../AuthContext'
import loginPic from '../picture/login.jpg'
import './login.css'


export default function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const history = useHistory()
    const [error, setError] = useState()
    const { currentUser } = useAuth()

    const { login } = useAuth()

    async function handleLogin (e) {
    e.preventDefault() 
    try{
    await login(emailRef.current.value, passwordRef.current.value)
    history.push('/home')
    console.log(currentUser)}
    catch{
    setError('Fail to log in')
    }
    }
    

    return (
        <Container className='login-container'>
        <Row sm={1} xs={1} md={2} xl={2} fluid>
        <Col>
        <Image src={loginPic} fluid />
        </Col>
        <Col>
        <div className='w-100'  style={{maxWidth:'700px'}}>
        <h1>Log In</h1>
        <Card>
        <Card.Body>
         <Form onSubmit={handleLogin}> 
         {error && <Alert variant='danger'>{error}</Alert>}
             <Form.Group> 
                 <Form.Label>Email</Form.Label>
                 <Form.Control type='email' ref={emailRef} placeholder='Enter email' />
             </Form.Group>
             <Form.Group>
             <Form.Label>Password</Form.Label>
                 <Form.Control type='password' ref={passwordRef} placeholder='Enter password' />
             </Form.Group>
             <Button type='submit'>Log In</Button>
             <div className='my-3'>Haven't sign up yet ? <Link to='/signup'>Sign up here</Link></div>
        </Form>
        </Card.Body>
        </Card>
        </div>
        </Col>
        </Row>
        </Container>
    )
}
