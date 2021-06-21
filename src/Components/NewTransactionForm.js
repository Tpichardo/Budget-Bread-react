import React from 'react';
import { useState } from 'react';
import { withRouter } from 'react-router-dom';

function NewTransactionForm(props) {
    const [transaction, setTransaction] = useState({
        date: "",
        name: "",
        amount: 0,
        from: ""
    });

    const handleChange = (e) => {
        setTransaction({ ...transaction, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addTransaction(transaction)
        props.history.push('/transactions')
    }

    return (
        <div>
            <h1>Form</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='date'>Date</label>
                <input
                    id='date'
                    value={transaction.date}
                    type='text'
                    onChange={handleChange}
                    placeholder='date'
                    required
                />
                <label htmlFor='name'>Name</label>
                <input
                    id='name'
                    value={transaction.name}
                    type='text'
                    onChange={handleChange}
                    placeholder='name'
                    required
                />
                <label htmlFor='amount'>Amount</label>
                <input
                    id='amount'
                    value={transaction.amount}
                    type='number'
                    onChange={handleChange}
                    placeholder='amount'
                    required
                />
                <label htmlFor='from'>From</label>
                <input
                    id='from'
                    value={transaction.from}
                    type='text'
                    onChange={handleChange}
                    placeholder='Description of where transaction came from'
                    required
                />
                <input type='submit' />
            </form>
        </div>

    )
}

export default withRouter(NewTransactionForm);