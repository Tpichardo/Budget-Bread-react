import React from "react";

import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import addNewTransaction from "../util/apiFunctions.js/addNewTransaction";
import ErrorView from "./ErrorView";

import { Container, Form, Button, InputGroup, Card } from "react-bootstrap";
import "./NewTransactionForm.scss";

function NewTransactionForm() {
	let navigate = useNavigate();
	const { currentUser } = useAuth();

	const [transaction, setTransaction] = useState({
		transaction_date: "",
		transaction_name: "",
		transaction_type: "",
		transaction_amount: 0,
		transaction_vendor: "",
	});
	const [errorMsg, setErrorMsg] = useState("");

	const handleChange = (e) => {
		setTransaction((currentTransactions) => {
			return { ...currentTransactions, [e.target.id]: e.target.value };
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		transaction.current_user_id = currentUser.uid;
		try {
			await addNewTransaction(transaction);
			navigate("/transactions");
		} catch (err) {
			setErrorMsg(err.message);
		}
	};

	return (
		<Container className="newTransactionForm">
			{!currentUser && <Navigate to="/signin" />}
			{errorMsg ? (
				<ErrorView />
			) : (
				<Card>
					<Card.Body>
						<h1 className="newTransactionForm__header">
							Add a New Transaction
						</h1>
						<Form onSubmit={handleSubmit}>
							<Form.Group controlId="transaction_date">
								<Form.Label>Transaction Date:</Form.Label>
								<Form.Control
									value={transaction.transaction_date}
									type="date"
									required
									onChange={handleChange}
									placeholder="Date"
								/>
							</Form.Group>

							<Form.Group controlId="transaction_name">
								<Form.Label>Transaction Name:</Form.Label>
								<Form.Control
									value={transaction.transaction_name}
									type="text"
									required
									onChange={handleChange}
									placeholder="Transaction name"
								/>
							</Form.Group>

							<Form.Group controlId="transaction_type">
								<Form.Label>Transaction Type:</Form.Label>
								<Form.Control
									as="select"
									onChange={handleChange}
									aria-label="transaction type"
									required>
									<option
										value=""
										selected="true"
										disabled="disabled">
										Transaction Type
									</option>
									<option value="Deposit">Deposit</option>
									<option value="Expense">Expense</option>
								</Form.Control>
							</Form.Group>

							<Form.Group>
								<Form.Label>Amount:</Form.Label>
								<InputGroup className="mb-3">
									<InputGroup.Prepend>
										<InputGroup.Text id="transaction_amount">$</InputGroup.Text>
									</InputGroup.Prepend>
									<Form.Control
										aria-label="transaction_amount"
										id="transaction_amount"
										value={transaction.transaction_amount}
										type="number"
										required
										onChange={handleChange}
									/>
									<InputGroup.Append>
										<InputGroup.Text>.00</InputGroup.Text>
									</InputGroup.Append>
								</InputGroup>
							</Form.Group>

							<Form.Group controlId="transaction_vendor">
								<Form.Label>From:</Form.Label>
								<Form.Control
									value={transaction.transaction_vendor}
									type="text"
									required
									onChange={handleChange}
									placeholder="Description of where transaction came from"
									as="textarea"
									rows={3}
								/>
							</Form.Group>
							<div className="newTransactionForm__BtnDiv">
								<Button
									className="newTransactionForm__Btn"
									variant="primary"
									type="submit">
									Submit
								</Button>
							</div>
						</Form>
					</Card.Body>
				</Card>
			)}
		</Container>
	);
}

export default NewTransactionForm;
