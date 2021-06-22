import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { apiURL } from '../util/apiURL';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

const API = apiURL()

function EditTransactionForm(props) {
    let { index } = useParams()
    let history = useHistory()

    const [transaction, setTransaction] = useState({
        date: "",
        name: "",
        amount: 0,
        from: ""
    })

    const handleChange = (e) => {
        setTransaction({ ...transaction, [e.target.id]: e.target.value });
    }

    //This allows the form to be pre-filled with the Transaction data
    useEffect(() => {
        axios.get(`${API}/transactions/${index}`)
            .then((response) => {
                const { data } = response
                setTransaction(data)
            }).catch((e) => {
                console.log(e)
                history.push('/not-found')
            })
    }, [index, history])

    const handleSubmit = (e) => {
        e.preventDefault()
        props.updateTransaction(transaction, index)
        history.push(`/transactions/${index}`)
    };

    return (
        <div>
            <h1>Edit Transaction</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        id="date"
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
                        id="name"
                        value={transaction.name}
                        type="text"
                        required
                        onChange={handleChange}
                        placeholder="Name"
                    />
                </Form.Group>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="amount">$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                        aria-label="Amount (to the nearest dollar)"
                        id="amount"
                        value={transaction.amount}
                        type="number"
                        required
                        onChange={handleChange}
                        placeholder="Amount"
                    />
                    <InputGroup.Append>
                        <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                <Form.Group controlId="from">
                    <Form.Label>From</Form.Label>
                    <Form.Control
                        id="from"
                        value={transaction.from}
                        type="text"
                        required
                        onChange={handleChange}
                        placeholder="Description of where transaction came from"
                        as="textarea"
                        rows={3} />
                </Form.Group>
                <Button variant='outline-primary' type='submit'>
                    Submit Change
                </Button>
            </Form>
            <br />
            <Link to={`/transactions/${index}`}>
                <Button variant='outline-primary'>
                    Back
                </Button>
            </Link>
        </div>
    )
}

export default EditTransactionForm;