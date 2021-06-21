import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams, useHistory, withRouter } from 'react-router-dom';
import axios from 'axios';
import { apiURL } from '../util/apiURL';

const API = apiURL()

function TransactionDetails(props) {
    const { deleteTransaction } = props;
    const [transaction, setTransaction] = useState([])

    let { index } = useParams()
    let history = useHistory()


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

    const handleDelete = () => {
        deleteTransaction(index)
        history.push('/transactions')
    };
    return (
        <article>
            <h1>{transaction.name}</h1>
            <p>Date: {transaction.date}</p>
            <p>Amount: ${transaction.amount}</p>
            <p>From: {transaction.from}</p>
            <div>
                <Link to={`/transactions/${index}/edit`}>
                    <button>Edit</button>
                </Link>
            </div>
            <div>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </article>
    )
}

export default withRouter(TransactionDetails);