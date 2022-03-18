import { render } from "@testing-library/react";
import Transactions from '../Transactions';

describe("renders a list of transactions", () => {
    test("renders transactions component", () => {
        render(<Transactions />)
    });
});