import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react'
import { apiURL } from '../util/apiURL';
import Transaction from './Transaction'
import LoadingView from './LoadingView';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card } from 'react-bootstrap';

const API = apiURL();

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        axios.get(`${API}/transactions`).then((response) => {
            const { data } = response;
            setTransactions(data);
            setLoading(false)
        }).catch((e) => {
            console.log(e)
        });
    }, []);


    const total = transactions.reduce((sum, transaction) => {
        if (transaction.type === "Expense") {
            sum -= Number(transaction.amount);
        } else {
            sum += Number(transaction.amount);
        };

        return sum;
    }, 0)

    return (
        <div>
            {!currentUser && <Redirect to='signin' />}

            {loading && <LoadingView />}
            {!loading
                &&
                currentUser?.email === 'budgetdemo@testing.com'
                &&
                total >= 1000
                &&
                <Card>
                    <h1 className='text-success text-center'>Bank Account Total: ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</h1>
                </Card>
            }

            {!loading
                &&
                currentUser?.email === 'budgetdemo@testing.com'
                &&
                total < 1000
                &&
                <Card>
                    <h1 className='text-danger text-center'>Bank Account Total: ${total.toLocaleString('en-US', { minimumDecimalFractions: 2 })}</h1>
                </Card>
            }

            {!loading && currentUser?.email === 'budgetdemo@testing.com' &&
                transactions.map((transaction, index) => {
                    return (
                        <div>
                            <Transaction key={index} transaction={transaction} index={index} />
                        </div>
                    );
                })}

        </div>
    );
};

export default Transactions;