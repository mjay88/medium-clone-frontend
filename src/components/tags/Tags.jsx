import React from "react";
import useTag from "../custom/useTag.js";

export default function Tags({ setArticleByTag }) {
	const fetchedTags = useTag();

	return (
		<div className="col-md-4">
			<div className="card">
				<div className="card-body">
					{fetchedTags?.map((tag) => (
						<button
							key={tag.id}
							className="btn btn-sm btn-light"
							onClick={() => setArticleByTag(tag.slug)}
						>
							{tag.name}
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
