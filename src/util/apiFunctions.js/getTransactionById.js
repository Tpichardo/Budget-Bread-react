import apiURL from "../apiURL";

const API = apiURL();

const getTransactionById = async (id) => {
	try {
		const response = await fetch(`${API}/transactions/${id}`);

		if (!response.ok) {
			const { error } = await response.json();
			throw new Error(error.message);
		}

		const { data } = await response.json();
		return data;
	} catch (err) {
		throw err;
	}
};

export default getTransactionById;
