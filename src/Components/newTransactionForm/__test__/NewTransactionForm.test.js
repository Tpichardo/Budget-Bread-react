import { render, screen, fireEvent } from '@testing-library/react';
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

describe("A form that displays different inputs", () => {

    test("renders new transaction form", () => {
        render(<MockForm />);
    });

    test("renders date input element", () => {
        const { getByLabelText } = render(<MockForm addTransaction={[]} />);
        const date = getByLabelText("Date");

        expect(date).toBeInTheDocument();
    });

    test("renders name input element", () => {
        const { getByLabelText } = render(<MockForm addTransaction={[]} />);
        const input = getByLabelText("Name");

        expect(input).toBeInTheDocument();
    });

    test("renders amount input element", () => {
        const { getByLabelText } = render(<MockForm addTransaction={[]} />);
        const amount = getByLabelText("Amount");

        expect(amount).toBeInTheDocument();
    });

    test("renders text area element", () => {
        const { getByLabelText } = render(<MockForm addTransaction={[]} />);
        const from = getByLabelText("From");

        expect(from).toBeInTheDocument();
    });

});

describe("renders a type number input", () => {
    test("renders a type number input that only accepts numbers", () => {
        const { getByLabelText } = render(<MockForm addTransaction={[]} />);
        const amount = getByLabelText("Amount")

        expect(amount).not.toBeNaN();
    });
})

