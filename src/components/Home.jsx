import React, { useEffect, useState } from "react";
import { BASE_URL, getConfig } from "../helpers/config";
import axios from "axios";
import ArticleList from "./articles/ArticleList";

export default function Home() {
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchArticles = async () => {
			setLoading(true);
			try {
				const response = await axios.get(`${BASE_URL}/articles`);
				setArticles(response.data.data);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		};
		fetchArticles();
	}, []);
	return (
		<div className="container">
			<div className="row my-5">
				<ArticleList articles={articles} />
			</div>
		</div>
	);
}
