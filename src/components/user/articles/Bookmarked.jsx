import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Bookmarked() {
	const { isLoggedIn } = useSelector((state) => state.user);
	const { bookmarked } = useSelector((state) => state.bookmark);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoggedIn) {
			navigate("/login");
		}
	}, [isLoggedIn]);

	return (
		<div className="container">
			<div className="row my-5">
				<div className="col-md-10 mx-auto">
					{bookmarked?.length ? (
						<table className="table table-responsive">
							<caption>Saved articles</caption>
							<thead>
								<tr>
									<th>ID</th>
									<th>Image</th>
									<th>Title</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{bookmarked.map((article, index) => (
									<tr key={index}>
										<td>{(index += 1)}</td>
										<td>
											<img
												src={article.image_path}
												width={60}
												height={60}
												className="rounded"
												alt={article.title}
											></img>
										</td>
										<td>{article.title}</td>
										<td>
											<Link
												className="btn btn-sm btn-primary"
												to={`/articles/${article.slug}`}
											>
												<i className="bi bi-eye"></i>
											</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<div className="alert alert-info">No saved articles found.</div>
					)}
				</div>
			</div>
		</div>
	);
}
