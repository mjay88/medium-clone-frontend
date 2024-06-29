import React, { useState } from "react";
import useValidation from "../custom/useValidation";
import ReactQuill from "react-quill";
import Spinner from "../layouts/Spinner";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BASE_URL, getConfig, modules } from "../../helpers/config";
import axios from "axios";

export default function Write() {
	const { isLoggedIn, token } = useSelector((state) => state.user);
	const [article, setArticle] = useState({
		title: "",
		body: "",
		excerpt: "",
		image: "",
	});
	const [errors, setErrors] = useState([]);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const storeArticle = async (e) => {
		e.preventDefault();
		setLoading(true);
		setErrors([]);
		try {
			const response = await axios.post(
				`${BASE_URL}/add/article`,
				article,
				getConfig(token)
			);
			setLoading(false);
			toast.success(response.data.message);
			navigate("/");
		} catch (error) {
			setLoading(false);
			if (error?.response?.status === 422) {
				setErrors(error.response.data.errors);
			}
			console.log(error);
		}
	};

	return (
		<div className="row my-5">
			<div className="col-md-6 mx-auto">
				<div className="card shadow-sm">
					<div className="card-header bg-white">
						<h5 className="text-center mt-2">Add new article</h5>
					</div>
					<div className="card-body">
						<form className="mt-5" onSubmit={(e) => storeArticle(e)}>
							<div className="mb-3">
								<label htmlFor="title" className="form-label">
									Title*
								</label>
								<input
									type="text"
									value={article.title}
									onChange={(e) =>
										setArticle({
											...article,
											title: e.target.value,
										})
									}
									name="title"
									id="title"
									className="form-control"
								/>
								{useValidation(errors, "title")}
							</div>
							<div className="mb-3">
								<label htmlFor="excerpt" className="form-label">
									Excerpt*
								</label>
								<textarea
									rows={5}
									cols={30}
									name="excerpt"
									value={article.excerpt}
									onChange={(e) =>
										setArticle({
											...article,
											excerpt: e.target.value,
										})
									}
									id="excerpt"
									className="form-control"
								></textarea>
								{useValidation(errors, "excerpt")}
							</div>
							<div className="mb-3">
								<label htmlFor="body" className="form-label">
									Body*
								</label>
								<ReactQuill
									theme="snow"
									value={article.body}
									modules={modules}
									onChange={(value) =>
										setArticle({
											...article,
											body: value,
										})
									}
								/>
								{useValidation(errors, "body")}
							</div>
							<div className="mb-3">
								<label htmlFor="image" className="form-label">
									Image*
								</label>
								<input
									type="file"
									name="image"
									id="image"
									accept="image/*"
									onChange={(e) =>
										setArticle({
											...article,
											image: e.target.files[0],
										})
									}
									className="form-control"
								/>
								{useValidation(errors, "image")}
							</div>
							<div className="mb-3">
								{loading ? (
									<Spinner />
								) : (
									<button type="submit" className="btn btn-sm btn-dark">
										Submit
									</button>
								)}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
