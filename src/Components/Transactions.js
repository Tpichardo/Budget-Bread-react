import React from 'react';
import Transaction from './Transaction'

const Transactions = ({ transactions }) => {
    transactions.forEach(transaction => console.log(transaction.amount))

    return (
        <div>
            <h1>Bank Account Total: {transactions.amount}</h1>
            {transactions.map((transaction, index) => {
                return <Transaction key={index} transaction={transaction} index={index} />
            })}
        </div>
    )
}

export default Transactions;