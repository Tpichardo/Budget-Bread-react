import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import { CompatRouter } from "react-router-dom-v5-compat";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<BrowserRouter>
				<CompatRouter>
					<App />
				</CompatRouter>
			</BrowserRouter>
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
