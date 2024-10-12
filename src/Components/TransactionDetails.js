import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import getTransactionById from "../util/apiFunctions.js/getTransactionById";
import deleteTransaction from "../util/apiFunctions.js/deleteTransaction";
import ErrorView from "./ErrorView";

import { BsTrash } from "react-icons/bs";
import { GrEdit } from "react-icons/gr";
import { Button, Card, Container } from "react-bootstrap";

import "./TransactionDetails.scss";

function TransactionDetails() {
	const [transaction, setTransaction] = useState([]);
	const [errorMsg, setErrorMsg] = useState("");
	const navigate = useNavigate();
	const { id } = useParams();
	const { currentUser } = useAuth();

	useEffect(() => {
		const fetchTransactionById = async () => {
			try {
				const data = await getTransactionById(id);
				setTransaction(data);
			} catch (err) {
				setErrorMsg(err.message);
			}
		};
		fetchTransactionById(id);
	}, [id]);

	const handleDelete = async () => {
		try {
			await deleteTransaction(id);
			navigate("/transactions");
		} catch (error) {
			setErrorMsg(error);
		}
	};

	const handleGoBack = () => {
		navigate("/transactions");
	};

	return (
		<Container>
			{!currentUser && <Navigate to="/signin" />}
			{errorMsg ? (
				<ErrorView errorMsg={errorMsg} />
			) : (
				<Card className="col-sm-5 mt-5 mx-auto transaction">
					<Card.Body>
						<Card.Title>{transaction.transaction_name}</Card.Title>
						{transaction.transaction_type === "Expense" ? (
							<Card.Text className="text-danger">
								Expense: {transaction.transaction_amount}
							</Card.Text>
						) : (
							<Card.Text className="text-success">
								Deposit: {transaction.transaction_amount}
							</Card.Text>
						)}
						<Card.Text>From: {transaction.transaction_vendor}</Card.Text>
						<Link to={`/transactions/${id}/edit`}>
							<Button variant="outline-success">
								<GrEdit />
							</Button>
						</Link>
						<Button variant="outline-danger">
							<BsTrash onClick={handleDelete} />
						</Button>
						<Button
							variant="outline-primary"
							onClick={handleGoBack}>
							Back
						</Button>
					</Card.Body>
				</Card>
			)}
		</Container>
	);
}

export default TransactionDetails;
