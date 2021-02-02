import React, {useRef , useState } from 'react'
import { Button, Form , Card, Alert, Container,Row, Col, Image } from 'react-bootstrap'; 
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import loginPic from '../picture/login.jpg'



export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const {signUp , currentUser} = useAuth()
    const [error , setError] = useState('')
    const history = useHistory()

    async function submitSignUp (e){
        e.preventDefault() 

        if ( passwordRef.current.value !== confirmPasswordRef.current.value) { 
        return setError('Password does not match!')
        }
        try{
        setError('')
        await signUp(emailRef.current.value, passwordRef.current.value)
        history.push('/home')
        }
        catch{
        setError('Failed to create account!')
        }} 

        console.log('sign up' + currentUser)


    return (
<Container className='login-container'>
<Row sm={1} xs={1} md={2} xl={2} fluid>
    <Col className='d-flex align-items-center'>
    <Image src={loginPic} fluid />
    </Col>
    <Col>
        <div className='w-100'  style={{maxWidth:'700px'}}>
        <h1>Sign up</h1>
        <Card>
        <Card.Body>
         <Form onSubmit={submitSignUp}> 
         {error && <Alert variant='danger'>{error}</Alert>}
             <Form.Group> 
                 <Form.Label>Email</Form.Label>
                 <Form.Control type='email' ref={emailRef} placeholder='Enter email' />
             </Form.Group>
             <Form.Group>
             <Form.Label>Password</Form.Label>
                 <Form.Control type='password' ref={passwordRef} placeholder='Enter password' />
             </Form.Group>
             <Form.Group>
             <Form.Label>Confirm Password</Form.Label>
                 <Form.Control type='password' ref={confirmPasswordRef} placeholder='Re-enter password' />
             </Form.Group>
             <Button type='submit'>Sign up</Button>
             <div className='my-3'>Already have an account ? <Link to='/'>Log in here</Link></div>
        </Form>
        </Card.Body>
        </Card>
        </div>
        </Col>
        </Row>
        </Container>
    )
    }