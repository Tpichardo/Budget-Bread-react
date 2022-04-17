import React from 'react';
import { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js'
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import './SignIn.scss'

const SignIn = () => {
    let emailRef = useRef();
    let passwordRef = useRef();
    const [error, setEror] = useState('');
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setEror('');
            setLoading(true);
            await signIn(emailRef.current.value, passwordRef.current.value);
            history.push('/user');
        } catch (error) {
            console.log(error)
            setEror('Failed to sign in.')
        }
        setLoading(false);
    }


    return (
        <Container>
            <Card className='signIn'>
                <h3 className='signIn__greeting'>Welcome Back!</h3>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='example@gmail.com'
                                ref={emailRef}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='password'
                                ref={passwordRef}
                                rewuired
                            />
                        </Form.Group>
                        <div className='signIn__BtnDiv'>
                            <Button disabled={loading} className='signIn__Btn' type='submit' variant='primary'>Log In</Button>
                        </div>
                    </Form>
                </Card.Body>
                <p className='signIn__signUp'>Don't have an account? <Link to='/signup' k>Sign Up</Link></p>
            </Card>
        </Container>
    );
}

export default SignIn;