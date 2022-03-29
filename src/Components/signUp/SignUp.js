import React from 'react';
import { useRef, useState } from 'react';
import { useUserContext } from '../../context/UserContext.js';
import { Link } from 'react-router-dom';
import { Card, Form, Button, Alert, Container } from 'react-bootstrap';
import { auth } from '../../util/firebaseConfig.js'
import { updateProfile } from 'firebase/auth';
import './SignUp.scss';



const SignUp = () => {
    let emailRef = useRef();
    let passwordRef = useRef();
    let confirmPasswordRef = useRef();
    let nameRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signUp } = useUserContext();



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError('Passwords do not match.');
        };

        try {
            setError('');
            setLoading(true);
            await signUp(emailRef.current.value, passwordRef.current.value)
                .then(() => {
                    updateProfile(auth.currentUser, {
                        displayName: nameRef.current.value
                    })
                })
        } catch (error) {
            const { code } = error;

            if (code === 'auth/invalid-email') {
                setError('Unable to create an account. The provided email is invalid.');
            } else if (code === 'auth/email-already-in-use') {
                setError('Unable to create an account. The provided email is already in use.');
            } else {
                const fireErrorMessage = error.message.split(' ').filter(word => {
                    return word !== 'Firebase:' &&
                        word !== '(auth/weak-password).' &&
                        word !== '(auth/email-already-exists).'
                }).join(' ');

                setError(`Unable to create an account. ${fireErrorMessage}.`);
            }
        }
        setLoading(false);
    };

    return (
        <Container>
            <Card className='signUp'>
                <Card.Body>
                    <h3 className='signUp__greeting'>Sign Up</h3>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='displayName'>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                type='text'
                                ref={nameRef}
                                placeholder="name"
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type='email'
                                ref={emailRef}
                                placeholder="example@gmail.com"
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId='password'>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type='password'
                                ref={passwordRef}
                                placeholder='password must be at least 6 characters'
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId='confirmPassword'>
                            <Form.Label>Confirm Password:</Form.Label>
                            <Form.Control
                                type='password'
                                ref={confirmPasswordRef}
                                placeholder="confirm password"
                                required
                            />
                        </Form.Group>
                        <div className="signUp__BtnDiv">
                            <Button className='signUp__Btn' disabled={loading} type='submit' variant='primary'>Sign Up</Button>
                        </div>
                    </Form>
                    <p className='signUp__signIn'>Already have an account? <Link to='/signin' className='authenticate'>Sign in</Link></p>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default SignUp;