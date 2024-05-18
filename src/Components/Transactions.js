import React from "react";
import { useState, useEffect } from "react";
import { apiURL } from "../util/apiURL";
import Transaction from "./Transaction";
import LoadingView from "./LoadingView";
import ErrorView from "./ErrorView";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Card, Table, Container } from "react-bootstrap";

const API = apiURL();

const Transactions = () => {
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [errorMsg, setErrorMsg] = useState("");
	const { currentUser } = useAuth();

	useEffect(() => {
		const fetchUserTransactions = async () => {
			try {
				if (currentUser) {
					const response = await fetch(
						`${API}/transactions?current_user_id=${currentUser.uid}`
					);
					if (response.ok) {
						const { data } = await response.json();
						setTransactions(data);
					} else {
						const { error } = await response.json();
						setErrorMsg(error);
					}
				}
			} catch (err) {
				setErrorMsg(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchUserTransactions();
	}, [currentUser]);

	const total = transactions.reduce((sum, transaction) => {
		if (transaction.transaction_type === "Expense") {
			sum -= Number(transaction.transaction_amount);
		} else {
			sum += Number(transaction.transaction_amount);
		}

		return sum;
	}, 0);

	return (
		<div>
			{!currentUser && <Navigate to="/signin" />}
			{loading && <LoadingView />}
			{errorMsg && <ErrorView errorMsg={errorMsg} />}

			<Card className="m-5">
				<Card.Body>
					<h1
						className={`${
							total >= 1000 ? "text-success" : "text-danger"
						} text-center`}>
						Bank Account Total: $
						{total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
					</h1>
				</Card.Body>
			</Card>

			<Container>
				<Table
					bordered
					hover
					size="sm"
					style={{ backgroundColor: "white" }}>
					<tr>
						<th className="col-1 text-center">Date</th>
						<th className="col-1 text-center">Name</th>
						<th className="col-1 text-center">Amount</th>
					</tr>
					{transactions.map((transaction) => {
						return (
							<Transaction
								key={transaction.id}
								transaction={transaction}
							/>
						);
					})}
				</Table>
			</Container>
		</div>
	);
};

export default Transactions;
