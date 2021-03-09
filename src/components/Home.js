import React from "react";
import Navbar from "./Navbar";
import axios from "../axios";
import { Link } from "@reach/router";
import renderHTML from "react-render-html";
import "../style.css";
import Moment from "react-moment";
import Loader from "../loader.gif";
class Home extends React.Component {
	state = {
		loading: false,
		posts: [],
		error: "",
	};

	componentDidMount() {
		this.setState({ loading: true }, () => {
			axios
				.get(`/wp-json/wp/v2/posts`)
				.then((res) => {
					this.setState({ loading: false, posts: res.data });
				})
				.catch((err) => {
					this.setState({
						loading: false,
						error: err.response.data.message,
					});
				});
		});
	}

	render() {
		const { posts, loading, error } = this.state;
		return (
			<div>
				<Navbar />
				{error && <div className="alert alert-danger">{error}</div>}
				{posts.length ? (
					<div className="mt-5 post-container ">
						{posts.map((post) => (
							<div
								key={post.id}
								className="
								card border-dark mb-3
								mr-auto
								ml-auto"
								style={{ width: "50rem" }}
							>
								<div className="card-header">
									<b>{post.title.rendered}</b>
								</div>

								<div className="card-body">
									<div className="card-text post-content">
										{renderHTML(post.excerpt.rendered)}
									</div>
								</div>

								<div className="card-footer">
									<Moment fromNow>{post.date}</Moment>
									<Link
										to={`/post/${post.id}`}
										className="btn btn-secondary
										float-right"
									>
										Read More..
									</Link>
								</div>
							</div>
						))}
					</div>
				) : (
					""
				)}
				{loading && (
					<img src={Loader} className="loader" alt="loader" />
				)}
			</div>
		);
	}
}

export default Home;
