import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const Transaction = ({ transaction }) => {
    return (
        <>
            <tbody>
                <tr>
                    <td className='text-center'>{format(new Date(transaction.transaction_date), 'MM/dd/yyyy')}</td>
                    <td className='text-center'><Link to={`/transactions/${transaction.id}`}>{transaction.transaction_name}</Link></td>
                    {transaction.transaction_type === 'Deposit' ? <td className='text-center text-success'>+{Number(transaction.transaction_amount).toFixed(2)}</td> : <td className='text-center text-danger'>-{Number(transaction.transaction_amount).toFixed(2)}</td>}
                </tr>
            </tbody>
        </>
    )
}

export default Transaction;