import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { apiURL } from '../../util/apiURL';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';


function NewTransactionForm() {
    let history = useHistory();
    const API = apiURL();

    const [transaction, setTransaction] = useState({
        date: "",
        name: "",
        amount: 0,
        from: ""
    });

    const addTransaction = (newTransaction) => {
        axios.post(`${API}/transactions`, newTransaction)
            .then((response) => {
                history.push('/transactions')
            }).catch((e) => {
                console.log(e)
            })
    }

    const handleChange = (e) => {
        setTransaction({ ...transaction, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addTransaction(transaction)
    }


    return (
        <Container>
            <h1>Add New Transaction</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        value={transaction.date}
                        type="date"
                        required
                        onChange={handleChange}
                        placeholder="Date"
                    />
                </Form.Group>

                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        value={transaction.name}
                        type="text"
                        required
                        onChange={handleChange}
                        placeholder="Name"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Amount</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="amount">$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            aria-label="Amount"
                            id="amount"
                            value={transaction.amount}
                            type="number"
                            required
                            onChange={handleChange}
                        />
                        <InputGroup.Append>
                            <InputGroup.Text>.00</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>

                <Form.Group controlId="from">
                    <Form.Label>From</Form.Label>
                    <Form.Control
                        value={transaction.from}
                        type="text"
                        required
                        onChange={handleChange}
                        placeholder="Description of where transaction came from"
                        as="textarea"
                        rows={3}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default withRouter(NewTransactionForm);