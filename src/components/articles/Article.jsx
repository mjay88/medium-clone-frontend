import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL, getConfig } from "../../helpers/config";
import Spinner from "../layouts/Spinner";
import { useSelector } from "react-redux";
import { Parser } from "html-to-react";

export default function Article() {
	const { isLoggedIn, token, user } = useSelector((state) => state.user);
	const [article, setArticle] = useState(null);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { slug } = useParams();

	const checkIfFollowingUser = () =>
		article?.user?.followers?.findIndex(
			(item) => item.pivot.follower_id === user?.id
		) !== -1 ? (
			<button className="border-0 bg-light text-success ms-1">Unfollow</button>
		) : (
			<button className="border-0 bg-light text-success ms-1">Follow</button>
		);

	useEffect(() => {
		const fetchArticleBySlug = async () => {
			setLoading(true);
			try {
				const response = await axios.get(`${BASE_URL}/articles/${slug}`);
				setArticle(response.data.data);
				setLoading(false);
			} catch (error) {
				if (error?.response?.status === 404) {
					setError("The article you are looking for does not exist.");
				}
				setLoading(false);
				console.log(error);
			}
		};
		fetchArticleBySlug();
	}, []);

	return (
		<div className="container">
			{loading ? (
				<div className="d-flex justify-content-center mt-3">
					<Spinner />
				</div>
			) : error ? (
				<div className="row my-5">
					<div className="col-md-6 mx-auto">
						<div className="card">
							<div className="card-body">
								<div className="alert alert-danger my-3">{error}</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="my-5">
					<div className="col-md-10 mx-auto mb-2">
						<div className="card">
							<div className="card-header bg-white d-flex flex-column justify-content-center align-items-center">
								<h3 className="mt-2">{article?.title}</h3>
								<div className="p-3 d-flex align-items-center">
									<img
										src={article?.user?.image_path}
										width={40}
										height={40}
										className="rounded-circle me-2"
										alt={article?.user?.name}
									></img>
									<span className="text-primary fw-bold">
										{article?.user?.name}
									</span>
									{isLoggedIn ? (
										checkIfFollowingUser()
									) : (
										<Link
											className="border-0 bg-light text-success ms-1"
											to="/login"
										>
											Follow
										</Link>
									)}
									<span className="mx-2">|</span>
									<span className="text-muted">{article?.created_at}</span>
								</div>
								<div>
									<span className="mx-2 fw-bold">{article?.clapsCount}</span>
								</div>
							</div>
							<div className="card-body">
								<div className="col-md-8 mx-auto my-5 d-flex justify-content-center">
									<img
										src={article?.image_path}
										className="img-fluid rounded"
										alt={article?.title}
									></img>
								</div>
								<div>{Parser().parse(article?.body)}</div>
								<div className="p-3 d-flex flex-column justify-content-start bg-light rounded">
									<img
										src={article?.user?.image_path}
										width={80}
										height={80}
										className="rounded-circle me-2"
										alt={article?.user?.name}
									></img>
									<h4 className="text-primary fw-bold">
										{article?.user?.name}
									</h4>
									{article?.user?.bio && <p>{article?.user?.bio}</p>}
									{article?.user?.followers.length > 0 && (
										<div className="text-muted">
											<i>
												{article?.user?.followers.length}{" "}
												{article?.user?.followers.length > 1
													? "Followers"
													: "Follower"}
											</i>
										</div>
									)}
								</div>
							</div>
							<div className="card-footer bg-white d-flex justify-content-between align-items-center">
								<div className="d-flex flex-wrap">
									{article?.tags.map((tag) => (
										<span key={tag.id} className="badge bg-secondary me-1">
											{tag.name}
										</span>
									))}
								</div>
								<div>
									{isLoggedIn ? (
										<button className="btn btn-sm btn-light">
											<i className="bi bi-bookmark-plus"></i>
										</button>
									) : (
										<Link className="btn btn-sm btn-light" to="/login">
											<i className="bi bi-bookmark-plus"></i>
										</Link>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
