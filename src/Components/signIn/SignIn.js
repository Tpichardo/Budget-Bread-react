import React from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import './SignIn.scss'

const SignIn = () => {
    return (
        <Card className='signIn'>
            <h3 className='signIn__greeting'>Welcome Back!</h3>
            <Card.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='example@gmail.com'
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='password'
                            rewuired
                        />
                    </Form.Group>
                    <div className='signIn__BtnDiv'>
                        <Button className='signIn__Btn' type='submit' variant='primary'>Log In</Button>
                    </div>
                </Form>
            </Card.Body>
            <p className='signIn__signUp'>Don't have an account? <Link to='/signup' k>Sign Up</Link></p>
        </Card>
    );
}

export default SignIn;