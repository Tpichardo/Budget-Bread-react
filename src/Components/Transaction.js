import React from 'react';
import { Link } from 'react-router-dom';

const Transaction = ({ transaction, index }) => {
    return (
        <div>
            <ul>
                {transaction.date} {' '}
                <Link to={`/transactions/${index}`}>{transaction.name}</Link> {' '}
                {transaction.amount}
            </ul>
        </div>
    )
}

export default Transaction;