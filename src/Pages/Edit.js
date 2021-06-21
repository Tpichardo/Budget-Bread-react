import React from 'react';
import EditTransactionForm from '../Components/EditTransactionForm';

function Edit({ updateTransaction, transactions }) {
    return (
        <div>
            <h1>Edit</h1>
            <EditTransactionForm updateTransaction={updateTransaction} transactions={transactions} />
        </div>
    );
}

export default Edit;