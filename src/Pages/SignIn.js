import React from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';


const SignIn = () => {
    return (
        <Container>
            <Card>
                <h3>Welcome Back!</h3>
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
                        <Button type='submit' variant='primary'>Log In</Button>
                    </Form>
                </Card.Body>
            </Card>
            <Card>
                <h3>Don't have an account? <Link to='/signup' k>Sign Up</Link></h3>
            </Card>
        </Container>
    )
}

export default SignIn;