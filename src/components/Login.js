import React from "react";
import Navbar from "./Navbar";
import axios from "../axios";
import { Redirect } from "@reach/router";
class Login extends React.Component {
	state = {
		username: "",
		password: "",
		userNiceName: "",
		userEmail: "",
		loggedIn: false,
		loading: false,
		error: "",
	};

	formSubmit = (e) => {
		e.preventDefault();

		const loginData = {
			username: this.state.username,
			password: this.state.password,
		};

		this.setState({ loading: true }, () => {
			axios
				.post(`/wp-json/jwt-auth/v1/token`, loginData)
				.then((res) => {
					if (undefined === res.data.token) {
						this.setState({
							error: res.data.message,
							loading: false,
						});
						return;
					}

					localStorage.setItem("token", res.data.token);
					localStorage.setItem("userName", res.data.user_nicename);

					this.setState({
						loading: false,
						token: res.data.token,
						userNiceName: res.data.user_nicename,
						userEmail: res.data.user_email,
						loggedIn: true,
					});
				})
				.catch((err) => {
					this.setState({
						error: err.response.data.message,
						loading: false,
					});
				});
		});
	};
	render() {
		const { username, password, loggedIn, userNiceName } = this.state;

		const user = userNiceName
			? userNiceName
			: localStorage.getItem("userName");

		if (loggedIn || localStorage.getItem("token")) {
			return <Redirect to={`/dashboard/${user}`} noThrow />;
		} else {
			return (
				<div>
					<Navbar />
					<div className="container">
						<form onSubmit={this.formSubmit} className="mt-5">
							<label className="form-group">
								Username:
								<input
									type="text"
									className="form-control"
									value={username}
									onChange={(e) =>
										this.setState({
											username: e.target.value,
										})
									}
								/>
							</label>
							<br />
							<label className="form-group">
								Pasword:
								<input
									type="password"
									className="form-control"
									value={password}
									onChange={(e) =>
										this.setState({
											password: e.target.value,
										})
									}
								/>
							</label>
							<br />
							<button
								className="btn btn-primary mb-3"
								type="submit"
							>
								Login
							</button>
						</form>
					</div>
				</div>
			);
		}
	}
}

export default Login;
