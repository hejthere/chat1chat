import React, { useRef, useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Button, Form, Card, Alert, Image, Row, Col, Container } from 'react-bootstrap';
import { useAuth } from '../AuthContext'
import loginPic from '../picture/login.jpg'
import './login.css'


export default function Login() {
    const location = useLocation()
    const emailRef = useRef()
    const passwordRef = useRef()
    const history = useHistory()
    const confirmPasswordRef = useRef()
    const { signUp, currentUser } = useAuth()
    const [error, setError] = useState()
    const [isLogin, setIsLogin] = useState(true)
    const { login } = useAuth()

    const formContent = [
        {
            id: 'email',
            label: 'Email',
            type: "email",
            ref: emailRef,
            placeholder: 'Enter email',

        },
        {

            id: 'password',
            label: 'Password',
            type: "password",
            ref: passwordRef,
            placeholder: 'Enter password'
        },
        {

            id: 'confirmPassword',
            label: 'Confirm Password',
            type: "password",
            ref: confirmPasswordRef,
            placeholder: 'Re-enter password'
        }
    ]
    const loginContent = formContent.filter(el => {
        return el.id !== "confirmPassword";
    })

    let displayForm = [];
    if (isLogin) {
        displayForm = loginContent.map(el => {
            return (
                <Form.Group key={el.id} >
                    <Form.Label>{el.label}</Form.Label>
                    <Form.Control type={el.type} ref={el.ref} placeholder={el.placeholder} />
                </Form.Group>)

        })
    } else {
        displayForm = formContent.map(el => {
            return (
                <Form.Group>
                    <Form.Label>{el.label}</Form.Label>
                    <Form.Control type={el.type} ref={el.ref} placeholder={el.placeholder} />
                </Form.Group>)
        })
    }

    useEffect(() => {
        if (location.pathname === '/signup') {
            setIsLogin(false)
        }
    }, [location]);

    async function handleLogin(e) {
        e.preventDefault()
        try {
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/home')
            console.log(currentUser)
        }
        catch {
            setError('Fail to log in')
        }
    }

    async function submitSignUp(e) {
        e.preventDefault()

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError('Password does not match!')
        }
        try {
            setError('')
            await signUp(emailRef.current.value, passwordRef.current.value)
            history.push('/home')
        }
        catch {
            setError('Failed to create account!')
        }
    }

    const switchPageHandler = () => {
        setIsLogin(!isLogin)
        setError()
    }


    return (
        <Container className='login-container'>
            <Row sm={1} xs={1} md={2} xl={2} fluid="true">
                <Col>
                    <Image src={loginPic} fluid="true" />
                </Col>
                <Col>
                    <div className='w-100' style={{ maxWidth: '700px' }}>
                        <h1>{isLogin ? 'Log In' : 'Sign In'}</h1>
                        <Card>
                            <Card.Body>
                                <Form onSubmit={isLogin ? handleLogin : submitSignUp}>
                                    {error && <Alert variant='danger'>{error}</Alert>}
                                    {displayForm}
                                    <Button type='submit'>{isLogin ? 'Log In' : 'Sign In'}</Button>
                                    <div className='my-3'>{isLogin ? "Haven't sign up yet ? " : "Already have an account ?"}<Link onClick={switchPageHandler} to={isLogin ? '/signup' : '/'}>{isLogin ? 'Sign up here' : 'Log in here'}</Link></div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
