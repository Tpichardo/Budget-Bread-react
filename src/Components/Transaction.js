import React from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

const Transaction = ({ transaction, index }) => {
    return (
        <Container>
            <Table striped hover size="sm" className='bg-light' >
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
                        {transaction.amount > 0 ? <td className='text-center text-success'>{Number(transaction.amount).toFixed(2)}</td> : <td className='text-center text-danger'>{Number(transaction.amount).toFixed(2)}</td>}
                    </tr>
                </tbody>
            </Table>
        </Container>
    )
}

export default Transaction;