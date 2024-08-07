import React, { useEffect } from "react";
import ArticleListItem from "./ArticleListItem";

export default function ArticleList({ articles, fetchNextArticles, meta }) {
	useEffect(() => {
		//define the scroll
		const scroll = () => {
			const bottom =
				Math.ceil(window.innerHeight + window.scrollY) >=
				document.documentElement.scrollHeight;
			if (bottom) {
				if (meta.to < meta.total) fetchNextArticles();
			}
		};
		//add the scroll event once the component is mounted
		window.addEventListener("scroll", scroll);
		//remove the event once the component unmounted
		return () => {
			window.removeEventListener("scroll", scroll);
		};
	}, [meta.to, meta.total]);

	return (
		<div className="col-md-8">
			{articles?.map((article) => (
				<ArticleListItem key={article.id} article={article} />
			))}
		</div>
	);
}
