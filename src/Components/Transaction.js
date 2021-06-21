import React from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

const Transaction = ({ transaction, index }) => {
    return (
        <Table striped bordered hover size='sm' >
            <thead>
                <tr>
                    <th className='col-1'>Date</th>
                    <th className='col-1'>Name</th>
                    <th className='col-1'>Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{transaction.date}</td>
                    <td><Link to={`/transactions/${index}`}>{transaction.name}</Link></td>
                    <td>{Number(transaction.amount).toFixed(2)}</td>
                </tr>
            </tbody>
        </Table>
    )
}

export default Transaction;