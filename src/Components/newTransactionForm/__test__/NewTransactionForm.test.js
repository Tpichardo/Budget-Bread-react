import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import NewTransactionForm from '../NewTransactionForm.js';

//Wraps NewTransactionForm in BrowserRouter so that withRouter is rendered within BrowserRouter
const MockForm = () => {
    return (
        <BrowserRouter>
            <NewTransactionForm />
        </BrowserRouter>
    )
}

test('renders new transaction form', () => {
    render(<MockForm />);
});

