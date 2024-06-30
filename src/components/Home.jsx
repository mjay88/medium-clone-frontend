import React, { useEffect, useState } from "react";
import { BASE_URL, getConfig } from "../helpers/config";
import axios from "axios";
import ArticleList from "./articles/ArticleList";
import Tags from "./tags/Tags";

export default function Home() {
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(false);
	const [articleByTag, setArticleByTag] = useState("");

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
	}, [articleByTag]);
	return (
		<div className="container">
			<div className="row my-5">
				<ArticleList articles={articles} />
				<Tags setArticleByTag={setArticleByTag} />
			</div>
		</div>
	);
}
