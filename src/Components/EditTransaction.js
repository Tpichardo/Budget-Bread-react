import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiURL } from '../util/apiURL';
import { Form, Button, Container, InputGroup } from 'react-bootstrap';

const API = apiURL();

function EditTransactionForm() {
    let history = useHistory();
    const { id } = useParams();
    const { currentUser } = useAuth();

    const [transaction, setTransaction] = useState({
        current_user_id: currentUser.uid,
        transaction_date: "",
        transaction_name: "",
        transaction_type: "",
        transaction_amount: 0,
        transaction_vendor: ""
    })

    const handleChange = (e) => {
        setTransaction({ ...transaction, [e.target.id]: e.target.value });
    }

    //This allows the form to be pre-filled with the Transaction data
    useEffect(() => {
        axios.get(`${API}/transactions/${id}`)
            .then((response) => {
                const { data } = response;
                setTransaction(data);
            }).catch((e) => {
                console.log(e)
                history.push('/not-found')
            })
    }, [id, history])


    const updateTransaction = async (updatedTransaction) => {
        try {
            await axios.put(`${API}/transactions/${id}`, updatedTransaction)
                .then(() => {
                    history.push(`/transactions/${id}`);
                })
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        updateTransaction(transaction, id);
    };

    return (
        <Container>
            <h1>Edit Transaction</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="transaction_date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        value={transaction.transaction_date}
                        type="date"
                        required
                        onChange={handleChange}
                        placeholder="Date"
                    />
                </Form.Group>
                <Form.Group controlId="transaction_name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        value={transaction.transaction_name}
                        type="text"
                        required
                        onChange={handleChange}
                        placeholder="Transaction name"
                    />
                </Form.Group>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="transaction_amount">$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                        aria-label="Amount (to the nearest dollar)"
                        id="transaction_amount"
                        value={transaction.transaction_amount}
                        type="number"
                        required
                        onChange={handleChange}
                    />
                    <InputGroup.Append>
                        <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                <Form.Group controlId="transaction_vendor">
                    <Form.Label>From</Form.Label>
                    <Form.Control
                        value={transaction.transaction_vendor}
                        type="text"
                        required
                        onChange={handleChange}
                        placeholder="Description of where transaction came from"
                        as="textarea"
                        rows={3} />
                </Form.Group>
                <Button variant='primary' type='submit'>
                    Submit Change
                </Button>
            </Form>
            <br />
            <Link to={`/transactions/${id}`}>
                <Button variant='primary'>
                    Back
                </Button>
            </Link>
        </Container>

    )
}

export default EditTransactionForm;