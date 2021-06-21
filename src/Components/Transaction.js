import React from 'react';

const Transaction = ({ transaction, index }) => {
    return (
        <div>
            <ul>
                {transaction.date} {' '}
                <a href={`/transactions/${index}`}> {transaction.name} {' '}</a>
                ${transaction.amount}
            </ul>
        </div>
    )
}

export default Transaction;