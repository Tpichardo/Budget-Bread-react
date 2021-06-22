import React from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

const Transaction = ({ transaction, index }) => {
    return (
        <Table striped hover size="sm" >
            <thead>
                <tr>
                    <th className='col-1'>Date</th>
                    <th className='col-1 text-center'>Name</th>
                    <th className='col-1 text-center'>Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{transaction.date}</td>
                    <td className='text-center'><Link to={`/transactions/${index}`}>{transaction.name}</Link></td>
                    {/* <td className='text-center'>{Number(transaction.amount).toFixed(2)}</td> */}
                    {transaction.amount > 0 ? <td className='text-center text-success'>{Number(transaction.amount).toFixed(2)}</td> : <td className='text-center text-danger'>{Number(transaction.amount).toFixed(2)}</td>}
                </tr>
            </tbody>
        </Table>
    )
}

export default Transaction;