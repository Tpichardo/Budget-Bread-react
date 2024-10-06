import apiURL from "../apiURL";

const API = apiURL();

const getUserTransactions = async (currentUserId) => {
	try {
		const response = await fetch(
			`${API}/transactions?current_user_id=${currentUserId}`
		);

		if (!response.ok) {
			const { error } = await response.json();
			throw new Error(error.message);
		}
		return response;
	} catch (err) {
		throw err;
	}
};

export default getUserTransactions;
