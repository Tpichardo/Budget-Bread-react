import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react'
import { apiURL } from '../util/apiURL';
import Transaction from './Transaction'
import LoadingView from './LoadingView';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, Table, Container } from 'react-bootstrap';

const API = apiURL();

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        try {
            if (currentUser) {
                axios.get(`${API}/transactions?current_user_id=${currentUser.uid}`).then((response) => {
                    const { data } = response;
                    setTransactions(data);
                    setLoading(false);
                });
            }
        } catch (error) {
            console.log(error);
        }
    }, [currentUser]);


    const total = transactions.reduce((sum, transaction) => {
        if (transaction.transaction_type === "Expense") {
            sum -= Number(transaction.transaction_amount);
        } else {
            sum += Number(transaction.transaction_amount);
        };

        return sum;
    }, 0)

    return (
        <div>
            {!currentUser && <Redirect to='/signin' />}

            {loading && <LoadingView />}
            {!loading
                &&
                total >= 1000
                &&
                <Card className='m-5'>
                    <Card.Body>
                        <h1 className='text-success text-center'>Bank Account Total: ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</h1>
                    </Card.Body>
                </Card>
            }

            {!loading
                &&
                total < 1000
                &&
                <Card className='m-5'>
                    <Card.Body>
                        <h1 className='text-danger text-center'>Bank Account Total: ${total.toLocaleString('en-US', { minimumDecimalFractions: 2 })}</h1>
                    </Card.Body>
                </Card>
            }

            {!loading &&
                <Container>
                    <Table bordered hover size="sm" style={{ backgroundColor: 'white' }} >
                        <tr>
                            <th className='col-1 text-center'>Date</th>
                            <th className='col-1 text-center'>Name</th>
                            <th className='col-1 text-center'>Amount</th>
                        </tr>
                        {transactions.map((transaction) => {
                            return (
                                <Transaction key={transaction.id} transaction={transaction} />
                            );
                        })}
                    </Table>
                </Container>

            }
        </div>
    );
};

export default Transactions;