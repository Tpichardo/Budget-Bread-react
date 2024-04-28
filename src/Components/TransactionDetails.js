import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import { apiURL } from "../util/apiURL";
import { useAuth } from "../context/AuthContext";

import { BsTrash } from "react-icons/bs";
import { GrEdit } from "react-icons/gr";

import { Button, Card, Container } from "react-bootstrap";
import "./TransactionDetails.scss";

const API = apiURL();

function TransactionDetails() {
	const [transaction, setTransaction] = useState([]);
	const navigate = useNavigate();
	const { id } = useParams();
	const { currentUser } = useAuth();

	useEffect(() => {
		axios
			.get(`${API}/transactions/${id}`)
			.then((response) => {
				const { data } = response;
				setTransaction(data);
			})
			.catch((e) => {
				console.log(e);
				navigate("/not-found");
			});
	}, [id, navigate]);

	const deleteTransaction = async (id) => {
		try {
			await axios.delete(`${API}/transactions/${id}`);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async () => {
		try {
			await deleteTransaction(id);
			navigate("/transactions");
		} catch (error) {
			console.log(error);
		}
	};

	const handleGoBack = () => {
		navigate("/transactions");
	};

	return (
		<Container>
			{!currentUser && <Navigate to="/signin" />}
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
		</Container>
	);
}

export default TransactionDetails;
