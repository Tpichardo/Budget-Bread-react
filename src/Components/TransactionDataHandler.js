import React from "react";
import { useState, useEffect } from "react";

import getUserTransactions from "../util/apiFunctions.js/getUserTransactions";
import TransactionsTable from "./TransactionsTable";
import LoadingView from "./LoadingView";
import ErrorView from "./ErrorView";

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const TransactionDataHandler = () => {
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [errorMsg, setErrorMsg] = useState("");
	const { currentUser } = useAuth();

	useEffect(() => {
		const fetchUserTransactions = async () => {
			try {
				if (currentUser) {
					const data = await getUserTransactions(currentUser.uid);
					setTransactions(data);
				}
			} catch (err) {
				setErrorMsg(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchUserTransactions();
	}, [currentUser]);

	const transactionsTotal = transactions.reduce((sum, transaction) => {
		if (transaction.transaction_type === "Expense") {
			sum -= Number(transaction.transaction_amount);
		} else {
			sum += Number(transaction.transaction_amount);
		}

		return sum;
	}, 0);

	const renderContent = () => {
		if (loading) {
			return <LoadingView />;
		} else if (errorMsg) {
			return <ErrorView errorMsg={errorMsg} />;
		} else {
			return (
				<TransactionsTable
					transactions={transactions}
					transactionsTotal={transactionsTotal}
				/>
			);
		}
	};

	return (
		<div>
			{!currentUser && <Navigate to="/signin" />}
			{renderContent()}
		</div>
	);
};

export default TransactionDataHandler;
