import apiURL from "../apiURL";

const API = apiURL();

const deleteTransaction = async (id) => {
	try {
		const response = await fetch(`${API}/transactions/${id}`, {
			method: "DELETE",
			headers: { "content-type": "application/json" },
		});

		if (!response.ok) {
			const { error } = await response.json();
			throw new Error(error.message);
		}
	} catch (err) {
		throw err;
	}
};

export default deleteTransaction;
