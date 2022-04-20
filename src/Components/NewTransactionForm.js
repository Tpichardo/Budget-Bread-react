import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { apiURL } from '../util/apiURL';
import { Container, Form, Button, InputGroup, Card } from 'react-bootstrap';
import './newTransaction.scss'


function NewTransactionForm() {
    let history = useHistory();
    const API = apiURL();

    const [transaction, setTransaction] = useState({
        transactionDate: "",
        transactionName: "",
        type: "",
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
    };

    const handleChange = (e) => {
        setTransaction({ ...transaction, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        addTransaction(transaction)
    };


    return (
        <Container className='newTransaction'>
            <Card>
                <Card.Body>
                    <h1 className='newTransaction__header'>Add a New Transaction</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="transactionDate">
                            <Form.Label>Transaction Date:</Form.Label>
                            <Form.Control
                                value={transaction.transactionDate}
                                type="date"
                                required
                                onChange={handleChange}
                                placeholder="Date"
                            />
                        </Form.Group>

                        <Form.Group controlId="transactionName">
                            <Form.Label>Transaction Name:</Form.Label>
                            <Form.Control
                                value={transaction.transactionName}
                                type="text"
                                required
                                onChange={handleChange}
                                placeholder="Transaction name"
                            />
                        </Form.Group>

                        <Form.Group controlId='type'>
                            <Form.Label>Transaction Type:</Form.Label>
                            <Form.Control
                                as='select'
                                onChange={handleChange}
                                aria-label="transaction type"
                                required>
                                <option value="" selected='true' disabled='disabled'>Transaction Type</option>
                                <option value="Deposit">Deposit</option>
                                <option value="Expense">Expense</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Amount:</Form.Label>
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
                            <Form.Label>From:</Form.Label>
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
                        <div className="newTransaction__BtnDiv">
                            <Button className='newTransaction__Btn' variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default withRouter(NewTransactionForm);