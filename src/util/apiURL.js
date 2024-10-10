export const apiURL = () => {
	return window.location.hostname === "localhost"
		? "http://localhost:8080"
		: "https://bread-api.fly.dev";
};

export default apiURL;
