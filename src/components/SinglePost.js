import React from "react";
import axios from "../axios";
import Navbar from "./Navbar";
import Loader from "../loader.gif";
import renderHTML from "react-render-html";
class SinglePost extends React.Component {
	state = {
		loading: false,
		post: {},
		error: "",
	};

	componentDidMount() {
		this.setState({ loading: true }, () => {
			axios
				.get(`/wp-json/wp/v2/posts/${this.props.id}`)
				.then((res) => {
					this.setState({ loading: false, post: res.data });
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
		const { post, loading, error } = this.state;
		return (
			<div>
				<Navbar />
				{error && <div className="alert alert-danger">{error}</div>}

				{Object.keys(post).length ? (
					<div className="mt-5 post-container ">
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
									{renderHTML(post.content.rendered)}
								</div>
							</div>
						</div>
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

export default SinglePost;
