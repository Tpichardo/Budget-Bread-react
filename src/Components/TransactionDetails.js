import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useParams, useHistory, withRouter } from 'react-router-dom';
import { apiURL } from '../util/apiURL';

import { BsTrash } from 'react-icons/bs'
import { GrEdit } from 'react-icons/gr';

import { Button, Card } from 'react-bootstrap';


const API = apiURL();

function TransactionDetails() {

    const [transaction, setTransaction] = useState([]);
    let history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`${API}/transactions/${id}`)
            .then((response) => {
                const { data } = response
                setTransaction(data);
            }).catch((e) => {
                console.log(e)
                history.push('/not-found')
            })
    }, [id, history])


    const deleteTransaction = async (id) => {
        try {
            await axios.delete(`${API}/transactions/${id}`);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        await deleteTransaction(id);
        history.push('/transactions');
    };

    return (

        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{transaction.transaction_name}</Card.Title>
                {transaction.transaction_type === "Expense" ? <Card.Text className="text-danger">Expense: {transaction.transaction_amount}</Card.Text> : <Card.Text className="text-success">Deposit: {transaction.transaction_amount}</Card.Text>}
                <Card.Text>
                    From: {transaction.transaction_vendor}
                </Card.Text>
                <Link to={`/transactions/${id}/edit`}>
                    <Button variant='outline-success'>
                        <GrEdit />
                    </Button>
                </Link>
                <Button variant='outline-danger'>
                    <BsTrash onClick={handleDelete} />
                </Button>
                <Link to={'/transactions'}>
                    <Button variant='outline-primary'>Back</Button>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default withRouter(TransactionDetails);