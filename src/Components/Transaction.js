import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Container, Card } from 'react-bootstrap'
import { format } from 'date-fns';

const Transaction = ({ transaction }) => {
    return (
        <Container>
            <Card>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th className='col-1'>Date</th>
                            <th className='col-1 text-center'>Name</th>
                            <th className='col-1 text-center'>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{format(new Date(transaction.transaction_date), 'MM/dd/yyyy')}</td>
                            <td className='text-center'><Link to={`/transactions/${transaction.id}`}>{transaction.transaction_name}</Link></td>
                            {transaction.transaction_type === 'Deposit' ? <td className='text-center text-success'>+{Number(transaction.transaction_amount).toFixed(2)}</td> : <td className='text-center text-danger'>-{Number(transaction.transaction_amount).toFixed(2)}</td>}
                        </tr>
                    </tbody>
                </Table>
            </Card>
        </Container>
    )
}

export default Transaction;