import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../helpers/config";

export default function SearchBox() {
	const [searchTerm, setSearchTerm] = useState("");
	const [message, setMessage] = useState("");
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const searchArticles = async (e) => {
		e.preventDefault();
		setArticles([]);
		setMessage("");
		setLoading(true);

		const data = { searchTerm };

		try {
			const response = await axios.post(`${BASE_URL}/find/articles`, data);
			if (response.data.data.length) {
				setArticles(response.data.data);
			} else {
				setMessage("No results found");
			}
			setLoading(false);
			setSearchTerm("");
		} catch (error) {
			setLoading(false);
			setSearchTerm("");
			console.log(error);
		}
	};

	const viewArticleDetails = (slug) => {
		navigate(`/articles/${slug}`);
		setArticles([]);
	};

	return (
		<div
			className="offcanvas offcanvas-start"
			tabIndex="-1"
			id="offcanvasExample"
			aria-labelledby="offcanvasExampleLabel"
		>
			<div className="offcanvas-header">
				<h5 className="offcanvas-title" id="offcanvasExampleLabel">
					Search
				</h5>
				<button
					type="button"
					className="btn-close"
					data-bs-dismiss="offcanvas"
					aria-label="Close"
				></button>
			</div>
			<div className="offcanvas-body">
				<form onSubmit={(e) => searchArticles(e)}>
					<div className="row align-items-center">
						<div className="col-md-10">
							<input
								type="search"
								name="searchTerm"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="form-control"
								placeholder="Search..."
							/>
						</div>
						<div className="col-md-2">
							<button type="submit" className="btn btn-sm btn-dark">
								<i className="bi bi-search"></i>
							</button>
						</div>
					</div>
				</form>
				{message && <div className="alert alert-info my-3">{message}</div>}
				<ul className="list-group my-3">
					{loading ? (
						<div className="my-3">
							<span className="text-muted">
								<i>Searching...</i>
							</span>
						</div>
					) : (
						articles?.map((article) => (
							<li key={article.id} className="list-group-item">
								<div className="d-flex justify-content-between align-items-center">
									<img
										src={article.image_path}
										className="rounded me-3"
										width={60}
										height={60}
										alt={article.title}
									></img>
									<span>{article.title}</span>
									<button
										onClick={() => viewArticleDetails(article.slug)}
										className="btn btn-link text-decoration-none text-primary"
									>
										View
									</button>
								</div>
							</li>
						))
					)}
				</ul>
			</div>
		</div>
	);
}
