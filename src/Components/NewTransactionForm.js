import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { apiURL } from '../util/apiURL';
import { useAuth } from '../context/AuthContext';
import { Redirect } from 'react-router-dom';
import { Container, Form, Button, InputGroup, Card } from 'react-bootstrap';
import './newTransaction.scss'


function NewTransactionForm() {
    let history = useHistory();
    const API = apiURL();
    const { currentUser } = useAuth();

    const [transaction, setTransaction] = useState({
        transaction_date: "",
        transaction_name: "",
        transaction_type: "",
        transaction_amount: 0,
        transaction_vendor: ""
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
        e.preventDefault();
        transaction.current_user_id = currentUser.uid;
        addTransaction(transaction);
    };


    return (
        <Container className='newTransaction'>
            {!currentUser && <Redirect to='/signin' />}
            <Card>
                <Card.Body>
                    <h1 className='newTransaction__header'>Add a New Transaction</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="transaction_date">
                            <Form.Label>Transaction Date:</Form.Label>
                            <Form.Control
                                value={transaction.transaction_date}
                                type="date"
                                required
                                onChange={handleChange}
                                placeholder="Date"
                            />
                        </Form.Group>

                        <Form.Group controlId="transaction_name">
                            <Form.Label>Transaction Name:</Form.Label>
                            <Form.Control
                                value={transaction.transaction_name}
                                type="text"
                                required
                                onChange={handleChange}
                                placeholder="Transaction name"
                            />
                        </Form.Group>

                        <Form.Group controlId='transaction_type'>
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
                                    <InputGroup.Text id="transaction_amount">$</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    aria-label="transaction_amount"
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
                        </Form.Group>

                        <Form.Group controlId="transaction_vendor">
                            <Form.Label>From:</Form.Label>
                            <Form.Control
                                value={transaction.transaction_vendor}
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