import React from "react";
import ArticleListItem from "./ArticleListItem";

export default function ArticleList({ articles }) {
	return (
		<div className="col-md-8">
			{articles.length ? (
				articles?.map((article) => (
					<ArticleListItem key={article.id} article={article} />
				))
			) : (
				<div className="alert alert-info">No article found</div>
			)}
		</div>
	);
}
