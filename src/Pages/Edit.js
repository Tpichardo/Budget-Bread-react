import React from 'react';
import EditTransactionForm from '../Components/EditTransactionForm';

function Edit({ updateTransaction, transactions }) {
    return (
        <div>
            <EditTransactionForm updateTransaction={updateTransaction} transactions={transactions} />
        </div>
    );
}

export default Edit;