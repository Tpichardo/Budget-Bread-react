import React from "react";
import { useState, useEffect } from "react";

import updateTransaction from "../util/apiFunctions.js/updateTransaction";
import getTransactionById from "../util/apiFunctions.js/getTransactionById";
import ErrorView from "./ErrorView";

import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { Form, Button, Container, Card, InputGroup } from "react-bootstrap";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./EditTransaction.scss";

function EditTransactionForm() {
	const navigate = useNavigate();
	const { id } = useParams();
	const { currentUser } = useAuth();

	const [transaction, setTransaction] = useState({
		current_user_id: currentUser?.uid,
		transaction_date: "",
		transaction_name: "",
		transaction_type: "",
		transaction_amount: 0,
		transaction_vendor: "",
	});

	const [errorMsg, setErrorMsg] = useState("");

	useEffect(() => {
		const prefillForm = async () => {
			try {
				const data = await getTransactionById(id);

				const formattedDate = data.transaction_date
					? new Date(data.transaction_date).toISOString().split("T")[0]
					: "";
				setTransaction({ ...data, transaction_date: formattedDate });
			} catch (err) {
				setErrorMsg(err);
			}
		};
		prefillForm();
	}, [id]);

	const handleChange = (e) => {
		setTransaction((currentTransaction) => {
			return { ...currentTransaction, [e.target.id]: e.target.value };
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await updateTransaction(id, transaction);
			navigate(`/transactions/${id}`);
		} catch (err) {
			setErrorMsg(err);
		}
	};

	return (
		<div>
			{errorMsg ? (
				<ErrorView />
			) : (
				<Container className="editTransactionForm">
					<h3>
						<Link
							style={{ textDecoration: "none", color: "black" }}
							to={`/transactions/${id}`}>
							<AiOutlineArrowLeft /> Back
						</Link>
					</h3>
					<Card>
						<Card.Body>
							<h1 className="editTransactionForm__header">Edit Transaction</h1>
							<Form onSubmit={handleSubmit}>
								<Form.Group controlId="transaction_date">
									<Form.Label>Date</Form.Label>
									<Form.Control
										value={transaction.transaction_date}
										type="date"
										required
										onChange={handleChange}
										placeholder="Date"
									/>
								</Form.Group>
								<Form.Group controlId="transaction_name">
									<Form.Label>Name</Form.Label>
									<Form.Control
										value={transaction.transaction_name}
										type="text"
										required
										onChange={handleChange}
										placeholder="Transaction name"
									/>
								</Form.Group>
								<InputGroup className="mb-3">
									<InputGroup.Prepend>
										<InputGroup.Text id="transaction_amount">$</InputGroup.Text>
									</InputGroup.Prepend>
									<Form.Control
										aria-label="Amount (to the nearest dollar)"
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
								<Form.Group controlId="transaction_vendor">
									<Form.Label>From</Form.Label>
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
								<div className="editTransactionForm__BtnDiv">
									<Button
										className="editTransactionForm__Btn"
										variant="primary"
										type="submit">
										Submit Change
									</Button>
								</div>
							</Form>
						</Card.Body>
					</Card>
				</Container>
			)}
		</div>
	);
}

export default EditTransactionForm;
