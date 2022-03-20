import React from 'react';
import { signUp } from '../firebase';
import { useRef } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';



const SignUp = () => {
    let emailRef = useRef();
    let passwordRef = useRef();
    let confirmPasswordRef = useRef();


    //this will return a promise because it will make an API call to firebase API
    const handleSubmit = async (e) => {
        await signUp(emailRef.current.value, passwordRef.current.value);
        e.preventDefault();
    }

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type='email'
                                ref={emailRef}
                                placeholder="example@gmail.com"
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type='password'
                                ref={passwordRef}
                                placeholder='password'
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Confirm Password:</Form.Label>
                            <Form.Control
                                type='password'
                                ref={confirmPasswordRef}
                                placeholder="confirm password"
                                required
                            />
                        </Form.Group>
                        <Button type='submit' variant='primary'>Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <h3 className='text-center'>Already have an account? Sign in</h3>
        </Container>
    )
}

export default SignUp;