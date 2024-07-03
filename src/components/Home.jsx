import React, { useEffect, useState } from "react";
import { BASE_URL, getConfig } from "../helpers/config";
import axios from "axios";
import ArticleList from "./articles/ArticleList";
import Tags from "./tags/Tags";
import Spinner from "./layouts/Spinner";
import SwitchNav from "./layouts/SwitchNav";
import { useSelector } from "react-redux";

export default function Home() {
	const { token } = useSelector((state) => state.user);
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(false);
	const [articleByTag, setArticleByTag] = useState("");
	const [articleByFollowing, setArticleByFollowing] = useState(false);

	useEffect(() => {
		const fetchArticles = async () => {
			setLoading(true);
			try {
				if (articleByTag) {
					const response = await axios.get(
						`${BASE_URL}/tag/${articleByTag}/articles`
					);
					setArticles(response.data.data);
					setLoading(false);
				} else if (articleByFollowing) {
					const response = await axios.get(
						`${BASE_URL}/followings/articles`,
						getConfig(token)
					);
					setArticles(response.data.data);
					setLoading(false);
				} else {
					const response = await axios.get(`${BASE_URL}/articles`);
					setArticles(response.data.data);
					setLoading(false);
				}
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		};
		fetchArticles();
	}, [articleByTag, articleByFollowing]);
	return (
		<div className="container">
			{loading ? (
				<div className="d-flex justify-content-center mt-5">
					<Spinner />
				</div>
			) : (
				<div className="row my-5">
					{/* {	switching between all the articles and the articles of the users we follow} */}
					<SwitchNav
						articleByFollowing={articleByFollowing}
						setArticleByFollowing={setArticleByFollowing}
						setArticleByTag={setArticleByTag}
					/>
					{/* {display all of the published articles} */}
					<ArticleList articles={articles} />
					{/* {display all of the tags} */}
					<Tags
						setArticleByTag={setArticleByTag}
						articleByTag={articleByTag}
						setArticleByFollowing={setArticleByFollowing}
					/>
				</div>
			)}
		</div>
	);
}
