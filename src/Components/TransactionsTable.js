import React from "react";
import Transaction from "./Transaction";
import { Card, Table, Container } from "react-bootstrap";

const TransactionsTable = ({ transactions, transactionsTotal }) => {
	return (
		<div>
			<Card className="m-5">
				<Card.Body>
					<h1
						className={`${
							transactionsTotal >= 1000 ? "text-success" : "text-danger"
						} text-center`}>
						Bank Account Total: $
						{transactionsTotal.toLocaleString("en-US", {
							minimumFractionDigits: 2,
						})}
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

export default TransactionsTable;
