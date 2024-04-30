import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home.js";
import Index from "./Pages/Index.js";
import New from "./Pages/New.js";
import Show from "./Pages/Show.js";
import Edit from "./Pages/Edit.js";
import Four0Four from "./Pages/Four0Four.js";

import SignIn from "./Components/SignIn.js";
import SignUp from "./Components/SignUp.js";
import NavBar from "./Components/NavBar.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

function App() {
	return (
		<div className="App">
			<NavBar />
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/signin"
					element={<SignIn />}
				/>
				<Route
					path="/signup"
					element={<SignUp />}
				/>
				<Route
					exact
					path="/transactions"
					element={<Index />}
				/>
				<Route
					path="/transactions/new"
					element={<New />}
				/>
				<Route
					exact
					path="/transactions/:id"
					element={<Show />}
				/>
				<Route
					path="/transactions/:id/edit"
					element={<Edit />}
				/>
				<Route
					path="*"
					element={<Four0Four />}
				/>
			</Routes>
		</div>
	);
}

export default App;
