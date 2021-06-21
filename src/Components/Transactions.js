import React from 'react';
import Transaction from './Transaction'

const Transactions = ({ transactions }) => {
    let total = 0
    transactions.forEach(transaction => {
        total += Number(transaction.amount)
    })

    return (
        <div>
            <h1>Bank Account Total: ${total.toFixed(2)}</h1>
            {transactions.map((transaction, index) => {
                return <Transaction key={index} transaction={transaction} index={index} />
            })}
        </div>
    )
}

export default Transactions;