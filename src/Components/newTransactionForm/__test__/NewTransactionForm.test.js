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
    test("renders date input element and allows the user to enter a date", () => {
        const { getByLabelText } = render(<MockForm addTransaction={[]} />);
        const date = getByLabelText("Date");

        fireEvent.change(date, {target: {value: "2022-03-18"}});

        expect(date).toBeInTheDocument();
        expect(date.value).toBe("2022-03-18");
    });

    //Name input element
    test("renders name input element and allows user to type", () => {
        const { getByLabelText } = render(<MockForm addTransaction={[]} />);
        const transactionName = getByLabelText("Name");

        fireEvent.change(transactionName, { target: { value: "Dinner with Mami" } });

        expect(transactionName).toBeInTheDocument();
        expect(transactionName.value).toBe("Dinner with Mami");
    });

    //Amount input element
    test("renders a type number input that only accepts numbers", () => {
        const { getByLabelText } = render(<MockForm addTransaction={[]} />);
        const amount = getByLabelText("Amount");

        fireEvent.change(amount, { target: { value: "80" } });

        expect(amount).toBeInTheDocument();
        expect(amount).not.toBeNaN();
        expect(amount.value).toBe("80");

    });

    //Textarea element
    test("renders text area element that allows the user to type", () => {
        const { getByLabelText } = render(<MockForm addTransaction={[]} />);
        const transactionDescription = getByLabelText("From");

        fireEvent.change(transactionDescription, { target: { value: "Mama Sushi" } });

        expect(transactionDescription).toBeInTheDocument();
        expect(transactionDescription.value).toBe("Mama Sushi");
    });

});

//Integration test
// describe("allows user to add a new transaction on submit", () => {
//     test('user is able to submit a transaction', async () => {
//         const { getByRole, findByText } = render(<MockForm addTransaction={[]} />);
//         const submitButton = getByRole("button", { name: 'Submit' });


//         expect(submitButton).toBeInTheDocument();
//         fireEvent.click(submitButton);
//         await findByText(/bank/i);

        


//     })


// });
