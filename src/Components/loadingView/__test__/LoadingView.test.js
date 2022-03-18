import { render } from '@testing-library/react';
import LoadingView from '../LoadingView';

describe("renders Loading View", () => {
    test("shows loading view message", () => {
        const { getByText } = render(<LoadingView />);
        const loadingMessage = getByText(/loading/i);

        expect(loadingMessage).toBeInTheDocument();
    });
})