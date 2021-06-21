import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { apiURL } from '../util/apiURL';
import axios from 'axios';

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
            <h1>Form</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='date'>Date</label>
                <input
                    id='date'
                    name='date'
                    value={transaction.date}
                    type='text'
                    onChange={handleChange}
                    placeholder='date'
                    required
                />
                <label htmlFor='name'>Name</label>
                <input
                    id='name'
                    name='name'
                    type='text'
                    value={transaction.name}
                    onChange={handleChange}
                    placeholder='name'
                    required
                />
                <label htmlFor='amount'>Amount</label>
                <input
                    id='amount'
                    name='amount'
                    value={transaction.amount}
                    type='number'
                    onChange={handleChange}
                    placeholder='amount'
                    required
                />
                <label htmlFor='from'>From</label>
                <textarea
                    id='from'
                    name='from'
                    value={transaction.from}
                    type='text'
                    onChange={handleChange}
                    required
                />
                <input type='submit' />
            </form>
        </div>
    )
}

export default EditTransactionForm;