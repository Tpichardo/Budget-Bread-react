import apiURL from "../apiURL";

const API = apiURL();

const addNewTransaction = async (newTransaction) => {
	try {
		const response = await fetch(`${API}/transactions`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(newTransaction),
		});

		if (!response.ok) {
			const { error } = await response.json();
			throw new Error(error.message);
		}
	} catch (err) {
		throw err;
	}
};

export default addNewTransaction;
