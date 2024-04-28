import React from "react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import "./SignIn.scss";

const SignIn = () => {
	let emailRef = useRef();
	let passwordRef = useRef();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { signIn, currentUser } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setError("");
			setLoading(true);
			await signIn(emailRef.current.value, passwordRef.current.value);
		} catch (error) {
			console.log(error);
			setError("Failed to sign in.");
		}
		setLoading(false);
	};

	const demoLogin = async () => {
		try {
			setError("");
			setLoading(true);
			await signIn("budgetdemo@testing.com", "Thisisthedemopassword!*");
		} catch (error) {
			console.log(error);
			setError("Demo login is currently unavailable");
		}
		setLoading(false);
	};

	return (
		<Container>
			{currentUser && <Navigate to="/transactions" />}
			<Card className="signIn">
				<h3 className="signIn__greeting">Welcome!</h3>
				{error && <Alert variant="danger">{error}</Alert>}
				<Card.Body>
					<Form onSubmit={handleSubmit}>
						<Form.Group>
							<Form.Label>Email:</Form.Label>
							<Form.Control
								type="email"
								placeholder="example@gmail.com"
								ref={emailRef}
								required
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Password:</Form.Label>
							<Form.Control
								type="password"
								placeholder="password"
								ref={passwordRef}
								required
							/>
						</Form.Group>
						<div className="signIn__BtnDiv">
							<Button
								disabled={loading}
								className="signIn__Btn"
								type="submit"
								variant="primary">
								Log In
							</Button>
							<Button
								onClick={demoLogin}
								disabled={loading}
								className="signIn__Btn"
								type="submit"
								variant="primary">
								Demo Login
							</Button>
						</div>
					</Form>
				</Card.Body>
				<p className="signIn__signUp">
					Don't have an account? <Link to="/signup">Sign Up</Link>
				</p>
			</Card>
		</Container>
	);
};

export default SignIn;
