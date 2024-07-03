import React from "react";
import useTag from "../custom/useTag.js";

export default function Tags({
	setArticleByTag,
	articleByTag,
	setArticleByFollowing,
}) {
	const fetchedTags = useTag();

	return (
		<div className="col-md-4">
			<div className="card">
				<div className="card-body">
					{articleByTag && (
						<button
							className="btn btn-sm btn-danger rounded-0 mb-1"
							onClick={() => {
								setArticleByFollowing(false);
								setArticleByTag("");
							}}
						>
							All
						</button>
					)}
					{fetchedTags?.map((tag) => (
						<button
							key={tag.id}
							className={`btn btn-sm btn-${
								articleByTag === tag.slug ? "primary" : "light"
							} mb-1 rounded-0`}
							onClick={() => {
								setArticleByFollowing(false);
								setArticleByTag(tag.slug);
							}}
						>
							{tag.name}
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
