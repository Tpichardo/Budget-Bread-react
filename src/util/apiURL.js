export const apiURL = () => {
	return window.location.hostname === "localhost"
		? "http://localhost:8080"
		: "https://fly-builder-spring-sun-5382.fly.dev";
};

export default apiURL;
