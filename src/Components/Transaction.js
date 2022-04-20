import React from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'

const Transaction = ({ transaction, index }) => {
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
                            <td>{transaction.transactionDate}</td>
                            <td className='text-center'><Link to={`/transactions/${index}`}>{transaction.transactionName}</Link></td>
                            {transaction.type === 'Deposit' ? <td className='text-center text-success'>+{Number(transaction.amount).toFixed(2)}</td> : <td className='text-center text-danger'>-{Number(transaction.amount).toFixed(2)}</td>}
                        </tr>
                    </tbody>
                </Table>
            </Card>
        </Container>
    )
}

export default Transaction;