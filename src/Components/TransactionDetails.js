import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, Redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom-v5-compat";
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
	}, [id]);

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

	return (
		<Container>
			{!currentUser && <Redirect to="/signin" />}
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
					<Link to={"/transactions"}>
						<Button variant="outline-primary">Back</Button>
					</Link>
				</Card.Body>
			</Card>
		</Container>
	);
}

export default TransactionDetails;
