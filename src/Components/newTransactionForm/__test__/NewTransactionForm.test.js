import { render, fireEvent } from '@testing-library/react';
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

describe("A form that allows the user to input a date, name, amount, and from value", () => {

    test("renders new transaction form", () => {
        render(<MockForm />);
    });

    //Date input element

    test("renders date input element", () => {
        const { getByLabelText } = render(<MockForm addTransaction={[]} />);
        const date = getByLabelText("Date");

        expect(date).toBeInTheDocument();
    });

    //Name input element
    test("renders name input element", () => {
        const { getByLabelText } = render(<MockForm addTransaction={[]} />);
        const transactionName = getByLabelText("Name");

        expect(transactionName).toBeInTheDocument();
    });

    test("allows user to type in name input", () => {
        const { getByLabelText } = render(<MockForm addTransaction={[]} />)
        const transactionNameInput = getByLabelText("Name");
        fireEvent.change(transactionNameInput, { target: { value: "Dinner with Mami" } });

        expect(transactionNameInput.value).toBe("Dinner with Mami");
    });

    //Amount input element
    test("renders amount input element", () => {
        const { getByLabelText } = render(<MockForm addTransaction={[]} />);
        const amount = getByLabelText("Amount");

        expect(amount).toBeInTheDocument();
    });

    test("renders a type number input that only accepts numbers", () => {
        const { getByLabelText } = render(<MockForm addTransaction={[]} />);
        const amount = getByLabelText("Amount")

        expect(amount).not.toBeNaN();
    });

    test("allows user to enter a number in amount input", () => {
        const { getByLabelText } = render(<MockForm addTransaction={[]} />);
        const amount = getByLabelText("Amount");
        fireEvent.change(amount, { target: { value: "80" } });

        expect(amount.value).toBe("80");
    });

    //Textarea element
    test("renders text area element", () => {
        const { getByLabelText } = render(<MockForm addTransaction={[]} />);
        const transactionDescription = getByLabelText("From");

        expect(transactionDescription).toBeInTheDocument();
    });

    test("allows user to enter a transaction description in textarea", () => {
        const { getByLabelText } = render(<MockForm addTransaction={[]} />);
        const transactionDescription = getByLabelText("From");
        fireEvent.change(transactionDescription, { target: { value: "Mama Sushi" } });

        expect(transactionDescription.value).toBe("Mama Sushi");
    });

});


