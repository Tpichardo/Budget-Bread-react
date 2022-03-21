import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useParams, useHistory, withRouter } from 'react-router-dom';
import { apiURL } from '../../util/apiURL';
import { BsTrash } from 'react-icons/bs'
import { GrEdit } from 'react-icons/gr';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const API = apiURL()

function TransactionDetails() {

    const [transaction, setTransaction] = useState([]);
    let history = useHistory();
    let { index } = useParams();

    const deleteTransaction = async (index) => {
        await axios.delete(`${API}/transactions/${index}`)
            .then((response) => {
                const transactionArr = [...transaction]
                transactionArr.splice(index, 1)
                setTransaction(transactionArr)
            }).catch((e) => {
                console.log(e)
            })
    };


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

    const handleDelete = async () => {
        await deleteTransaction(index)
        history.push('/transactions')
    };

    return (

        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{transaction.name}</Card.Title>
                {transaction.amount < 0 ? <Card.Text className="text-danger">Withdrawal: {transaction.amount}</Card.Text> : <Card.Text className="text-success">Deposit: {transaction.amount}</Card.Text>}
                <Card.Text>
                    From: {transaction.from}
                </Card.Text>
                <Link to={`/transactions/${index}/edit`}>
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