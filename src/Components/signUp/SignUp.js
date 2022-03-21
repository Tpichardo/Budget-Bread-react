import React from 'react';
import { signUp } from '../../util/firebase';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import './SignUp.scss';



const SignUp = () => {
    let emailRef = useRef();
    let passwordRef = useRef();
    let confirmPasswordRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    //this will return a promise because it will make an API call to firebase API
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError('Passwords do not match.');
        };

        try {
            setError('');
            setLoading(true);
            await signUp(emailRef.current.value, passwordRef.current.value);
        } catch (error) {
            const { code } = error;

            if (code === 'auth/invalid-email') {
                setError('Unable to create an account. The provided email is invalid.');
            } else if (code === 'auth/email-already-in-use') {
                setError('Unable to create an account. The provided email is already in use.');
            } else {
                const fbErrorMessage = error.message.split(' ').filter(word => {
                    return word !== 'Firebase:' &&
                        word !== '(auth/weak-password).' &&
                        word !== '(auth/email-already-exists).'
                }).join(' ');

                setError(`Unable to create an account. ${fbErrorMessage}.`);
            }
        }
        setLoading(false);
    };

    return (
        <Card className='signUp'>
            <Card.Body>
                <h3 className='signUp__greeting'>Sign Up</h3>
                {error && <Alert variant='danger'>{error}</Alert>}
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
                            placeholder='password must be at least 6 characters'
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
                    <div className="signUp__BtnDiv">
                        <Button className='signUp__Btn' disabled={loading} type='submit' variant='primary'>Sign Up</Button>
                    </div>
                </Form>
                <p className='signUp__signIn'>Already have an account? <Link to='/signin' className='authenticate'>Sign in</Link></p>
            </Card.Body>
        </Card>


    )
}

export default SignUp;