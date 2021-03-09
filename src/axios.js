import axios from "axios";

const instance = axios.create({
	baseURL: "http://reactwordpress.local",
});

export default instance;
