import apiURL from "../apiURL";

const API = apiURL();

const updateTransaction = async (id, updatedTransaction) => {
	try {
		const response = await fetch(`${API}/transactions/${id}`, {
			method: "PUT",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(updatedTransaction),
		});

		if (!response.ok) {
			const { error } = await response.json();
			throw new Error(error.mesaage);
		}
	} catch (err) {
		throw err;
	}
};

export default updateTransaction;
